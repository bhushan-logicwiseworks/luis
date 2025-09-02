import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderWizardMasterComponent } from './reorder-wizard-master.component';

describe('ReorderWizardMasterComponent', () => {
    let component: ReorderWizardMasterComponent;
    let fixture: ComponentFixture<ReorderWizardMasterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ReorderWizardMasterComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReorderWizardMasterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
