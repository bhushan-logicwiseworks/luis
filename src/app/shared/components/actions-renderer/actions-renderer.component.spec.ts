import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActionsRedererComponent } from './actions-renderer.component';

describe('ActionsRedererComponent', () => {
    let component: ActionsRedererComponent;
    let fixture: ComponentFixture<ActionsRedererComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ActionsRedererComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionsRedererComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
