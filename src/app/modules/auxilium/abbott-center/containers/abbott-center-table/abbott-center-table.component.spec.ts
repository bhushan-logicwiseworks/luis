import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbbottCenterTableComponent } from './abbott-center-table.component';

describe('AbbottCenterTableComponent', () => {
    let component: AbbottCenterTableComponent;
    let fixture: ComponentFixture<AbbottCenterTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AbbottCenterTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AbbottCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
