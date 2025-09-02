import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbbottCenterComponent } from './abbott-center.component';

describe('AbbottCenterComponent', () => {
    let component: AbbottCenterComponent;
    let fixture: ComponentFixture<AbbottCenterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AbbottCenterComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AbbottCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
