import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuswahlComponent } from './auswahl.component';

describe('AuswahlComponent', () => {
  let component: AuswahlComponent;
  let fixture: ComponentFixture<AuswahlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuswahlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuswahlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
