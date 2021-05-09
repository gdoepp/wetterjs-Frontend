import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AktuellComponent } from './aktuell.component';
import { WetterService } from '../wetter.service';
import { HttpClientModule } from '@angular/common/http';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTransferService } from '../datatransfer.service';

describe('AktuellComponent', () => {
  let component: AktuellComponent;
  let fixture: ComponentFixture<AktuellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ AktuellComponent,  ],
      providers: [WetterService, HttpClientModule, RouterTestingModule, DataTransferService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AktuellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
