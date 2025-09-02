import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlRendererComponentComponent } from './html-renderer-component.component';

describe('HtmlRendererComponentComponent', () => {
    let component: HtmlRendererComponentComponent;
    let fixture: ComponentFixture<HtmlRendererComponentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    declarations: [HtmlRendererComponentComponent],
}).compileComponents();

        fixture = TestBed.createComponent(HtmlRendererComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
