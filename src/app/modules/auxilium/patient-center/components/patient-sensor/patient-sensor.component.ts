import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { PatientCenterSensorActions } from '../../actions/patient-center-sensor.action';
import { PatientSensorSelectors } from '../../reducers';
import { TitleService } from '../../services/title.service';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { AsyncPipe } from '@angular/common';
@UntilDestroy()
@Component({
    selector: 'ac-patient-sensor',
    templateUrl: './patient-sensor.component.html',
    imports: [
        FuseHorizontalNavigationComponent,
        LoadingOverlayComponent,
        AsyncPipe,
    ],
})
export class PatientSensorComponent implements OnInit {
    toolbarData: FuseNavigationItem[];
    title: string;
    patientId: any;
    htmlContent: any;
    loading$ = this.store.select(PatientSensorSelectors.selectLoading);
    data$ = this.store.select(PatientSensorSelectors.selectSensor);
    @ViewChild('shadowElem') private shadowElem: ElementRef<HTMLElement>;

    constructor(
        private store: Store,
        private router: Router,
        private titleService: TitleService
    ) {
        this.toolbarData = [
            {
                title: 'Send to Patient',
                type: 'basic',
                icon: 'mat_outline:save',
                function: () => {
                    this.send();
                },
            },
        ];
    }

    ngOnInit(): void {
        // Set title
        this.title = this.router.url.split('/')[4];
        this.patientId = this.router.url.split('/')[3];
        this.titleService.setValue(this.title);

        this.store.dispatch(PatientCenterSensorActions.LoadPatientSensor({ id: this.patientId }));
    }

    ngAfterViewInit() {
        const shadowDom = this.shadowElem.nativeElement.attachShadow({ mode: 'open' });
        const elem = document.createElement('div');
        shadowDom.appendChild(elem);

        this.data$.pipe(untilDestroyed(this)).subscribe(email => {
            elem.innerHTML = email.html;
        });
    }

    send() {}
}
