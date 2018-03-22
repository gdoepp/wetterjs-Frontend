import {IWertListe} from './IWertListe';

export class TableBase {

   private colWerte1 = {'temp_o': 'aktuell', 'temp_o1': 'aktuell', 'temp_o_min': 'Min', 'temp_o_absmin': 'abs Min',
  'temp_o_max': 'Max', 'temp_o_absmax': 'abs Max', 'temp_o_avg': 'Mittel',
  'temp_i1': 'aktuell', 'temp_i1_avg': 'Mittel', 'temp_i2': 'aktuell', 'temp_i2_avg': 'Mittel 2',
  'temp_o2': 'aktuell2', 'temp_i3': 'aktuell3', 'temp_i4': 'aktuell4',
  'hum_o': 'rel. Feuchte', 'hum_i': 'rel. Feuchte', 'pres': 'Luftdruck', 'lum_o': 'Helligkeit', 'lum_i': 'Helligkeit',
  'precip': 'Niederschlag', 'sun': 'Sonne', 'cloud': 'Wolken', 'windd': 'Richtung', 'windf': 'Stärke', 'windf_max': 'Stärke max'};

  private colWerte2 = {'temp_o': 'Temp', 'temp_o1': 'Temp1', 'temp_o_min': 'Temp Min', 'temp_o_absmin': 'Temp abs Min',
  'temp_o_max': 'Temp Max', 'temp_o_absmax': 'Temp abs Max', 'temp_o_avg': 'Temp Mittel', 'temp_o2': 'Temp2',
  'temp_i1': 'Temp', 'temp_i1_avg': 'Temp Mittel', 'temp_i2': 'Temp 2', 'temp_i2_avg': 'Temp 2 Mittel',
   'temp_i3': 'Temp3', 'temp_i4': 'Temp4',
  'hum_o': 'rel. Feuchte', 'hum_i': 'rel. Feuchte', 'pres': 'Luftdruck', 'lum_o': 'Helligkeit', 'lum_i': 'Helligkeit',
  'precip': 'Niederschlag', 'sun': 'Sonne', 'cloud': 'Wolken', 'windd': 'Richtung', 'windf': 'Stärke', 'windf_max': 'Stärke max'};

  private colGroups1 = {'temp_o': 'Temperatur', 'temp_o1': 'Temperatur', 'temp_o_min': 'Temperatur', 'temp_o_absmin': 'Temperatur',
  'temp_o_max': 'Temperatur', 'temp_o_absmax': 'Temperatur', 'temp_o_avg': 'Temperatur',
  'temp_o2': 'Temperatur', 'temp_i3': 'Temperatur', 'temp_i4': 'Temperatur',
  'temp_i1': 'Temperatur', 'temp_i1_avg': 'Temperatur', 'temp_i2': 'Temperatur', 'temp_i2_avg': 'Temperatur',
  'hum_o': '', 'hum_i': '', 'pres': '', 'lum_o': '', 'lum_i': '',
  'precip': '', 'sun': '', 'cloud': '', 'windd': 'Wind', 'windf': 'Wind', 'windf_max': 'Wind'};

  private colGroups2 = {'temp_o': 'außen', 'temp_o1': 'außen', 'temp_o_min': 'außen', 'temp_o_absmin': 'außen',
  'temp_o_max': 'außen', 'temp_o_absmax': 'außen', 'temp_o_avg': 'außen', 'temp_o2': 'außen',
  'temp_i1': 'innen', 'temp_i1_avg': 'innen', 'temp_i2': 'innen', 'temp_i2_avg': 'innen', 'temp_i3': 'innen',
  'hum_o': 'außen', 'hum_i': 'innen', 'pres': 'außen', 'lum_o': 'außen', 'lum_i': 'innen', 'temp_i4': 'innen',
  'precip': 'außen', 'sun': 'außen', 'cloud': 'außen', 'windd': 'außen', 'windf': 'außen', 'windf_max': 'außen'};

  protected stat: number;
  protected data: IWertListe = new IWertListe;
  protected values: string[] = [];
  protected colgrname: string[] = [];
  protected colgrlen: number[] = [];
  protected werte: string[] = [];


 prepareList(data: IWertListe) {

  if (data.rows.length === 0) { return; }

  console.log('found data');

  if (data.rows[0].windd) {
    for (let k = 0; k < data.rows.length; k++) {
      const tv = data.rows[k];
      tv.windd = Math.round(tv.windd[1]);
    }
    console.log('rounded windd');
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
      console.log('value ' + f);
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
