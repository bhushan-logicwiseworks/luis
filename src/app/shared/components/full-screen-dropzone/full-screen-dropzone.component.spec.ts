import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenDropzoneComponent } from './full-screen-dropzone.component';

describe('FullScreenDropzoneComponent', () => {
    let component: FullScreenDropzoneComponent;
    let fixture: ComponentFixture<FullScreenDropzoneComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [FullScreenDropzoneComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FullScreenDropzoneComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
