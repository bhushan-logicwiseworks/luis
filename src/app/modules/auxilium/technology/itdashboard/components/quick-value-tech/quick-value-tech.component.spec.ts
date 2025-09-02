import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickValueTechComponent } from './quick-value-tech.component';

describe('QuickValueTechComponent', () => {
    let component: QuickValueTechComponent;
    let fixture: ComponentFixture<QuickValueTechComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [QuickValueTechComponent],
}).compileComponents();

        fixture = TestBed.createComponent(QuickValueTechComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
