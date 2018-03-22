import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeDtComponent } from './diagram-dt.component';

describe('PeriodeDtComponent', () => {
  let component: PeriodeDtComponent;
  let fixture: ComponentFixture<PeriodeDtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodeDtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodeDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
