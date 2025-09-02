import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesReadyforClaimsComponent } from './charges-readyfor-claims.component';

describe('ChargesReadyforClaimsComponent', () => {
    let component: ChargesReadyforClaimsComponent;
    let fixture: ComponentFixture<ChargesReadyforClaimsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ChargesReadyforClaimsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ChargesReadyforClaimsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
