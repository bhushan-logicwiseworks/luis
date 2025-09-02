import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuxAgFullNameComponent } from './aux-ag-full-name.component';

describe('AuxAgFullNameComponent', () => {
    let component: AuxAgFullNameComponent;
    let fixture: ComponentFixture<AuxAgFullNameComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [AuxAgFullNameComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuxAgFullNameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
