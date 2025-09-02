import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ZipCodeCenterComponent } from './zipcode-center.component';

describe('ZipCodeCenterComponent', () => {
    let component: ZipCodeCenterComponent;
    let fixture: ComponentFixture<ZipCodeCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ZipCodeCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ZipCodeCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
