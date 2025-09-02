import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseFolderComponent } from './license-folder.component';

describe('LicenseFolderComponent', () => {
    let component: LicenseFolderComponent;
    let fixture: ComponentFixture<LicenseFolderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LicenseFolderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LicenseFolderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
