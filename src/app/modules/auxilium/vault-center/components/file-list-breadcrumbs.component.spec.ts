import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListBreadcrumbsComponent } from './file-list-breadcrumbs.component';

describe('FileListBreadcrumbsComponent', () => {
    let component: FileListBreadcrumbsComponent;
    let fixture: ComponentFixture<FileListBreadcrumbsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [FileListBreadcrumbsComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FileListBreadcrumbsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
