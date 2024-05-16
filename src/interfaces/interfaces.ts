// import { pozione } from "../classes/pozione";

// export interface TipoCombattente {
//     nome: string;
//     forza: number;
//     agilita: number;
//     precisione: number;
//     pv: number;
//     razza: string;
//     temperamento: string;
//     difesa: number;
//     livello: number;
//     esperienza: number;
//     puntoCritico: string;
//     inventario: pozione[];
//     tentativi: number;
// }

export interface IPhotos {
    alt: string;
    avg_color: string;
    height: number;
    id: number;
    liked: boolean;
    photographer: string;
    photographer_id: number;
    photographer_url: string;
    src: {
        [key: string]: string;
    };
    url: string;
    width: number;
}
