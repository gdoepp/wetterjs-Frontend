import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuswahlComponent } from './auswahl.component';
import { WetterService } from '../wetter.service';
import { HttpClientModule } from '@angular/common/http';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTransferService } from '../datatransfer.service';

describe('AuswahlComponent', () => {
  let component: AuswahlComponent;
  let fixture: ComponentFixture<AuswahlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ AuswahlComponent,  ],
      providers: [WetterService, HttpClientModule, RouterTestingModule, DataTransferService]
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
