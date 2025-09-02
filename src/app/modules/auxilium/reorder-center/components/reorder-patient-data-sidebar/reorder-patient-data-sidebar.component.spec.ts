import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderPatientDataSidebarComponent } from './reorder-patient-data-sidebar.component';

describe('ReorderPatientDataSidebarComponent', () => {
    let component: ReorderPatientDataSidebarComponent;
    let fixture: ComponentFixture<ReorderPatientDataSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ReorderPatientDataSidebarComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReorderPatientDataSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
