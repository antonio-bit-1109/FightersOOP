import { Guerriero } from "../interfaces/interfaces";
import { statusBattle } from "../main";
import { combattente } from "./combattente";

export class cyborg extends combattente {
    public GifTrasformation: string;
    public gifKamehameha: string;

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
        GifTrasformation: string,
        gifKamehameha: string
    ) {
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

        this.GifTrasformation = GifTrasformation;
        this.gifKamehameha = gifKamehameha;
    }

    public PerfectCell() {
        this.pv += 50;
        this.forza += 95;
        this.agilita += 45;
        this.difesa += 60;
        this.cambiaImmagineCellFinal();
    }

    protected cambiaImmagineCellFinal() {
        statusBattle.innerHTML = "";
        if (this.nome.toLowerCase().includes("cell")) {
            //immagine sarà questa
            this.image = "cell_final_form.jpg";
            this.AnimationGif(this.GifTrasformation, this.nome);
            statusBattle.innerHTML += "Cell raggiunge la forma perfetta!";
        }
    }

    protected AnimationGif(gif: string, charName: string) {
        statusBattle.innerHTML += `<img id='my-id-is-${charName}' style='width: 70%;height: 100%;' src="/imgs/${gif}" alt="">`;
    }

    public SuperKamehameha(enemy: Guerriero) {
        try {
            statusBattle.innerHTML = "";
            let possibilitaColpo = Math.floor(Math.random() * this.precisione + Math.random());

            if (enemy.pv <= 0) {
                return;
            }

            if (this.tentativi <= 0 || this.tentativi === 1) {
                statusBattle.innerHTML = "Cell è troppo stanco per effettuare una Kamehameha. Riposati e riprova.";
                return;
            }

            if (possibilitaColpo <= this.precisione) {
                this.AnimationGif(this.gifKamehameha, this.nome);
                statusBattle.innerHTML += `Cell Effettua SuperKamehameha contro ${enemy.nome}. <br>`;
                this.forza += 75;
                this.tentativi = this.tentativi - 3;
                let danno = (this.forza * 2.1) / enemy.difesa + 1;
                danno = parseFloat(danno.toFixed(2));
                enemy.pv -= danno;
                statusBattle.innerHTML += `Danni inflitti ${danno}`;
                this.vitaRimanenteNemico(enemy);
                this.GainExp(enemy);
                this.forza -= 75;
            } else {
                statusBattle.innerHTML = "il colpo non è andato a segno.";
                this.vitaRimanenteNemico(enemy);
            }
        } catch (err) {
            console.error(err);
        }
    }
}
