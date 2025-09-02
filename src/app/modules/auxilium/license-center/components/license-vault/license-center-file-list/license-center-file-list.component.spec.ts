import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCenterFileListComponent } from './license-center-file-list.component';

describe('LicenseCenterFileListComponent', () => {
    let component: LicenseCenterFileListComponent;
    let fixture: ComponentFixture<LicenseCenterFileListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LicenseCenterFileListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LicenseCenterFileListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
