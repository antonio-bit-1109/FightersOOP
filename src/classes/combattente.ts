import { pozione } from "./pozione";
import { ArrayItemIniziale } from "../main";
import { statusBattle } from "../main";

export class combattente {
    nome: string;
    forza: number;
    agilita: number;
    precisione: number;
    pv: number;
    initialPv: number;
    razza: string;
    temperamento: string;
    difesa: number;
    livello: number;
    esperienza: number;
    puntoCritico: string;
    inventario: pozione[];
    tentativi: number;
    image: string;

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
        precisione: number,
        image: string
    ) {
        this.nome = nome;
        this.forza = forza;
        this.agilita = agilita;
        this.precisione = precisione;
        this.pv = Math.floor(pv);
        this.initialPv = this.pv;
        this.razza = razza;
        this.temperamento = temperamento;
        this.difesa = difesa;
        this.livello = livello;
        this.esperienza = esperienza;
        this.puntoCritico = puntoCritico;
        this.inventario = [this.randomItem(ArrayItemIniziale)];
        this.tentativi = Math.floor(esperienza + agilita / 10);
        this.image = image;
    }

    private randomItem(array: pozione[]) {
        let itemPrescelto = Math.floor(Math.random() * array.length);
        return array[itemPrescelto];
    }

    public presentation() {
        console.log(`Hello! my name is ${this.nome} e appartengo alla razza dei ${this.razza}.`);
    }

    public stats() {
        console.log(`-------${this.nome}-------`);
        console.log(`these are my stats: Punti Vita:${this.pv} `);
        console.log(` Punti Vita: ${this.pv} `);
        console.log(` Forza: ${this.forza} `);
        console.log(` Agilità: ${this.agilita} `);
        console.log(` Precisione: ${this.precisione} `);
        console.log(` Difesa: ${this.difesa} `);
        console.log(` Lvl: ${this.livello} `);
        console.log(` Exp: ${this.esperienza} `);
        console.log(` Tentativi Ricerca: ${this.tentativi} `);
        console.log(` Pv Iniziali: ${this.initialPv} `);
    }

    public CheckTentativiRimasti() {
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

    public checkInventario() {
        console.log(`nel mio inventario ho i seguenti oggetti: ${this.inventario.map((item) => item.nome)}`);
    }

    public Pugno(enemy: combattente) {
        statusBattle.innerHTML = "";
        try {
            let canHit: boolean;
            let randomNum = Math.floor(Math.random() * this.precisione + Math.random());

            if (enemy.pv <= 0) {
                return;
            }

            if (randomNum % 2 === 0 || randomNum % 5 === 0) {
                canHit = true;
                statusBattle.innerHTML += "colpo andato a segno.";
                let danno = (this.forza * 1.3) / enemy.difesa + 1;
                danno = parseFloat(danno.toFixed(2));
                enemy.pv -= danno;
                statusBattle.innerHTML += ` hai inflitto ${danno} danni a ${enemy.nome}`;
                this.vitaRimanenteNemico(enemy);
                this.GainExp(enemy);
            }

            if (randomNum % 2 !== 0) {
                canHit = false;
                statusBattle.innerHTML = "il colpo non è andato a segno.";
                this.vitaRimanenteNemico(enemy);
            }
        } catch (err) {
            console.error(err);
        }
    }

    public calcio(enemy: combattente) {
        statusBattle.innerHTML = "";
        try {
            let canHit: boolean;
            let randomNum = Math.floor(Math.random() * this.precisione + Math.random());

            if (enemy.pv <= 0) {
                return;
            }

            if (randomNum % 2 === 0 || randomNum % 5 === 0) {
                canHit = true;
                statusBattle.innerHTML += "colpo andato a segno.";
                let danno = (this.forza * 1.5) / enemy.difesa + 1;
                danno = parseFloat(danno.toFixed(2));
                enemy.pv -= danno;
                statusBattle.innerHTML += ` hai inflitto ${danno} danni a ${enemy.nome}`;
                this.vitaRimanenteNemico(enemy);
                this.GainExp(enemy);
            }

            if (randomNum % 2 !== 0) {
                canHit = false;
                statusBattle.innerHTML = "il colpo non è andato a segno.";
                this.vitaRimanenteNemico(enemy);
            }
        } catch (err) {
            console.error(err);
        }
    }

    private vitaRimanenteNemico(enemy: combattente) {
        if (enemy.pv <= 0) {
            this.Fainted(enemy);
        }
        statusBattle.innerHTML += ` la vita del nemico (${enemy.nome}) è ${enemy.pv}`;
    }

    public lookAround() {
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

    private GainExp(enemy: combattente) {
        let expPoint = this.livello - enemy.livello * 1.1 + 1;
        this.esperienza += expPoint;
        if (this.esperienza === 20) {
            this.esperienza = 0;
            this.livello++;
            console.log("sei salito di livello.");
            console.log(`${this.nome} è passato al livello ${this.livello}`);
        }

        if (this.esperienza < 20) {
            this.esperienza = expPoint;
        }
    }

    private Fainted(enemy: combattente) {
        statusBattle.innerHTML = `Il nemico ${enemy.nome} è stato sconfitto.`;
    }

    public Riposo() {
        if (this.pv <= 0) {
            this.pv = 0;
            console.log(`${this.nome} è esausto. Si sta riposando.`);
            this.pv = this.livello + 20;
            console.log(`${this.nome} ---> pvAttuali: ${this.pv}`);
        }

        if (this.pv > 0) {
            console.log(`${this.nome} non è completamente esausto.`);
            console.log(`${this.nome} schiaccia un sonnellino.`);
            this.pv += this.livello + 10;
            console.log(`${this.nome} ---> pvAttuali: ${this.pv}`);
        }

        if (this.pv >= this.initialPv) {
            this.pv = this.initialPv;
            console.log(`${this.nome} è perfettamente riposato.`);
            console.log("i suoi punti vita sono al massimo.");
            console.log(`${this.nome} ---> pvAttuali: ${this.pv}`);
        }
    }

    // public UsaPozione() {}
}
