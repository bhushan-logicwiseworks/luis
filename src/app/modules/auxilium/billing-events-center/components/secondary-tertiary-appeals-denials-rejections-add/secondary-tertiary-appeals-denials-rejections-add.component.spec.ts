import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryTertiaryAppealsDenialsRejectionsAddComponent } from './secondary-tertiary-appeals-denials-rejections-add.component';

describe('SecondaryTertiaryAppealsDenialsRejectionsAddComponent', () => {
    let component: SecondaryTertiaryAppealsDenialsRejectionsAddComponent;
    let fixture: ComponentFixture<SecondaryTertiaryAppealsDenialsRejectionsAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SecondaryTertiaryAppealsDenialsRejectionsAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SecondaryTertiaryAppealsDenialsRejectionsAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
