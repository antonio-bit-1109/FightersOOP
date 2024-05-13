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

    private randomItem(array: pozione[]) {
        let itemPrescelto = Math.floor(Math.random() * array.length);
        return array[itemPrescelto];
    }

    presentation() {
        console.log(`Hello! my name is ${this.nome} e appartengo alla razza dei ${this.razza}.`);
    }

    CheckTentativiRimasti() {
        if (this.tentativi > 10) {
            console.log(`Sei ancora fresco e riposato. Puoi cercare a lungo. (${this.tentativi} tentativi rimasti).`);
        }

        if (this.tentativi > 5 && this.tentativi < 10) {
            console.log(
                `sei affaticato ma anche ancora un po di energia per cercare risorse. (${this.tentativi} tentativi rimasti).`
            );
        }

        if (this.tentativi < 5) {
            console.log(
                `sei quasi allo stremo delle forze, non reggerai ancora a lungo. (${this.tentativi} tentativi rimasti).`
            );
        }
    }

    checkInventario() {
        console.log(`nel mio inventario ho i seguenti oggetti: ${this.inventario.map((item) => item.nome)}`);
    }

    Pugno(enemy: combattente) {
        try {
            let canHit: boolean;
            let randomNum = Math.floor(Math.random() * this.precisione + Math.random());

            if (randomNum % 2 === 0) {
                canHit = true;
                console.log("colpo andato a segno.");
                let danno = this.forza / enemy.difesa + 1;
                enemy.pv -= danno;
                console.log(` hai inflitto ${danno} danni `);
                this.vitaRimanenteNemico(enemy);
            }

            if (randomNum % 2 !== 0) {
                canHit = false;
                console.log("il colpo non è andato a segno.");
                this.vitaRimanenteNemico(enemy);
            }
        } catch (err) {
            console.error(err);
        }
    }

    private vitaRimanenteNemico(enemy: combattente) {
        console.log(`la vita del nemico (${enemy.nome}) è ${enemy.pv}`);
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
            let randomNumber = Math.floor(Math.random() * ArrayItemIniziale.length);
            let itemTrovato = ArrayItemIniziale[randomNumber];
            console.log(`hai tovato ${itemTrovato.nome}`);
            this.inventario.push(itemTrovato);
        } else {
            console.log("osservi l'ambiente circostante.");
            console.log("non hai trovato nulla.");
        }
    }

    private tentativiRimasti() {
        if (this.tentativi <= 0) {
            this.tentativi = 0;
            return false;
        } else {
            this.tentativi--;
            return true;
        }
    }
}
