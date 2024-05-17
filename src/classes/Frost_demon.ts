import { statusBattle } from "../main";
import { combattente } from "./combattente";

export class Frost_Demon extends combattente {
    public ImageTransformation: string;
    public GifTransformation: string;
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
        ImageTransformation: string, // Parametro aggiuntivo per la nuova proprietà ,
        GifTransformation: string
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
        this.ImageTransformation = ImageTransformation;
        this.GifTransformation = GifTransformation;
    }

    public superFreezer() {
        this.pv += 40;
        this.forza += 85;
        this.agilita += 55;
        this.difesa += 69;
        this.changeImageSuperFreezer();
    }

    protected changeImageSuperFreezer() {
        statusBattle.innerHTML = "";
        if (this.nome.toLowerCase() === "freezer") {
            //immagine sarà questa
            this.image = "super_freezer2.webp";
            this.AnimationGif(this.GifTransformation, this.nome);
            statusBattle.innerHTML += "Freezer raggiunge il suo 100%!";
        }
    }

    protected AnimationGif(gif: string, charName: string) {
        statusBattle.innerHTML += `<img id='my-id-is-${charName}' style='width: 70%;height: 100%;' src="/imgs/${gif}" alt="">`;
    }
}
