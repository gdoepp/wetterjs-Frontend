
// (c) Gerhard Döppert, 2018, GNU GPL 3

class IStation {
    id: string;
    name: string;
}

class IJahre {
    stat: number;
    year: number;
}


export class IStationListe {
    stats: IStation[];
    admin: number;
    stat: string;
    station: string;
    rows: IJahre[];
}
