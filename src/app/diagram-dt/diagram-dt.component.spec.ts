import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeDtComponent } from './diagram-dt.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { WetterService } from '../wetter.service';
import { DataTransferService } from '../datatransfer.service';

describe('PeriodeDtComponent', () => {
  let component: PeriodeDtComponent;
  let fixture: ComponentFixture<PeriodeDtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodeDtComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [WetterService, DataTransferService, HttpClientModule]
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
