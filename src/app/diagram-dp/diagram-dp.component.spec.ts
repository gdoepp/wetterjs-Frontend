import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeDpComponent } from './diagram-dp.component';

describe('PeriodeDpComponent', () => {
  let component: PeriodeDpComponent;
  let fixture: ComponentFixture<PeriodeDpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodeDpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodeDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
