import { TestBed } from '@angular/core/testing';

import { AuxUtilService } from './aux-utils.service';

describe('AuxTransformValuesService', () => {
    let service: AuxUtilService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuxUtilService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
