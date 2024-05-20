import { Guerriero } from "../interfaces/interfaces";
import { statusBattle } from "../main";
import { combattente } from "./combattente";

export class Frost_Demon extends combattente {
    public GifTransformation: string;
    public GifFinalAttack: string;
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
        GifTransformation: string, // Parametro aggiuntivo per la nuova proprietà ,
        GifFinalAttack: string
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
        this.GifTransformation = GifTransformation;
        this.GifFinalAttack = GifFinalAttack;
    }

    public superFreezer() {
        this.pv += 40;
        this.forza += 85;
        this.agilita += 55;
        this.difesa += 45;
        this.GifSuperFreezer();
    }

    protected GifSuperFreezer() {
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

    public FinalAttack_planet_breaker(enemy: Guerriero) {
        try {
            statusBattle.innerHTML = "";
            let possibilitaColpo = Math.floor(Math.random() * this.precisione + Math.random());

            if (enemy.pv <= 0) {
                return;
            }

            if (this.tentativi <= 0) {
                statusBattle.innerHTML =
                    "Freezer è troppo stanco per effettuare un attacco finale. Riposati e riprova.";
                return;
            }

            if (possibilitaColpo <= this.precisione) {
                let danno: number;
                this.AnimationGif(this.GifFinalAttack, this.nome);
                // controllo colpo critico: se parte corpo colpita (estratta da array === a punto debole nemico) danno raddoppiato.
                let parteCorpoColpita: string = this.CriticalHit();
                console.log("parte corpo colpita", parteCorpoColpita);
                console.log("punto critico nemico", enemy.puntoCritico);
                statusBattle.innerHTML += `freezer Effettua planet Breaker contro ${enemy.nome}. <br>`;
                statusBattle.innerHTML += `La terra Inizia a tremare. <br>`;
                if (this.tentativi < 4) {
                    statusBattle.innerHTML =
                        "Freezer è troppo stanco per effettuare un attacco finale. Riposati e riprova.";
                    return;
                }
                this.tentativi = this.tentativi - 4;
                this.forza += 120;
                this.difesa -= 15;

                if (parteCorpoColpita === enemy.puntoCritico) {
                    danno = (this.forza * 2.7 * 2) / enemy.difesa + 1;
                } else {
                    danno = (this.forza * 2.8) / enemy.difesa + 1;
                }
                danno = parseFloat(danno.toFixed(2));
                enemy.pv -= danno;
                statusBattle.innerHTML += `Danni inflitti ${danno}`;
                this.vitaRimanenteNemico(enemy);
                this.GainExp(enemy);
                this.forza -= 120;
            } else {
                statusBattle.innerHTML = "il colpo non è andato a segno.";
                this.vitaRimanenteNemico(enemy);
            }
            console.log(this);
        } catch (err) {
            console.error(err);
        }
    }
}
