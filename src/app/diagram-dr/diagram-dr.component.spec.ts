import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeDrComponent } from './diagram-dr.component';

describe('PeriodeDrComponent', () => {
  let component: PeriodeDrComponent;
  let fixture: ComponentFixture<PeriodeDrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodeDrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodeDrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
