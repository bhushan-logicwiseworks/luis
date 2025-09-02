import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppealResponseComponent } from './appeal-response.component';

describe('AppealResponseComponent', () => {
    let component: AppealResponseComponent;
    let fixture: ComponentFixture<AppealResponseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppealResponseComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppealResponseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
