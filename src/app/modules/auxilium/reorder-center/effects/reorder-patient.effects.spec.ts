import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ReorderPatientEffects } from './reorder-patient.effects';

describe('ReorderPatientEffects', () => {
    let actions$: Observable<any>;
    let effects: ReorderPatientEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ReorderPatientEffects, provideMockActions(() => actions$)],
        });

        effects = TestBed.inject(ReorderPatientEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
