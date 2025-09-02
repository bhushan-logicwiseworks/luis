import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SourceChipComponent } from './aux-source-chip.component';

describe('SourceChipComponent', () => {
    let component: SourceChipComponent;
    let fixture: ComponentFixture<SourceChipComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [SourceChipComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SourceChipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
