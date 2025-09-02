import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextDosComponent } from './next-dos.component';

describe('NextDosComponent', () => {
  let component: NextDosComponent;
  let fixture: ComponentFixture<NextDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextDosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
