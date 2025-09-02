import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    search = new BehaviorSubject<string>(null);
    search$ = this.search.asObservable();

    constructor() {}
}
