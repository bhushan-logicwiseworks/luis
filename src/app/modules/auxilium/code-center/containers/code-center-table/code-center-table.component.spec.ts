import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CodeCenterTableComponent } from './code-center-table.component';

describe('NewCodeCenterTableComponent', () => {
    let component: CodeCenterTableComponent;
    let fixture: ComponentFixture<CodeCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [CodeCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CodeCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
