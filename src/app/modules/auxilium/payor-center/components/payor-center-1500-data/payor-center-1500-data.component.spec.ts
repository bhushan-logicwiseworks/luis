import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayorCenter1500DataComponent } from './payor-center-1500-data.component';

describe('PayorCenter1500DataComponent', () => {
  let component: PayorCenter1500DataComponent;
  let fixture: ComponentFixture<PayorCenter1500DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayorCenter1500DataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayorCenter1500DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
