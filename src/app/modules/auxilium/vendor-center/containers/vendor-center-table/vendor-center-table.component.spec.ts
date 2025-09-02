import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { VenderCenterTableComponent } from './vendor-center-table.component';

describe('NewVenderCenterTableComponent', () => {
    let component: VenderCenterTableComponent;
    let fixture: ComponentFixture<VenderCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [VenderCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VenderCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
