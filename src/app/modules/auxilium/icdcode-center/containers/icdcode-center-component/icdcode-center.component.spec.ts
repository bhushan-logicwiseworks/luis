import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IcdCodeCenterComponent } from './icdcode-center.component';

describe('IcdCodeCenterComponent', () => {
    let component: IcdCodeCenterComponent;
    let fixture: ComponentFixture<IcdCodeCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [IcdCodeCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IcdCodeCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
