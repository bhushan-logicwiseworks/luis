import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingDemographicsComponent } from './posting-demographics.component';

describe('PostingDemographicsComponent', () => {
    let component: PostingDemographicsComponent;
    let fixture: ComponentFixture<PostingDemographicsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PostingDemographicsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PostingDemographicsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
