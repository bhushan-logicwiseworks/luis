import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReorderCenterTableComponent } from './reorder-center-table.component';

describe('ReorderCenterTableComponent', () => {
    let component: ReorderCenterTableComponent;
    let fixture: ComponentFixture<ReorderCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ReorderCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReorderCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
