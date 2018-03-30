import { async, ComponentFixture, TestBed, } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { WetterService } from '../wetter.service';
import { DataTransferService } from '../datatransfer.service';
import { HttpClientModule } from '@angular/common/http';
import { By } from 'selenium-webdriver';


describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      providers: [WetterService, DataTransferService, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have stations', async( () => {

      fixture.detectChanges();
      expect(component.stationListe.stats.length).toBeGreaterThan(1);
  }));
});
