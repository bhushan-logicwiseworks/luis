import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { FuseVerticalNavigationComponent } from '../../../../../@fuse/components/navigation/vertical/vertical.component';

@Component({
    selector: 'aux-sidebar',
    templateUrl: './aux-sidebar.component.html',
    styles: [
        `
            demo-sidebar fuse-vertical-navigation .fuse-vertical-navigation-wrapper {
                box-shadow: none !important;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [FuseVerticalNavigationComponent],
})
export class AuxSidebarComponent {
    @Input() showTitle: boolean = true;
    @Input() title: string = 'Aux Sidebar';
    @Input() menuData: FuseNavigationItem[];
    @Output() openDialog = new EventEmitter();

    /**
     * Constructor
     */
    constructor(private dialog: MatDialog) {}

    openCreateDialog(): void {
        this.openDialog.emit();
    }
}
