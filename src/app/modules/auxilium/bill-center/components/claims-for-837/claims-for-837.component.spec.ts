import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsFor837Component } from './claims-for-837.component';

describe('ClaimsFor837Component', () => {
    let component: ClaimsFor837Component;
    let fixture: ComponentFixture<ClaimsFor837Component>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ClaimsFor837Component],
}).compileComponents();

        fixture = TestBed.createComponent(ClaimsFor837Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
