import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryAppealDenialsRejectionsAddComponent } from './primary-appeal-denials-rejections-add.component';

describe('PrimaryAppealDenialsRejectionsAddComponent', () => {
    let component: PrimaryAppealDenialsRejectionsAddComponent;
    let fixture: ComponentFixture<PrimaryAppealDenialsRejectionsAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PrimaryAppealDenialsRejectionsAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PrimaryAppealDenialsRejectionsAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
