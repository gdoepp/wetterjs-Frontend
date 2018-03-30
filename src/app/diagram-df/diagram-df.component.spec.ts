import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodeDfComponent } from './diagram-df.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataTransferService } from '../datatransfer.service';
import { WetterService } from '../wetter.service';

describe('PeriodeDfComponent', () => {
  let component: PeriodeDfComponent;
  let fixture: ComponentFixture<PeriodeDfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodeDfComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [WetterService, DataTransferService, HttpClientModule]
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
