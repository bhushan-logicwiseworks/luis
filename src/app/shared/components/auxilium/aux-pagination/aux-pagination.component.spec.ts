import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxPaginationComponent } from './aux-pagination.component';

describe('AuxPaginationComponent', () => {
    let component: AuxPaginationComponent;
    let fixture: ComponentFixture<AuxPaginationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AuxPaginationComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AuxPaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
