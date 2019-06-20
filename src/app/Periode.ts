// (c) Gerhard Döppert, 2018, GNU GPL 3

export class Zeit {

    public  monName: string[] = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli',
       'August', 'September', 'Oktober', 'November', 'Dezember'];
    public monlen: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    public mon1st: number[] = [];
    public xaxis: string[]; // Beschriftung x-Achse: Monatsnamen
    public title: string;
    public index0: number; // Intervall x-Koordinaten in Welt-Einheiten von
    public indexn: number;  // ... bis
    public super: string;
    public vorher: string;
    public nachher: string;

    constructor(jahr: number) {

        let mon1st0 = 0;

        this.monlen[1] = (jahr % 4 === 0 ? 29 : 28);

        for (let j = 0; j < 12; j++) {
            this.mon1st.push(mon1st0);
            mon1st0 += this.monlen[j];
        }
    }
    index(tv, offset = 0) {
        return 0;
    }
    tick() {
        return [];
    }
    pad(x, size) {
        const sign = Math.sign(x) === -1 ? '-' : '';
        return sign + new Array(size).concat([Math.abs(x)]).join('0').slice(-size);
      }
}

export class Jahr extends Zeit {

    constructor(jahr: number) {
        super(jahr);
        this.xaxis = this.monName;
        this.title = 'im Jahresverlauf ' + jahr;
        this.index0 = 0;
        this.indexn = 12;
    }

    index(tv, offset = 0) { // x-Koordinaten in Welt-Einheiten:
        const mon = tv.monat.split('.', 2);
        return mon[0] - 1 + offset;
    }
    tick() {			// Beschriftung x-Achse, x-Koordinaten in Welt-Einheiten
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
}

export class Monat extends Zeit {

    public items: number;
    private x;

    constructor(monjahr: string) {

        const mon = monjahr.trim().split('.');
        const monat = Number(mon[0]);
        const jahr = Number(mon[1]);

        super(jahr);

        const tage = [];
        this.x = [];
        for (let j = 0; j < this.monlen[monat - 1]; j++) {
            this.x.push(j);
            tage.push(j + 1);
        }
        this.x.push(this.monlen[monat - 1]);

        let monat1 = monat - 1;
        let jahr1 = jahr;
        if (monat1 === 0) { jahr1--; monat1 = 12; }
        const vormonat = monat1 + '.' + jahr1;
        jahr1 = jahr;
        monat1 = monat + 1;
        if (monat1 === 13) { monat1 = 1; jahr1++; }
        const nmonat = monat1 + '.' + jahr1;

        this.xaxis = tage;
        this.title = 'im Monatsverlauf ' + monjahr;
        this.index0 = 0;
        this.indexn = this.monlen[monat - 1];
        this.items = this.x.length;
        this.super = jahr.toString();
        this.vorher = vormonat;
        this.nachher = nmonat;
    }

    index(tv, offset = 0) { // x-Koordinaten in Welt-Einheiten:
        return tv.tag - 1 + offset;   // Tageszahl: 1-31 (relativ zur Beschriftung: Tagesmitte
    }

    tick() {			// Beschriftung x-Achse, x-Koordinaten in Welt-Einheiten
        return this.x;
    }
}

function toDay(tag): Date {
    if (tag && tag !== 'undefined' && tag !== 0) {
        let tg = tag.split('.');
        if (tg.length !== 3) {
            tg = tag.split('-');
            tag = new Date(tg[0], tg[1] - 1, tg[2]);
        } else {
            tag = new Date(tg[2], tg[1] - 1, tg[0]);
        }
    } else {
        tag = new Date();
    }
    return tag;
}

export class Tag extends Zeit {

    public items: number;
    public heute: string;
    public monat: string;
    protected tag1: number;

    constructor(tag, offset) {

        tag = toDay(tag);

        super(tag.getFullYear());
        this.tag1 = tag.getTime();

        const x = [];

        if (offset === 0) {
            x.push('23-');
            offset = 1;
        } else {
            offset = 0;
        }

        for (let j = 0; j <= 24 - offset; j++) { x.push(this.pad(j, 2)); }

        const gestern = new Date(tag);
        gestern.setDate(tag.getDate() - 1);
        const morgen = new Date(tag);
        morgen.setDate(tag.getDate() + 1);
        const heute = tag.getDate() + '.' + (tag.getMonth() + 1) +  '.' + (tag.getFullYear());

        this.xaxis = x;
        this.heute = heute;
        this.title = 'im Tagesverlauf ' + heute;
        this.vorher = gestern.getDate() + '.' + (gestern.getMonth() + 1) + '.' + (gestern.getFullYear()),
        this.nachher = morgen.getDate() + '.' + (morgen.getMonth() + 1) + '.' + (morgen.getFullYear()),

        this.index0 = 0;      // Intervall x-Koordinaten 0 bis
        this.indexn = 24 * 4;   // ... 24*4
        this.items = 24 * 4;
        this.monat = (tag.getMonth() + 1) + '.' + (tag.getFullYear());
        this.super = this.monat;
    }

    index(tv, offs = 0) {      // x-Koordinate
        const t = toDay(tv.day);
        const t1 = (t.getTime() - this.tag1) / (24 * 60 * 60 * 1000);
        const hm = tv.time_t.split(':');
        const j = t1 * 24 * 4 + hm[0] * 4 + Math.floor( (hm[1] ) / 15);

        return j;   // Stunde + Viertelstunde: 0 - 23*4+3
    }
    tick() {  // x-Koordinate Beschriftung der x-Achse
        let res;
        res = [];
        for (let j = 0; j < this.xaxis.length; j++) {   // 0 - 24*4
            res.push(j * 4);
        }
        return res;
    }
}


export class Tage extends Tag {

    constructor(tag, offset) {

        super(tag, offset);

        tag = toDay(tag);
        this.tag1 -= 24 * 60 * 60 * 1000; // tag is central day, shift 1 day back
        const x = [];

        for (let j = 0; j <= 3 * 24; j += 3) {
            const t = new Date(this.tag1);
            t.setDate(t.getDate() + Math.floor(j / 24));
            x.push(t.getDate() + '-' + this.pad(j % 24, 2));
        }

        this.xaxis = x;

        this.heute = tag.getDate() + '.' + (tag.getMonth() + 1) +  '.' + (tag.getFullYear());

        this.title = 'im Verlauf dreier Tage ' + this.vorher + ' - ' + this.nachher;

        this.indexn = 24 * 3 * 4;   // ... 24*4
        this.items = 24 * 3 * 4;
    }

    tick() {  // x-Koordinate Beschriftung der x-Achse
        let res;
        res = [];
        for (let j = 0; j < this.xaxis.length; j++) {   // 0 - 24*4
            res.push(j * 12);
        }
        return res;
    }
}
