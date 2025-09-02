import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReorderIndividualComponent } from './reorder-individual.component';

describe('ReorderIndividualComponent', () => {
    let component: ReorderIndividualComponent;
    let fixture: ComponentFixture<ReorderIndividualComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ReorderIndividualComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReorderIndividualComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
