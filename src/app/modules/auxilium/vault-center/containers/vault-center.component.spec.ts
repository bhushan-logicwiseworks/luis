import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileVaultComponent } from './vault-center.component';

describe('FileVaultComponent', () => {
    let component: FileVaultComponent;
    let fixture: ComponentFixture<FileVaultComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [FileVaultComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FileVaultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
