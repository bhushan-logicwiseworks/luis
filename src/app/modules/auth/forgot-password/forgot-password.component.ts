import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthSelectors } from 'app/reducers';
import { AuthActions } from 'app/reducers/auth.actions';
import { FuseAlertComponent } from '../../../../@fuse/components/alert/alert.component';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
@UntilDestroy()
@Component({
    selector: 'auth-forgot-password',
    templateUrl: './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        FuseAlertComponent,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        MatButton,
        MatProgressSpinner,
        RouterLink,
        MatIcon,
    ],
})
export class AuthForgotPasswordComponent implements OnInit {
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    selectError$ = this.store.select(AuthSelectors.selectError);
    selectSuccessMessage$ = this.store.select(AuthSelectors.selectForgotPasswordSuccessMessage);
    forgotPasswordForm: UntypedFormGroup;
    showAlert: boolean = false;
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private store: Store
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void {
        // Return if the form is invalid
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Forgot password

        this.store.dispatch(
            AuthActions.ForgotPassword({
                ForgotPassword: {
                    app: 'aux-fuse',
                    email: this.forgotPasswordForm.get('email').value,
                },
            })
        );

        this.selectError$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.forgotPasswordForm.enable();

                // Reset the form
                this.forgotPasswordNgForm.resetForm();

                // Show the alert
                this.showAlert = true;
                this.alert = {
                    type: 'error',
                    message: result.error,
                };
            }
        });
        this.selectSuccessMessage$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.forgotPasswordForm.enable();
                // Reset the form
                this.forgotPasswordNgForm.resetForm();
                // Show the alert
                this.showAlert = true;
                this.alert = {
                    type: 'success',
                    message: "Password reset sent! You'll receive an email if you are registered on our system",
                };
            }
        });
    }
}
