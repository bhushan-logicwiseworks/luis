import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HotkeysCenterIndividualFormComponent } from './hotKeys-center-individual-form.component';

describe('HotkeysCenterIndividualFormComponent', () => {
    let component: HotkeysCenterIndividualFormComponent;
    let fixture: ComponentFixture<HotkeysCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [HotkeysCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HotkeysCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
