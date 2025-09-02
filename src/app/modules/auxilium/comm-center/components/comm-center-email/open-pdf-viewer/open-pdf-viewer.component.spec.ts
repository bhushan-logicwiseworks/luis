import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPdfViewerComponent } from './open-pdf-viewer.component';

describe('OpenPdfViewerComponent', () => {
    let component: OpenPdfViewerComponent;
    let fixture: ComponentFixture<OpenPdfViewerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [OpenPdfViewerComponent],
}).compileComponents();

        fixture = TestBed.createComponent(OpenPdfViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
