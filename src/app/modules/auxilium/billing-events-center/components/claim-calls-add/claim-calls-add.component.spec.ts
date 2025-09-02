import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimCallsAddComponent } from './claim-calls-add.component';

describe('ClaimCallsAddComponent', () => {
    let component: ClaimCallsAddComponent;
    let fixture: ComponentFixture<ClaimCallsAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ClaimCallsAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ClaimCallsAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
