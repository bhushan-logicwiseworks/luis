import { Component, Input, OnInit } from '@angular/core';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { Store } from '@ngrx/store';
import { FileSelectors } from '../reducers';
import { FileActionsMenuService } from '../services/file-actions-menu.service';
import { NgClass, NgStyle, AsyncPipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'ac-gallery-view-item',
    templateUrl: './gallery-view-item.component.html',
    styleUrls: ['./gallery-view-item.component.scss'],
    imports: [
        NgClass,
        MatTooltip,
        MatIcon,
        NgStyle,
        AsyncPipe,
    ],
})
export class GalleryViewItemComponent implements OnInit {
    @Input() item: any;
    icFolder = icFolder;
    @Input() isFileSelected = false;

    selectedFile$ = this.store.select(FileSelectors.selectSelectedFile);
    constructor(
        private store: Store,
        public fileActions: FileActionsMenuService
    ) {}

    ngOnInit(): void {}
}
