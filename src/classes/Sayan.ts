import { combattente } from "./combattente";
import { statusBattle } from "../main";
import { Guerriero } from "../interfaces/interfaces";
//
export class Sayan extends combattente {
    public GifTranformation: string;
    public GifKamehameha: string;

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
        image: string,
        GifTranformation: string, // Parametro aggiuntivo per la nuova proprietà
        GifKamehameha: string
    ) {
        // Chiama il costruttore della classe base con i parametri necessari
        super(
            nome,
            forza,
            difesa,
            livello,
            esperienza,
            agilita,
            pv,
            razza,
            temperamento,
            puntoCritico,
            precisione,
            image
        );

        // Assegna il valore alla nuova proprietà
        this.GifTranformation = GifTranformation;
        this.GifKamehameha = GifKamehameha;
    }

    public superSayan() {
        this.pv += 40;
        this.forza += 100;
        this.agilita += 50;
        this.difesa += 50;
        this.cambiaImmagineSSJ();
        console.log(this);
    }

    protected cambiaImmagineSSJ() {
        statusBattle.innerHTML = "";
        if (this.nome.toLowerCase() === "goku") {
            //immagine sarà questa
            this.image = "goku_ssj.webp";
            this.AnimationGif(this.GifTranformation, this.nome);
            statusBattle.innerHTML += "Goku si trasforma in Super Saiyan!";
        }

        if (this.nome.toLowerCase() === "vegeta") {
            //immagine sarà questa
            this.image = "vegeta_ssj.png";
            this.AnimationGif(this.GifTranformation, this.nome);
            statusBattle.innerHTML += "Vegeta si trasforma in Super Saiyan!";
        }
    }

    protected AnimationGif(gif: string, charName: string) {
        statusBattle.innerHTML += `<img id='my-id-is-${charName}' style='width: 70%;height: 100%;' src="/imgs/${gif}" alt="">`;
    }

    public Kamehameha(enemy: Guerriero) {
        try {
            statusBattle.innerHTML = "";
            let possibilitaColpo = Math.floor(Math.random() * this.precisione + Math.random());

            if (enemy.pv <= 0) {
                return;
            }

            if (this.tentativi <= 0 || this.tentativi === 1) {
                statusBattle.innerHTML = "Goku è troppo stanco per effettuare una Kamehameha. Riposati e riprova.";
                return;
            }

            if (possibilitaColpo <= this.precisione) {
                this.AnimationGif(this.GifKamehameha, this.nome);
                statusBattle.innerHTML += `Goku Effettua Kamehameha contro ${enemy.nome}. <br>`;
                this.forza += 60;
                this.tentativi = this.tentativi - 2;
                let danno = (this.forza * 2.1) / enemy.difesa + 1;
                danno = parseFloat(danno.toFixed(2));
                enemy.pv -= danno;
                statusBattle.innerHTML += `Danni inflitti ${danno}`;
                this.vitaRimanenteNemico(enemy);
                this.GainExp(enemy);
                this.forza -= 60;
            } else {
                statusBattle.innerHTML = "il colpo non è andato a segno.";
                this.vitaRimanenteNemico(enemy);
            }
        } catch (err) {
            console.error(err);
        }
    }

    public FinalFlash(enemy: combattente) {
        try {
            statusBattle.innerHTML = "";
            let possibilitaColpo = Math.floor(Math.random() * this.precisione + Math.random());

            if (enemy.pv <= 0) {
                return;
            }

            if (this.tentativi <= 0 || this.tentativi === 1) {
                statusBattle.innerHTML = "Vegeta è troppo stanco per effettuare un final Flash. Riposati e riprova.";
                return;
            }

            if (possibilitaColpo <= this.precisione) {
                this.AnimationGif(this.GifKamehameha, this.nome);
                statusBattle.innerHTML += `Vegeta Effettua FinalFlash contro ${enemy.nome}. <br>`;
                this.forza += 80;
                this.difesa -= 15;
                this.tentativi = this.tentativi - 3;
                let danno = (this.forza * 2.7) / enemy.difesa + 1;
                danno = parseFloat(danno.toFixed(2));
                enemy.pv -= danno;
                statusBattle.innerHTML += `Danni inflitti ${danno}`;
                this.vitaRimanenteNemico(enemy);
                this.GainExp(enemy);
                this.forza -= 80;
                this.difesa += 15;
            } else {
                statusBattle.innerHTML = "il colpo non è andato a segno.";
                this.vitaRimanenteNemico(enemy);
            }
        } catch (err) {
            console.error(err);
        }
    }
}
