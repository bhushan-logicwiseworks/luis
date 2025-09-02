import { TestBed } from '@angular/core/testing';

import { AuxSearchService } from './aux-search.service';

describe('AuxSearchService', () => {
    let service: AuxSearchService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuxSearchService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
