import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcdCodeCenterDetailsComponent } from './icdcode-center-details.component';

describe('IcdCodeCenterDetailsComponent', () => {
    let component: IcdCodeCenterDetailsComponent;
    let fixture: ComponentFixture<IcdCodeCenterDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [IcdCodeCenterDetailsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(IcdCodeCenterDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
