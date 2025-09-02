import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppealResponseAddComponent } from './appeal-response-add.component';

describe('AppealResponseAddComponent', () => {
    let component: AppealResponseAddComponent;
    let fixture: ComponentFixture<AppealResponseAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppealResponseAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AppealResponseAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
