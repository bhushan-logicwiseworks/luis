import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LicenseCenterTableComponent } from './license-center-table.component';

describe('LicenseCenterTableComponent', () => {
    let component: LicenseCenterTableComponent;
    let fixture: ComponentFixture<LicenseCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [LicenseCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LicenseCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
