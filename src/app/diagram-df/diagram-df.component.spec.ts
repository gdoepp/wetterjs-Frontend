import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeDfComponent } from './diagram-df.component';

describe('PeriodeDfComponent', () => {
  let component: PeriodeDfComponent;
  let fixture: ComponentFixture<PeriodeDfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodeDfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodeDfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
