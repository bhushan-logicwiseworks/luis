import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimaryAppealDenialsRejectionsComponent } from './primary-appeal-denials-rejections.component';

describe('PrimaryAppealDenialsRejectionsComponent', () => {
    let component: PrimaryAppealDenialsRejectionsComponent;
    let fixture: ComponentFixture<PrimaryAppealDenialsRejectionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PrimaryAppealDenialsRejectionsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PrimaryAppealDenialsRejectionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
