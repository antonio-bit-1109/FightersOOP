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
        statusBattle.innerHTML = "";
        console.log(`Hello! my name is ${this.nome} e appartengo alla razza dei ${this.razza}.`);
    }

    public stats() {
        statusBattle.innerHTML = "";
        statusBattle.innerHTML += `-------${this.nome}-------`;
        statusBattle.innerHTML += ` Punti Vita: ${this.pv} `;
        statusBattle.innerHTML += ` Forza: ${this.forza} `;
        statusBattle.innerHTML += ` Agilità: ${this.agilita} `;
        statusBattle.innerHTML += ` Precisione: ${this.precisione} `;
        statusBattle.innerHTML += ` Difesa: ${this.difesa} `;
        statusBattle.innerHTML += ` Lvl: ${this.livello} `;
        statusBattle.innerHTML += ` Exp: ${this.esperienza} `;
        statusBattle.innerHTML += ` Tentativi Ricerca: ${this.tentativi} `;
        statusBattle.innerHTML += ` Pv Iniziali: ${this.initialPv} `;
    }

    public CheckTentativiRimasti() {
        statusBattle.innerHTML = "";
        if (this.tentativi > 10) {
            statusBattle.innerHTML = `Sei ancora fresco e riposato. Puoi cercare a lungo. (${this.tentativi} tentativi rimasti).`;
        }

        if (this.tentativi > 5 && this.tentativi < 10) {
            statusBattle.innerHTML = `sei affaticato ma anche ancora un po di energia per cercare risorse. (${this.tentativi} tentativi rimasti).`;
        }

        if (this.tentativi < 5) {
            statusBattle.innerHTML = `sei quasi allo stremo delle forze, non reggerai ancora a lungo. (${this.tentativi} tentativi rimasti).`;
        }
    }

    public checkInventario() {
        statusBattle.innerHTML = "";

        this.inventario.forEach((item, i) => {
            const btnPozione = document.createElement("button");
            btnPozione.innerHTML = `<div> ${item.nome}  </div><div>  ${item.valore} </div>`;
            statusBattle.append(btnPozione);
            btnPozione.addEventListener("click", () => {
                this.UsaPozione(item);
                this.inventario.splice(i, 1);
                btnPozione.remove();
            });
        });
    }

    public Pugno(enemy: combattente) {
        statusBattle.innerHTML = "";
        try {
            let randomNum = Math.floor(Math.random() * this.precisione + Math.random());

            if (enemy.pv <= 0) {
                return;
            }

            if (randomNum % 2 === 0 || randomNum % 5 === 0) {
                //    let canHit = true;
                statusBattle.innerHTML += "colpo andato a segno.";
                let danno = (this.forza * 1.2) / enemy.difesa + 1;
                danno = parseFloat(danno.toFixed(2));
                enemy.pv -= danno;
                statusBattle.innerHTML += ` hai inflitto ${danno} danni a ${enemy.nome}`;
                this.vitaRimanenteNemico(enemy);
                this.GainExp(enemy);
            }

            if (randomNum % 2 !== 0) {
                // canHit = false;
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
            // let canHit: boolean;
            let randomNum = Math.floor(Math.random() * this.precisione + Math.random());

            if (enemy.pv <= 0) {
                return;
            }

            if (randomNum % 2 === 0 || randomNum % 5 === 0) {
                // canHit = true;
                statusBattle.innerHTML += "colpo andato a segno.";
                let danno = (this.forza * 1.4) / enemy.difesa + 1;
                danno = parseFloat(danno.toFixed(2));
                enemy.pv -= danno;
                statusBattle.innerHTML += ` hai inflitto ${danno} danni a ${enemy.nome}`;
                this.vitaRimanenteNemico(enemy);
                this.GainExp(enemy);
            }

            if (randomNum % 2 !== 0) {
                // canHit = false;
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
        statusBattle.innerHTML = "";
        let isItemFound = Math.floor(Math.random() * 100);
        let canILookForItems = this.tentativiRimasti();

        //probabilità di trovare un oggetto del 15%
        if (!canILookForItems) {
            statusBattle.innerHTML = "sei troppo stanco per continuare a cercare. Hai bisogno di riposo.";
            return;
        }

        if (isItemFound <= 15) {
            statusBattle.innerHTML += "hai trovato qualcosa.";
            let randomNumber = Math.floor(Math.random() * ArrayItemIniziale.length);
            let itemTrovato = ArrayItemIniziale[randomNumber];
            statusBattle.innerHTML += `hai tovato ${itemTrovato.nome}`;
            this.inventario.push(itemTrovato);
        } else {
            statusBattle.innerHTML += "osservi l'ambiente circostante.";
            statusBattle.innerHTML += "non hai trovato nulla.";
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
        let expPoint = this.livello - enemy.livello * 1.2 + 1;
        this.esperienza += expPoint;
        if (this.esperienza === 20) {
            this.esperienza = 0;
            this.livello++;
            statusBattle.innerHTML += "sei salito di livello.";
            statusBattle.innerHTML += `${this.nome} è passato al livello ${this.livello}`;
        }

        if (this.esperienza < 20) {
            this.esperienza = expPoint;
        }
    }

    private Fainted(enemy: combattente) {
        statusBattle.innerHTML = `Il nemico ${enemy.nome} è stato sconfitto.`;
    }

    public Riposo() {
        statusBattle.innerHTML = "";

        if (this.pv <= 0) {
            this.pv = 0;
            statusBattle.innerHTML += `${this.nome} è esausto. Si sta riposando.`;
            this.pv = this.livello + 10;
            statusBattle.innerHTML += `${this.nome} ---> pvAttuali: ${this.pv}`;
        }

        if (this.pv > 0) {
            statusBattle.innerHTML += `${this.nome} non è completamente esausto.`;
            statusBattle.innerHTML += `${this.nome} schiaccia un sonnellino.`;
            this.pv += this.livello + 10;
            statusBattle.innerHTML += `${this.nome} ---> pvAttuali: ${this.pv}`;
        }

        if (this.pv >= this.initialPv) {
            this.pv = this.initialPv;
            statusBattle.innerHTML += `${this.nome} è perfettamente riposato.`;
            statusBattle.innerHTML += "i suoi punti vita sono al massimo.";
            statusBattle.innerHTML += `${this.nome} ---> pvAttuali: ${this.pv}`;
        }

        // ricarica la possiblita di trovare item randomici
        this.tentativi++;
    }

    public UsaPozione(pozione: pozione) {
        if (pozione.nome.toLowerCase().includes("vita")) {
            this.pv += pozione.valore;
        }
        if (pozione.nome.toLowerCase().includes("difesa")) {
            //aumenta la vita
            this.difesa += pozione.valore;
        }
        if (pozione.nome.toLowerCase().includes("precisione")) {
            //aumenta la vita
            this.precisione += pozione.valore;
        }
        if (pozione.nome.toLowerCase().includes("attacco")) {
            //aumenta la vita
            this.forza += pozione.valore;
        }
    }
}
