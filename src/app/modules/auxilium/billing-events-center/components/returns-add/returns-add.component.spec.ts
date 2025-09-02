import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsAddComponent } from './returns-add.component';

describe('ReturnsAddComponent', () => {
    let component: ReturnsAddComponent;
    let fixture: ComponentFixture<ReturnsAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReturnsAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ReturnsAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
