import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { Store } from '@ngrx/store';
import { ValidatorService } from 'app/core/auth/validator/validator.service';
import { Credentials } from 'app/shared/interfaces/user/credentials.interface';
import { LoginSelectors } from '../sign-in/reducers';
import { LoginActions } from './actions/login.actions';
import { FuseAlertComponent } from '../../../../@fuse/components/alert/alert.component';
import { FireErrorComponent } from '../../../shared/fire-error/fire-error.component';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
declare const turnstile: any;
@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    animations: fuseAnimations,
    imports: [
        RouterLink,
        FuseAlertComponent,
        FireErrorComponent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        MatIconButton,
        MatSuffix,
        MatIcon,
        MatCheckbox,
        MatButton,
        MatProgressSpinner,
        AsyncPipe,
    ],
})
export class AuthSignInComponent implements OnInit {
    validator = this.validatorService.createValidator<Credentials>({
        email: {
            ...this.validatorService.common.email(),
            ...this.validatorService.common.required(),
        },
        password: {
            ...this.validatorService.common.required(),
        },
    });

    signInForm = this.validatorService.createFormGroup<Credentials>(this.validator, {
        email: null,
        password: null,
    });
    @ViewChild('captchaContainer', { static: true }) captchaContainer!: ElementRef;
    error$ = this.store.select(LoginSelectors.selectError);
    loading$ = this.store.select(LoginSelectors.selectLoading);
    isCaptchaResolved: boolean = false;
    captchaWidgetId: string = '';
    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private auth: AngularFireAuth,
        private validatorService: ValidatorService,
        private store: Store,
        private _formBuilder: UntypedFormBuilder,
        private cd: ChangeDetectorRef,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // this.renderCaptchaWidget()
        //   this.auth.user.pipe(
        //       take(1)
        //     ).subscribe(user => user && this.store.dispatch(RouterActions.NavigateHome()))
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            this.signInForm.markAllAsTouched();
            return;
        }
        const credentials = this.signInForm.value;
        this.store.dispatch(LoginActions.Login({ credentials }));
    }

    //   renderCaptchaWidget() {
    // turnstile.ready(() => {
    //   if (this.captchaWidgetId) {
    //     return;
    //   }
    //   this.captchaWidgetId = turnstile.render(this.captchaContainer.nativeElement, {
    //     sitekey: environment.recaptcha.siteKey,
    //     callback: (token: string) => {
    //       this.isCaptchaResolved = true;
    //       this.cd.detectChanges();
    //     }
    //   });
    // });
    //   }
    //   refreshCaptchaWidget() {
    //     turnstile.reset(this.captchaWidgetId); // Reset the CAPTCHA widget
    //     this.renderCaptchaWidget(); // Render the CAPTCHA widget again
    //   }
}
