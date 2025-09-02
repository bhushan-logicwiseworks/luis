import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TitleService {
    private valueSubject = new BehaviorSubject<string>('Initial Value');
    value$ = this.valueSubject.asObservable();

    setValue(newValue: string) {
        this.valueSubject.next(newValue);
    }
}
