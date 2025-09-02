import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileActionsMenuComponent } from './file-actions-menu.component';

describe('FileActionsMenuComponent', () => {
    let component: FileActionsMenuComponent;
    let fixture: ComponentFixture<FileActionsMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [FileActionsMenuComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FileActionsMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
