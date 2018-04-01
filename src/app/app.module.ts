import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';

import { DataTransferService } from './datatransfer.service';
import {WetterService} from './wetter.service';
import { AktuellComponent } from './aktuell/aktuell.component';
import { PeriodeDtComponent } from './diagram-dt/diagram-dt.component';
import { PeriodeDpComponent } from './diagram-dp/diagram-dp.component';
import { PeriodeDrComponent } from './diagram-dr/diagram-dr.component';
import { PeriodeDfComponent } from './diagram-df/diagram-df.component';
import { ListeComponent } from './liste/liste.component';
import { UpdateComponent } from './update/update.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/aktuell;stat=0;per=aktuell', pathMatch: 'full' },
  { path: 'aktuell', component: AktuellComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'listPeriodeDT', component: PeriodeDtComponent },
  { path: 'listPeriodeDR', component: PeriodeDrComponent },
  { path: 'listPeriodeDN', component: PeriodeDrComponent },
  { path: 'listPeriodeDS', component: PeriodeDrComponent },
  { path: 'listPeriodeDL', component: PeriodeDpComponent },
  { path: 'listPeriodeDH', component: PeriodeDpComponent },
  { path: 'listPeriodeDP', component: PeriodeDpComponent },
  { path: 'listPeriodeDF', component: PeriodeDfComponent },
  { path: 'listPeriode', component: ListeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AktuellComponent,
    PeriodeDtComponent,
    PeriodeDpComponent,
    PeriodeDrComponent,
    PeriodeDfComponent,
    ListeComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [WetterService, DataTransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
