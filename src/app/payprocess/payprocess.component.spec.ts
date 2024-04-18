import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayprocessComponent } from './payprocess.component';

describe('PayprocessComponent', () => {
  let component: PayprocessComponent;
  let fixture: ComponentFixture<PayprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayprocessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
