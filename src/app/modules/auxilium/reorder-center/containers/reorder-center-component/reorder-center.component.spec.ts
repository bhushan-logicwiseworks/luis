import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReorderCenterComponent } from './reorder-center.component';

describe('ReorderCenterComponent', () => {
    let component: ReorderCenterComponent;
    let fixture: ComponentFixture<ReorderCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ReorderCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReorderCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
