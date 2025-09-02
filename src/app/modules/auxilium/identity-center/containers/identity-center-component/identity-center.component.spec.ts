import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IdentityCenterComponent } from './identity-center.component';

describe('IdentityCenterComponent', () => {
    let component: IdentityCenterComponent;
    let fixture: ComponentFixture<IdentityCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [IdentityCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IdentityCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
