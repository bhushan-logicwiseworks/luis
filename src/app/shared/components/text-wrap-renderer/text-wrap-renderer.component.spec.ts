import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWrapRendererComponent } from './text-wrap-renderer.component';

describe('TextWrapRendererComponent', () => {
    let component: TextWrapRendererComponent;
    let fixture: ComponentFixture<TextWrapRendererComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [TextWrapRendererComponent],
}).compileComponents();

        fixture = TestBed.createComponent(TextWrapRendererComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
