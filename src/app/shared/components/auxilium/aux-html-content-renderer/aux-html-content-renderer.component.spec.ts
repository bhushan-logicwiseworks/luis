import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxHtmlContentRendererComponent } from './aux-html-content-renderer.component';

describe('AuxHtmlContentRendererComponent', () => {
    let component: AuxHtmlContentRendererComponent;
    let fixture: ComponentFixture<AuxHtmlContentRendererComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AuxHtmlContentRendererComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AuxHtmlContentRendererComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
