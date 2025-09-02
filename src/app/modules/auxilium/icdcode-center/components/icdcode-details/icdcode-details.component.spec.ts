import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcdCodeDetailsComponent } from './icdcode-details.component';

describe('IcdCodeDetailsComponent', () => {
    let component: IcdCodeDetailsComponent;
    let fixture: ComponentFixture<IcdCodeDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [IcdCodeDetailsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(IcdCodeDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
