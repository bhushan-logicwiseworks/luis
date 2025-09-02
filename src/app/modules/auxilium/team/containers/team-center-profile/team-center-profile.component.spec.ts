import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCenterProfileComponent } from './team-center-profile.component';

describe('TeamCenterProfileComponent', () => {
    let component: TeamCenterProfileComponent;
    let fixture: ComponentFixture<TeamCenterProfileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [TeamCenterProfileComponent],
}).compileComponents();

        fixture = TestBed.createComponent(TeamCenterProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
