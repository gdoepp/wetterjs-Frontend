import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';

import { DataTransferService } from './datatransfer.service';
import {WetterService} from './wetter.service';
import { AuswahlComponent } from './auswahl/auswahl.component';
import { PeriodeDtComponent } from './diagram-dt/diagram-dt.component';
import { PeriodeDpComponent } from './diagram-dp/diagram-dp.component';
import { PeriodeDrComponent } from './diagram-dr/diagram-dr.component';
import { PeriodeDfComponent } from './diagram-df/diagram-df.component';
import { ListeComponent } from './liste/liste.component';
import { UpdateComponent } from './update/update.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auswahl;stat=0', pathMatch: 'full' },
  { path: 'auswahl', component: AuswahlComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'listPeriodeDT', component: PeriodeDtComponent },
  { path: 'listPeriodeDR', component: PeriodeDrComponent },
  { path: 'listPeriodeDN', component: PeriodeDrComponent },
  { path: 'listPeriodeDS', component: PeriodeDrComponent },
  { path: 'listPeriodeDL', component: PeriodeDpComponent },
  { path: 'listPeriodeDH', component: PeriodeDpComponent },
  { path: 'listPeriodeDP', component: PeriodeDpComponent },
  { path: 'listPeriodeDF', component: PeriodeDfComponent },
  { path: 'listMonate', component: ListeComponent },
  { path: 'listMonat', component: ListeComponent },
  { path: 'listTag', component: ListeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AuswahlComponent,
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
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [WetterService, DataTransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
