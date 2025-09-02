import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaimCallsComponent } from './claim-calls.component';

describe('ClaimCallsComponent', () => {
    let component: ClaimCallsComponent;
    let fixture: ComponentFixture<ClaimCallsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ClaimCallsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ClaimCallsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
