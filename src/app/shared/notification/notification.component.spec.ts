import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TestSnackbarModule } from '../../../test/test-snackbar.module';
import { NotificationComponent } from './notification.component';

describe('SnackbarSuccessComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [TestSnackbarModule.forRoot({}), FontAwesomeModule],
    declarations: [NotificationComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
