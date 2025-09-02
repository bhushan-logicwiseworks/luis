import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { Auth, authState, signOut, User } from '@angular/fire/auth';
import { Database, get, objectVal, ref, update } from '@angular/fire/database';
import { FuseConfigService } from '@fuse/services/config';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { catchError, first, Observable, of, switchMap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _authenticated: boolean = false;
    user$: Observable<User>;
    private auth = inject(Auth);
    private db = inject(Database);
    private authState$ = authState(this.auth);
    private _injector = inject(EnvironmentInjector);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _fuseConfigService: FuseConfigService
    ) {
        this.user$ = this.authState$.pipe(
            switchMap(user => {
                if (user) {
                    return runInInjectionContext(this._injector, () => {
                        const userRef = ref(this.db, `users/${user.uid}`);
                        return objectVal(userRef) as Observable<User>;
                    });
                } else {
                    return of(null);
                }
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('api/auth/sign-in', credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient
            .post('api/auth/sign-in-with-token', {
                accessToken: this.accessToken,
            })
            .pipe(
                catchError(() =>
                    // Return false
                    of(false)
                ),
                switchMap((response: any) => {
                    // Replace the access token with the new one if it's available on
                    // the response object.
                    //
                    // This is an added optional step for better security. Once you sign
                    // in using the token, you should generate a new one on the server
                    // side and attach it to the response object. Then the following
                    // piece of code can replace the token with the refreshed one.
                    if (response.accessToken) {
                        this.accessToken = response.accessToken;
                    }

                    // Set the authenticated flag to true
                    this._authenticated = true;

                    // Store the user on the user service
                    this._userService.user = response.user;

                    // Return true
                    return of(true);
                })
            );
    }

    /**
     * Sign out
     */
    async signOut(): Promise<boolean> {
        try {
            // Sign out from Firebase
            await signOut(this.auth);
            // Remove the access token from the local storage
            localStorage.removeItem('accessToken');
            // Set the authenticated flag to false
            this._authenticated = false;
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }

    initializeThemeConfig() {
        return this.authState$.pipe(
            switchMap(async user => {
                if (user) {
                    return runInInjectionContext(this._injector, async () => {
                        const userRef = ref(this.db, `users/${user.uid}`);
                        const snapshot = await get(userRef);
                        const userSnapshot = snapshot.exists() ? snapshot.val() : null;
                        if (userSnapshot) {
                            this._fuseConfigService.config = {
                                scheme: userSnapshot['isDark'],
                                theme: userSnapshot['themeName'],
                            };
                        } else {
                            this._fuseConfigService.config = {
                                scheme: 'light',
                                theme: 'theme-acentusRose',
                            };
                        }
                        return userSnapshot;
                    });
                } else {
                    throw new Error('User not authenticated');
                }
            })
        );
    }

    async createInitialSetup(selectedTheme: string, selectedScheme: string) {
        try {
            const user = await this.getUser();
            if (user) {
                const profile = {
                    datecreated: this.timestamp,
                    lastsignin: this.timestamp,
                    email: user.email,
                    name: user.displayName,
                    role: 'Aux-Fuse',
                    isDark: selectedScheme,
                    themeName: selectedTheme,
                };
                this.updateUserDetails(user.uid, profile).then(() => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your theme has been saved',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                });
            }
        } catch (error) {
            console.error('Error fetching user: ', error);
        }
    }

    async fetchUserDetails(uid: string) {
        try {
            return runInInjectionContext(this._injector, async () => {
                const userRef = ref(this.db, `users/${uid}`);
                const snapshot = await get(userRef);
                return snapshot.exists() ? snapshot.val() : null;
            });
        } catch (error) {
            console.error('Error fetching user details: ', error);
            return null;
        }
    }

    async updateUserDetails(uid: string, updates: any) {
        try {
            return runInInjectionContext(this._injector, async () => {
                const userRef = ref(this.db, `users/${uid}`);
                await update(userRef, updates);
                console.log('User details updated successfully');
            });
        } catch (error) {
            console.error('Error updating user details: ', error);
        }
    }

    get timestamp() {
        return { '.sv': 'timestamp' };
    }

    async getUser() {
        try {
            return await this.authState$.pipe(first()).toPromise();
        } catch (error) {
            console.error('Error getting user: ', error);
            return null;
        }
    }
}
