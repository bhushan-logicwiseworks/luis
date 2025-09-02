import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommCenterEmailComponent } from './comm-center-email.component';

describe('CommCenterEmailComponent', () => {
    let component: CommCenterEmailComponent;
    let fixture: ComponentFixture<CommCenterEmailComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [CommCenterEmailComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommCenterEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
