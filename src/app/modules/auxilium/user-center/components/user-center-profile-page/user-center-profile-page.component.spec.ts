import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCenterProfilePageComponent } from './user-center-profile-page.component';

describe('UserCenterProfilePageComponent', () => {
    let component: UserCenterProfilePageComponent;
    let fixture: ComponentFixture<UserCenterProfilePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [UserCenterProfilePageComponent],
}).compileComponents();

        fixture = TestBed.createComponent(UserCenterProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
