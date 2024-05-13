import { pozione } from "./pozione";
import { ArrayItemIniziale } from "../main";
export class combattente {
    nome: string;
    forza: number;
    agilita: number;
    precisione: number;
    pv: number;
    razza: string;
    temperamento: string;
    difesa: number;
    livello: number;
    esperienza: number;
    puntoCritico: string;
    inventario: pozione[];
    tentativi: number;

    constructor(
        nome: string,
        forza: number,
        difesa: number,
        livello: number,
        esperienza: number,
        agilita: number,
        pv: number,
        razza: string,
        temperamento: string,
        puntoCritico: string,
        precisione: number
    ) {
        this.nome = nome;
        this.forza = forza;
        this.agilita = agilita;
        this.precisione = precisione;
        this.pv = pv;
        this.razza = razza;
        this.temperamento = temperamento;
        this.difesa = difesa;
        this.livello = livello;
        this.esperienza = esperienza;
        this.puntoCritico = puntoCritico;
        this.inventario = [this.randomItem(ArrayItemIniziale)];
        this.tentativi = Math.floor(esperienza + agilita / 10);
    }

    randomItem(array: pozione[]) {
        let itemPrescelto = Math.floor(Math.random() * array.length);
        return array[itemPrescelto];
    }

    presentation() {
        console.log(`Hello! my name is ${this.nome} e appartengo alla razza dei ${this.razza}.`);
    }

    checkInventario() {
        console.log(`nel mio inventario ho i seguenti oggetti: ${this.inventario.map((item) => item.nome)}`);
    }

    Attacco(enemy: combattente) {
        let IscolpoAsegno = Math.floor(Math.random() * this.precisione + Math.random());
        if (Math.floor(IscolpoAsegno % 2 === 0)) {
            console.log("colpo andato a segno.");
            let danno = this.forza / enemy.difesa;
            enemy.pv -= danno;
            console.log(` hai inflitto ${danno} danni `);
            this.vitaRimanenteNemico(enemy);
        }
    }

    vitaRimanenteNemico(enemy: combattente) {
        console.log(`la vita del nemico è ${enemy.pv}`);
    }

    lookAround() {
        let isItemFound = Math.floor(Math.random() * 100);
        let canILookForItems = this.tentativiRimasti();
        //probabilità di trovare un oggetto del 15%
        if (!canILookForItems) {
            console.log("sei troppo stanco per continuare a cercare. Hai bisogno di riposo.");
        }

        if (isItemFound <= 15) {
            console.log("hai trovato qualcosa.");
        } else {
            console.log("osservi l'ambiente circostante.");
            console.log("non hai trovato nulla.");
        }
    }

    tentativiRimasti() {
        if (this.tentativi <= 0) {
            this.tentativi = 0;
            return false;
        } else {
            this.tentativi--;
            return true;
        }
    }
}
