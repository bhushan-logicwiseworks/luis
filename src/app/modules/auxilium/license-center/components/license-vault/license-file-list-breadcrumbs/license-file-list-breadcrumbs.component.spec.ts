import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseFileListBreadcrumbsComponent } from './license-file-list-breadcrumbs.component';

describe('LicenseFileListBreadcrumbsComponent', () => {
    let component: LicenseFileListBreadcrumbsComponent;
    let fixture: ComponentFixture<LicenseFileListBreadcrumbsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LicenseFileListBreadcrumbsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LicenseFileListBreadcrumbsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
