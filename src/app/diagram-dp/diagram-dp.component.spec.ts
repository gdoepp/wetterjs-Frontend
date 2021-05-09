import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PeriodeDpComponent } from './diagram-dp.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataTransferService } from '../datatransfer.service';
import { WetterService } from '../wetter.service';

describe('PeriodeDpComponent', () => {
  let component: PeriodeDpComponent;
  let fixture: ComponentFixture<PeriodeDpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodeDpComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [WetterService, DataTransferService, HttpClientModule]
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
