import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { zip } from 'rxjs';
import { fileReader } from '../../utils/fileReader';

@Directive({ selector: '[acFullScreenDropzone]', })
export class FullScreenDropzoneDirective {
    @Output() emitFileChange: EventEmitter<any> = new EventEmitter<any>();
    @HostListener('window:dragenter')
    onDragEnter(e) {
        this.showDropZone();
    }

    constructor(
        private dropzone: ElementRef,
        private store: Store
    ) {
        dropzone.nativeElement.addEventListener('dragenter', this.allowDrag.bind(this));
        dropzone.nativeElement.addEventListener('dragover', this.allowDrag.bind(this));

        // 3
        dropzone.nativeElement.addEventListener('dragleave', e => {
            this.hideDropZone();
        });

        // 4
        dropzone.nativeElement.addEventListener('drop', this.handleDrop.bind(this));
    }

    showDropZone() {
        this.dropzone.nativeElement.style.display = 'flex';
    }

    hideDropZone() {
        this.dropzone.nativeElement.style.display = 'none';
    }

    allowDrag(e) {
        const files: File[] = Array.from(e.dataTransfer.files || e.target.files);
        if (files.every(file => file.type === 'application/pdf')) {
            e.dataTransfer.dropEffect = 'copy';
            e.preventDefault();
        }
    }

    handleDrop(e) {
        e.preventDefault();
        this.hideDropZone();
        zip(...Array.from(e.dataTransfer.files || e.target.files).map((file: File) => fileReader(file))).subscribe(
            files => {
                // @ts-ignore
                this.emitFileChange.emit(files);
            }
        );
    }
}
