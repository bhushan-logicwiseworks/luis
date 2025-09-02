import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileVaultFileListComponent } from './vault-center-file-list.component';

describe('FileVaultFileListComponent', () => {
    let component: FileVaultFileListComponent;
    let fixture: ComponentFixture<FileVaultFileListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [FileVaultFileListComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FileVaultFileListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
