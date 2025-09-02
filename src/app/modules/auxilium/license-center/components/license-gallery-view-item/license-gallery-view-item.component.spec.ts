import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseGalleryViewItemComponent } from './license-gallery-view-item.component';

describe('LicenseGalleryViewItemComponent', () => {
    let component: LicenseGalleryViewItemComponent;
    let fixture: ComponentFixture<LicenseGalleryViewItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [LicenseGalleryViewItemComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LicenseGalleryViewItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
