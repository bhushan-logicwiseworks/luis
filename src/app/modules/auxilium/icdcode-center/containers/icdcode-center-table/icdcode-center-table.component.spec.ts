import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IcdCodeCenterTableComponent } from './icdcode-center-table.component';

describe('IcdCodeCenterTableComponent', () => {
    let component: IcdCodeCenterTableComponent;
    let fixture: ComponentFixture<IcdCodeCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [IcdCodeCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IcdCodeCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
