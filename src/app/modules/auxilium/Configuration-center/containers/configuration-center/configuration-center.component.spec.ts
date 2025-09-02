import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationCenterComponent } from './configuration-center.component';

describe('ConfigurationCenterComponent', () => {
    let component: ConfigurationCenterComponent;
    let fixture: ComponentFixture<ConfigurationCenterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ConfigurationCenterComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ConfigurationCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
