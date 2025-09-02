import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';

@Component({
    selector: 'aux-pagination',
    templateUrl: './aux-pagination.component.html',
    styleUrls: ['./aux-pagination.component.scss'],
    imports: [
        MatFormField,
        MatSelect,
        MatOption,
    ],
})
export class AuxPaginationComponent {
    @Input() pageSize: number = 20;
    @Input() pageSizeOptions: number[] = [5, 10, 20, 50];
    @Output() pageSizeChange = new EventEmitter<number>();
}
