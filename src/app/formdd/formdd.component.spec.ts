import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormddComponent } from './formdd.component';

describe('FormddComponent', () => {
  let component: FormddComponent;
  let fixture: ComponentFixture<FormddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
