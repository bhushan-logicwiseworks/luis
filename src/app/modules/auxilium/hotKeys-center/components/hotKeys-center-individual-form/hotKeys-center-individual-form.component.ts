import {
    AfterViewInit,
    Component,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { HotKeysDisplay } from 'app/shared/interfaces/auxilium/hotKeys-center/hotkeys.interface';
import { Subscription } from 'rxjs';
import { HotKeysCenterIndividualActions } from '../../actions/hotKeys-center-individual.actions';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';

@UntilDestroy()
@Component({
    selector: 'ac-hotkeys-center-individual-form',
    templateUrl: './hotkeys-center-individual-form.component.html',
    styleUrls: ['./hotkeys-center-individual-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPrefix,
        MatInput,
        FuseAlertComponent,
    ],
})
export class HotkeysCenterIndividualFormComponent implements OnInit, AfterViewInit, OnDestroy {
    hotKeysDisplayData: HotKeysDisplay;
    @Input() showDeleteButton: boolean = false;

    state = new FormControl();
    contactForm: UntypedFormGroup;
    editMode: boolean = false;
    alert: any;
    showAlert: boolean = false;
    subscription: Subscription;

    @ViewChild(MatAutocompleteTrigger) stateAutocomplete: MatAutocompleteTrigger;
    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private _formBuilder: UntypedFormBuilder,
        private store: Store,
        private auxUtilService: AuxUtilService,
        private dialogRef: MatDialogRef<HotkeysCenterIndividualFormComponent>
    ) {
        this.hotKeysDisplayData = data.dynamicComponentData;
    }

    ngOnInit(): void {
        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id: [0],
            keylabel: [''],
            command: [''],
            itemid1: [''],
            itemid2: [''],
            itemid3: [''],
            itemid4: [''],
            itemid5: [''],
            itemid6: [''],
            itemid7: [''],
            billtype1: [''],
            billtype2: [''],
            billtype3: [''],
            billtype4: [''],
            billtype5: [''],
            billtype6: [''],
            billtype7: [''],
            adddate: [''],
            adduserid: [''],
            branchid: [0],
        });

        // Patch values to the form
        this.contactForm.patchValue(this.hotKeysDisplayData);
    }

    ngAfterViewInit() {}
    ngOnDestroy() {}

    trackByFn(item: any) {
        return item.abbreviation;
    }

    /**
     * Save the contact
     */
    saveContact(): void {
        // Populate the object from the screen
        let hotkey: HotKeysDisplay = this.contactForm.value;

        // Validate input
        if (!this.isInputValid(hotkey)) {
            return;
        }

        // Set default date when adding a new record
        if (hotkey.id == 0) {
            hotkey.adddate = new Date();
        }

        // Transform inputs to uppercase
        hotkey = this.auxUtilService.transFormValuesToUpperCase(hotkey, [
            'keylabel',
            'command',
            'billtype1',
            'billtype2',
            'billtype3',
            'billtype4',
            'billtype5',
            'billtype6',
            'billtype7',
        ]);

        // Update the contact on the server
        this.store.dispatch(HotKeysCenterIndividualActions.AddHotKey({ hotkey }));

        // trigger save event
        this.dialogRef.close();
    }

    isInputValid(contact: HotKeysDisplay): boolean {
        // Make sure Hotkeys was entered. This is the only required field.
        if (contact.keylabel == '' || contact.keylabel == null) {
            this.alert = {
                type: 'error',
                message: 'Keylabel Code cannot be blank.',
            };
            setTimeout(() => {
                this.alert = null;
            }, 6000);
            return false;
        }

        return true;
    }
}
