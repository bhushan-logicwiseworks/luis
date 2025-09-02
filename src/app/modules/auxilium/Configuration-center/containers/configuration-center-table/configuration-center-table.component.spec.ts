import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationCenterTableComponent } from './configuration-center-table.component';

describe('ConfigurationCenterTableComponent', () => {
    let component: ConfigurationCenterTableComponent;
    let fixture: ComponentFixture<ConfigurationCenterTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ConfigurationCenterTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ConfigurationCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
