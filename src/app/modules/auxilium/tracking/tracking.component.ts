import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApiService } from 'app/core/services/api.service';
import { MatIcon } from '@angular/material/icon';

@UntilDestroy()
@Component({
    selector: 'app-tracking',
    templateUrl: './tracking.component.html',
    styleUrls: ['./tracking.component.scss'],
    imports: [MatIcon],
})
export class TrackingComponent implements OnInit {
    url: string;
    trackingnumber: string;
    item: {
        id: string;
        patientId: string;
        vendor: string;
        poNumber: string;
        shipStatus: string;
        shippingCarrier: string;
        trackingNumber: string;
        shipDate: string;
        actualDeliveryDate: string;
        actualDeliveryDateTZ: string;
        city: string;
        state: string;
        zipCode: string;
        signer: string;
        infoFound: string;
        carrierLogo: string;
        progressBar: string;
    } = {
        id: '',
        patientId: '',
        vendor: '',
        poNumber: '',
        shipStatus: '',
        shippingCarrier: '',
        trackingNumber: '',
        shipDate: '',
        actualDeliveryDate: '',
        actualDeliveryDateTZ: '',
        city: '',
        state: '',
        zipCode: '',
        signer: '',
        infoFound: '',
        carrierLogo: '',
        progressBar: '',
    };

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public apiServices: ApiService
    ) {}

    ngOnInit() {
        this.trackingnumber = this.activatedRoute.snapshot.paramMap.get('trackingnumber');
        this.getData();
    }

    getData(): void {
        this.apiServices
            .getTrackingDetails(this.trackingnumber)
            .pipe(untilDestroyed(this))
            .subscribe(results => {
                this.item = results[0];
                if (this.item.infoFound == 'false') {
                    this.router.navigateByUrl('');
                } else {
                    this.url = this.getCarrierURL(this.item.shippingCarrier, this.item.trackingNumber);
                }
            });
    }

    getCarrierURL(shippingCarrier, trackingNumber) {
        var carrier = this.getCarrierCode(shippingCarrier);
        var url;
        switch (carrier) {
            case 'UPS':
                url = 'https://wwwapps.ups.com/WebTracking?TypeOfInquiryNumber=T&InquiryNumber1=[TRACKINGNUMBER]';
                break;
            case 'USPS':
                url =
                    'https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=[TRACKINGNUMBER]';
                break;
            case 'FEDEX':
                url = 'https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=[TRACKINGNUMBER]';
                break;
        }
        url = url.replace('[TRACKINGNUMBER]', trackingNumber);
        return url;
    }

    getCarrierCode(shippingCarrier) {
        var carrier;
        if (shippingCarrier.toUpperCase().includes('USPS')) {
            carrier = 'USPS';
        } else if (shippingCarrier.toUpperCase().includes('UPS')) {
            carrier = 'UPS';
        } else if (shippingCarrier.toUpperCase().includes('FEDEX')) {
            carrier = 'FEDEX';
        }
        return carrier;
    }
}
