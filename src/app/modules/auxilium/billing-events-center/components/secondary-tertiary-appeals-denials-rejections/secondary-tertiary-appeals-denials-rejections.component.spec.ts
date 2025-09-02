import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecondaryTertiaryAppealsDenialsRejectionsComponent } from './secondary-tertiary-appeals-denials-rejections.component';

describe('SecondaryTertiaryAppealsDenialsRejectionsComponent', () => {
    let component: SecondaryTertiaryAppealsDenialsRejectionsComponent;
    let fixture: ComponentFixture<SecondaryTertiaryAppealsDenialsRejectionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SecondaryTertiaryAppealsDenialsRejectionsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SecondaryTertiaryAppealsDenialsRejectionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
