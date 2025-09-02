import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuthSelectors } from 'app/reducers';
import { AuthActions } from 'app/reducers/auth.actions';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { states } from 'app/shared/components/auxilium/states';
import { debounceTime, map, Observable, startWith } from 'rxjs';
import { State } from '../../../../../shared/interfaces/auxilium/patient-center/state.interface';
import { MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'user-center-account',
    templateUrl: './user-center-account.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        MatAutocompleteTrigger,
        MatSuffix,
        MatAutocomplete,
        MatOption,
        NgxMaskDirective,
        MatCheckbox,
        MatButton,
        MatTooltip,
        LoadingOverlayComponent,
        AsyncPipe,
    ],
})
export class UserCenterAccountComponent implements OnInit {
    accountForm: UntypedFormGroup;
    usstates = states;
    loggedInUserDetails$ = this.store.select(AuthSelectors.selectLoggedInUser);
    salesCityState$ = this.store.select(AuthSelectors.selectUserCityState);
    loading$ = this.store.select(AuthSelectors.selectLoadingUserDetails);
    state = new FormControl();
    filteredStates: Observable<{ name: string; abbreviation: string }[] | null>;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService
    ) {
        this.filteredStates = this.state.valueChanges.pipe(
            startWith(''),
            map(state => (state ? this._filterStates(state) : this.usstates.slice()))
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    ngOnInit() {
        // Create the form
        this.accountForm = this._formBuilder.group({
            id: [0],
            firstname: [''],
            lastname: [''],
            displayname: [''],
            company: [''],
            address: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: [''],
            fax: [''],
            email: [''],
            phone: [''],
            cell: [''],
            isactive: [''],
        });
        this.loggedInUserDetails$.pipe(untilDestroyed(this)).subscribe(loggedInUserDetails => {
            if (loggedInUserDetails) {
                this.state.setValue(loggedInUserDetails.state);
                this.accountForm.patchValue(loggedInUserDetails);
            }
        });
        this.salesCityState$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.accountForm.get('state').setValue(result.state);
                this.accountForm.get('city').setValue(result.city);
            } else {
                this.accountForm.get('state').setValue('');
                this.accountForm.get('city').setValue('');
            }
        });

        this.accountForm
            .get('zip')
            .valueChanges.pipe(untilDestroyed(this), debounceTime(500))
            .subscribe(result => {
                if (result !== '') {
                    this.store.dispatch(AuthActions.LoadCityAndStateDropDown({ zipCode: result }));
                }
            });
    }

    saveAccountInfo() {
        // Populate the patients object from the screen
        let loggedInUser: any = this.accountForm.value;
        loggedInUser.state = this.state.value;
        // Transform inputs to uppercase
        loggedInUser = this.auxUtilService.convertObjToUppercase(loggedInUser);
        loggedInUser.isactive = !!loggedInUser.isactive;
        console.log(loggedInUser);
        // Save changes
        this.store.dispatch(AuthActions.UpdateLoggedInUserDetails({ loggedInUser }));
    }

    trackByFn(item: any) {
        return item.abbreviation;
    }

    private _filterStates(value: string): State[] {
        const filterValue = value.toLowerCase().replace(/\s+/g, ' ');
        return this.usstates.filter(
            state =>
                state.name.toLowerCase().replace(/\s+/g, ' ').includes(filterValue) ||
                state.abbreviation.toLowerCase().includes(filterValue)
        );
    }

    makeCall(type: string): void {
        const phoneNumber = this.accountForm.get(type == 'Cell' ? 'cell' : 'phone')?.value;
        this.auxUtilService.makeCall(phoneNumber);
    }
}
