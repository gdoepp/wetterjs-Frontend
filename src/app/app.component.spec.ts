import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AktuellComponent } from './aktuell/aktuell.component';
import { ListeComponent } from './liste/liste.component';
import { PeriodeDfComponent } from './diagram-df/diagram-df.component';
import { PeriodeDpComponent } from './diagram-dp/diagram-dp.component';
import { PeriodeDtComponent } from './diagram-dt/diagram-dt.component';
import { PeriodeDrComponent } from './diagram-dr/diagram-dr.component';
import { MainComponent } from './main/main.component';
import { UpdateComponent } from './update/update.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WetterService } from './wetter.service';
import { DataTransferService } from './datatransfer.service';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';

import { RouterTestingModule } from '@angular/router/testing';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterModule, HttpClientModule, RouterTestingModule
       ],
      declarations: [
        AppComponent,
        AktuellComponent,
        ListeComponent,
        PeriodeDfComponent,
        PeriodeDpComponent,
        PeriodeDtComponent,
        PeriodeDrComponent,
        MainComponent,
        UpdateComponent,

      ],
      providers: [
        WetterService,
        DataTransferService,
        HttpClientModule,
        RouterModule

      ]
    }).compileComponents();
  }));


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Wetter-Retro');
  }));
});
