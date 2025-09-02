import { Component, ComponentRef, HostListener, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import icTrash from '@iconify/icons-ic/outline-delete';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatIconButton, MatButton } from '@angular/material/button';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { IconModule } from '@abhinavakhil/iconify-angular';

export interface PopupData {
    icon: string;
    iconColor?: string;
    title: string;
    titleColor?: string;
    cancelButtonText: string;
    saveButtonText?: string;
    addonButtonText?: string;
    dynamicComponent: any; // Dynamic component reference
    dynamicComponentData: any; // Data to pass to the dynamic component
    submitFunction?: string;
    addonSubmitFunction?: string;
    enterKeyEnabled?: boolean;
    deleteFunction?: string;
}

@Component({
    selector: 'app-aux-popup',
    templateUrl: './aux-popup.component.html',
    styleUrls: ['./aux-popup.component.scss'],
    imports: [
        MatIcon,
        NgClass,
        MatIconButton,
        CdkScrollable,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        IconModule,
        MatDialogClose,
    ],
})
export class AuxPopupComponent implements OnInit {
    icTrash = icTrash;
    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;
    componentRef: ComponentRef<any>;

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: PopupData,
        private searchService: AuxSearchService
    ) {}

    ngOnInit(): void {
        Promise.resolve().then(() => {
            this.loadDynamicComponent();
        });
    }

    // ngAfterViewInit() {
    //     this.loadDynamicComponent();
    //     this.cdr.detectChanges()
    // }

    loadDynamicComponent(): void {
        const componentFactory = this.data.dynamicComponent;
        if (componentFactory) {
            this.componentRef = this.dynamicComponentContainer.createComponent(componentFactory);
            this.componentRef.instance.data = this.data.dynamicComponentData;
        }
    }

    onCancelClick(): void {
        this.dialogRef.close(false);
        this.clearFilter();
    }

    onSaveClick(): void {
        if (this.componentRef.instance) {
            const submitFunction = this.data.submitFunction;
            this.componentRef.instance[submitFunction]();
        }
    }

    clearFilter() {
        let titleWithoutValues = this.data.title.replace(/:.*/, '');
        if (this.data.title == 'Select Physician') {
            this.searchService.resetFilter.next({ resetGrid: true });
        } else if (titleWithoutValues == 'Select Payor for patient') {
            this.searchService.resetFilter.next({ resetGrid: true });
        } else if (this.data.title == 'Select Diagnosis Code') {
            this.searchService.resetFilter.next({ resetGrid: true });
        } else if (this.data.title == 'Select Referral Form') {
            this.searchService.resetFilter.next({ resetGrid: true });
        }
    }

    @HostListener('document:keydown.enter', ['$event'])
    handleEnterKey(event: KeyboardEvent): void {
        if (this.data.enterKeyEnabled && event.target instanceof Element) {
            event.preventDefault();
            if (this.componentRef.instance) {
                const submitFunction = this.data.submitFunction;
                this.componentRef.instance[submitFunction]();
            }
        }
    }

    onAddonClick() {
        if (this.componentRef.instance) {
            const addonSubmitFunction = this.data.addonSubmitFunction;
            this.componentRef.instance[addonSubmitFunction]();
        }
    }

    deleteButton() {
        if (this.componentRef.instance) {
            const deleteFunction = this.data.deleteFunction;
            this.componentRef.instance[deleteFunction]();
        }
    }
}
