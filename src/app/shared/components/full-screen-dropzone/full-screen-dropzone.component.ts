import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import icCloudUpload from '@iconify/icons-ic/twotone-cloud-upload';
import { FullScreenDropzoneDirective } from './full-screen-dropzone.directive';
import { IconModule } from '@abhinavakhil/iconify-angular';

@Component({
    selector: 'ac-full-screen-dropzone',
    templateUrl: './full-screen-dropzone.component.html',
    styleUrls: ['./full-screen-dropzone.component.scss'],
    imports: [FullScreenDropzoneDirective, IconModule],
})
export class FullScreenDropzoneComponent implements OnInit, AfterViewInit, OnDestroy {
    icCloudUpload = icCloudUpload;
    @Output() emitFileChange: EventEmitter<any> = new EventEmitter<any>();
    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    ngOnDestroy(): void {}
}
