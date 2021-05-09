import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { WetterService } from '../wetter.service';
import { DataTransferService } from '../datatransfer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';


describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let http: HttpTestingController;
  let wetter: WetterService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [WetterService, DataTransferService ]
    })
    .compileComponents();
     http = TestBed.get(HttpTestingController);
     wetter = TestBed.get(WetterService);
  });

  beforeEach(() => {
      fixture = TestBed.createComponent(MainComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });

  it('should have stations', waitForAsync( () => {
    const req = http.expectOne(environment.baseUrl + '/');
    req.flush({stats: [{id: '00000', name: '####', vals: ['temp', 'hum']},
                        {id: '04928', name: 'Stuttgart', vals: ['temp', 'hum']} ],
       admin: 1, links: [{rel: 'templateJahr', method: 'post'}],
       rows: [{stat: '04928', jahr: 1951, type: 'Station'}]});
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.stationListe.stats.length).toBeGreaterThan(1);
  }));
});
