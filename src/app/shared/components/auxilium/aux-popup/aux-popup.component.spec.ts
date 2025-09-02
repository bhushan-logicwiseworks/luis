import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxPopupComponent } from './aux-popup.component';

describe('AuxPopupsComponent', () => {
    let component: AuxPopupComponent;
    let fixture: ComponentFixture<AuxPopupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AuxPopupComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AuxPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
