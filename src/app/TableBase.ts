// (c) Gerhard Döppert, 2018, GNU GPL 3

import {IWertListe} from './IWertListe';
import { WetterViewBase } from './WetterViewBase';
import { ActivatedRoute } from '@angular/router';
import { WetterService } from './wetter.service';
import { DataTransferService } from './datatransfer.service';

export class TableBase extends WetterViewBase {

   private colWerte1 = {'temp_o': 'aktuell', 'temp_o1': 'aktuell', 'temp_o_min': 'Min', 'temp_o_absmin': 'abs Min',
  'temp_o_max': 'Max', 'temp_o_absmax': 'abs Max', 'temp_o_avg': 'Mittel', 'taup': 'TauP',
  'temp_i1': 'aktuell', 'temp_i1_avg': 'Mittel', 'temp_i2': 'aktuell', 'temp_i2_avg': 'Mittel 2',
  'temp_o2': 'aktuell2', 'temp_i3': 'aktuell3', 'temp_i4': 'aktuell4', 'temp_i5': 'aktuell5',
  'hum_o': 'rel. Feuchte', 'hum_i': 'rel. Feuchte', 'pres': 'Luftdruck', 'lum_o': 'Helligkeit', 'lum_i': 'Helligkeit',
  'precip': 'Niederschlag', 'sun': 'Sonne', 'cloud': 'Wolken', 'windd': 'Richtung', 'windf': 'Stärke', 'windf_max': 'Stärke max'};

  private colWerte2 = {'temp_o': 'Temp', 'temp_o1': 'TempW', 'temp_o_min': 'Temp Min', 'temp_o_absmin': 'Temp abs Min',
  'temp_o_max': 'Temp Max', 'temp_o_absmax': 'Temp abs Max', 'temp_o_avg': 'Temp Mittel', 'temp_o2': 'TempO',
  'temp_i1': 'TempW1', 'temp_i1_avg': 'TempW1 Mittel', 'temp_i2': 'TempW2', 'temp_i2_avg': 'TempW2 Mittel',
   'temp_i3': 'TempB', 'temp_i4': 'TempS', 'temp_i5': 'TempF', 'taup': 'TauP',
  'hum_o': 'rel. Feuchte', 'hum_i': 'rel. Feuchte', 'pres': 'Luftdruck', 'lum_o': 'Helligkeit', 'lum_i': 'Helligkeit',
  'precip': 'Niederschlag', 'sun': 'Sonne', 'cloud': 'Wolken', 'windd': 'Richtung', 'windf': 'Stärke', 'windf_max': 'Stärke max'};

  private colGroups1 = {'temp_o': 'Temperatur', 'temp_o1': 'Temperatur', 'temp_o_min': 'Temperatur', 'temp_o_absmin': 'Temperatur',
  'temp_o_max': 'Temperatur', 'temp_o_absmax': 'Temperatur', 'temp_o_avg': 'Temperatur',
  'temp_o2': 'Temperatur', 'temp_i3': 'Temperatur', 'temp_i4': 'Temperatur', 'temp_i5': 'Temperatur',
  'temp_i1': 'Temperatur', 'temp_i1_avg': 'Temperatur', 'temp_i2': 'Temperatur', 'temp_i2_avg': 'Temperatur',
  'hum_o': '', 'hum_i': '', 'pres': '', 'lum_o': '', 'lum_i': '', 'taup': 'Temperatur',
  'precip': '', 'sun': '', 'cloud': '', 'windd': 'Wind', 'windf': 'Wind', 'windf_max': 'Wind'};

  private colGroups2 = {'temp_o': 'außen', 'temp_o1': 'außen', 'temp_o_min': 'außen', 'temp_o_absmin': 'außen',
  'temp_o_max': 'außen', 'temp_o_absmax': 'außen', 'temp_o_avg': 'außen', 'temp_o2': 'außen', 'taup': 'außen',
  'temp_i1': 'innen', 'temp_i1_avg': 'innen', 'temp_i2': 'innen', 'temp_i2_avg': 'innen', 'temp_i3': 'innen',
  'hum_o': 'außen', 'hum_i': 'innen', 'pres': 'außen', 'lum_o': 'außen', 'lum_i': 'innen', 'temp_i4': 'innen',
  'precip': 'außen', 'sun': 'außen', 'cloud': 'außen', 'windd': 'außen', 'windf': 'außen', 'windf_max': 'außen'};

  public data: IWertListe = new IWertListe;
  public values: string[] = [];
  public colgrname: string[] = [];
  public colgrlen: number[] = [];
  public werte: string[] = [];

  constructor(route: ActivatedRoute, wetter: WetterService, toParent: DataTransferService) {
    super(route, wetter, toParent);
  }

 prepare() {

  const data = this.data;

  if (data.rows.length === 0) { return; }

  console.log('found data for tab');

  if (data.rows[0].windd) {
    for (let k = 0; k < data.rows.length; k++) {
      const tv = data.rows[k];
      tv.windd = Math.round(tv.windd[1]);
    }
  }

  let groups;
  let werte;

  if (this.stat > 0) {
    groups = this.colGroups1;
    werte = this.colWerte1;
  }  else {
    groups = this.colGroups2;
    werte = this.colWerte2;
  }

  this.values = [];
  this.colgrname = [];
  this.colgrlen = [];
  const grpknown = {};
  for (const f in data.rows[0]) {
    if (werte[f]) {
      this.values.push(f);
      if (groups) {
        const grp = groups[f];
        const k = grpknown[grp];
        if (! (k >= 0)) {
          grpknown[grp] = this.colgrlen.length;
          this.colgrname.push(grp);
          this.colgrlen.push(1);
        } else {
          this.colgrlen[k]++;
        }
      }
    }
  }
  this.werte = werte;
}
}
