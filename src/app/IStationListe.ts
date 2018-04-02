
// (c) Gerhard Döppert, 2018, GNU GPL 3

class IStation {
    id: string;
    name: string;
    vals: string[];
}

class IJahre {
    stat: number;
    jahr: number;
}
class ILinks {
    rel: string;
    href: string;
    method: string;
}

export class IStationListe {
    stats: IStation[];
    admin: number;
    stat: string;
    station: string;
    rows: IJahre[];
    links: ILinks[];
}
