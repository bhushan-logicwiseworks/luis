import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommCenterGroupEditComponent } from './comm-center-group-edit.component';

describe('CommCenterGroupEditComponent', () => {
    let component: CommCenterGroupEditComponent;
    let fixture: ComponentFixture<CommCenterGroupEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [CommCenterGroupEditComponent],
}).compileComponents();

        fixture = TestBed.createComponent(CommCenterGroupEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
