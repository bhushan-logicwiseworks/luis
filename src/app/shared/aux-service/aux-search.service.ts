import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuxSearchService {
    search = new BehaviorSubject<string>(null);
    search$ = this.search.asObservable();

    currentComponentFilterKey$ = new BehaviorSubject<string | null>(null);
    resetFilter = new BehaviorSubject<{ resetGrid: boolean; removeFromStorage?: boolean }>({
        resetGrid: false,
        removeFromStorage: false,
    });
    resetFilter$ = this.resetFilter.asObservable();

    constructor() {}

    saveFilterState(filterState: any, key) {
        localStorage.setItem(key, JSON.stringify(filterState));
    }

    getFilterState(key): any {
        const storedFilterState = localStorage.getItem(key);
        return storedFilterState ? JSON.parse(storedFilterState) : null;
    }

    savePaginationState(filterState: any, key) {
        localStorage.setItem(key, JSON.stringify(filterState));
    }

    getPaginationState(key): any {
        const storedFilterState = localStorage.getItem(key);
        return storedFilterState ? JSON.parse(storedFilterState) : null;
    }
}
