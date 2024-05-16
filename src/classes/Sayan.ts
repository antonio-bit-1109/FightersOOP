import { combattente } from "./combattente";
import { statusBattle } from "../main";
//
export class Sayan extends combattente {
    public GifTranformation: string;

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
        GifTranformation: string // Parametro aggiuntivo per la nuova proprietà
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
    }

    public superSayan() {
        this.pv = 100;
        this.forza += 100;
        this.agilita += 50;
        this.difesa += 50;
        this.cambiaImmagineSSJ();
        console.log(this);
    }

    private cambiaImmagineSSJ() {
        statusBattle.innerHTML = "";
        if (this.nome.toLowerCase() === "goku") {
            //immagine sarà questa
            this.image = "goku_ssj.webp";
            this.AnimationGif(this.GifTranformation);
        }

        if (this.nome.toLowerCase() === "vegeta") {
            //immagine sarà questa
            this.image = "vegeta_ssj.png";
            this.AnimationGif(this.GifTranformation);
        }
    }

    private AnimationGif(gif: string) {
        statusBattle.innerHTML = `<img style='width: 50%;height: 100%;' src="/imgs/${gif}" alt="">`;
    }
}
