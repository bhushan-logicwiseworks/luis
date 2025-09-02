import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCenterActionBarComponent } from './license-center-action-bar.component';

describe('LicenseCenterActionBarComponent', () => {
    let component: LicenseCenterActionBarComponent;
    let fixture: ComponentFixture<LicenseCenterActionBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LicenseCenterActionBarComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LicenseCenterActionBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
