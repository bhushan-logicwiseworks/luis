import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ZipCodeCenterTableComponent } from './zipcode-center-table.component';

describe('NewZipCodeCenterTableComponent', () => {
    let component: ZipCodeCenterTableComponent;
    let fixture: ComponentFixture<ZipCodeCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ZipCodeCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ZipCodeCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
