import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CodeCenterComponent } from './code-center.component';

describe('CodeCenterComponent', () => {
    let component: CodeCenterComponent;
    let fixture: ComponentFixture<CodeCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [CodeCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CodeCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
