import { TestBed } from '@angular/core/testing';

import { ReorderCenterService } from './reorder-center.service';

describe('ReorderCenterService', () => {
    let service: ReorderCenterService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ReorderCenterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
