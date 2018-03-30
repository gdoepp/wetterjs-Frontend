import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeDrComponent } from './diagram-dr.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataTransferService } from '../datatransfer.service';
import { WetterService } from '../wetter.service';

describe('PeriodeDrComponent', () => {
  let component: PeriodeDrComponent;
  let fixture: ComponentFixture<PeriodeDrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodeDrComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [WetterService, DataTransferService, HttpClientModule]
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
