import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListeComponent } from './liste.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataTransferService } from '../datatransfer.service';
import { WetterService } from '../wetter.service';

describe('ListeComponent', () => {
  let component: ListeComponent;
  let fixture: ComponentFixture<ListeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [WetterService, DataTransferService, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
