import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileVaultActionBarComponent } from './vault-center-action-bar.component';

describe('FileVaultActionBarComponent', () => {
    let component: FileVaultActionBarComponent;
    let fixture: ComponentFixture<FileVaultActionBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [FileVaultActionBarComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FileVaultActionBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
