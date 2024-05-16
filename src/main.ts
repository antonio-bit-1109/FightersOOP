import { Sayan } from "./classes/Sayan";
import { canzone } from "./classes/canzone";
import { combattente } from "./classes/combattente";
import { pozione } from "./classes/pozione";
import { sfondoFetch } from "./fetches/sfondoFetch";
import { Guerriero, IPhotos } from "./interfaces/interfaces";

const pozioneVita_sm = new pozione(20, "pozioneVita_sm");
const pozioneVita_md = new pozione(50, "pozioneVita_md");
const pozioneVita_lg = new pozione(80, "pozioneVita_lg");

const pozioneDifesa_sm = new pozione(30, "pozioneDifesa_sm");
const pozioneDifesa_md = new pozione(35, "pozioneDifesa_md");
const pozioneDifesa_lg = new pozione(40, "pozioneDifesa_lg");

const pozioneAttacco_sm = new pozione(25, "pozioneAttacco_sm");
const pozioneAttacco_md = new pozione(35, "pozioneAttacco_md");
const pozioneAttacco_lg = new pozione(40, "pozioneAttacco_lg");

const pozionePrecisione_sm = new pozione(30, "pozionePrecisione_sm");
const pozionePrecisione_md = new pozione(60, "pozionePrecisione_md");
const pozionePrecisione_lg = new pozione(90, "pozionePrecisione_lg");

export const ArrayItemIniziale: pozione[] = [];

ArrayItemIniziale.push(
    pozioneVita_sm,
    pozioneVita_md,
    pozioneVita_lg,
    pozioneDifesa_sm,
    pozioneDifesa_md,
    pozioneDifesa_lg,
    pozioneAttacco_sm,
    pozioneAttacco_md,
    pozioneAttacco_lg,
    pozionePrecisione_sm,
    pozionePrecisione_md,
    pozionePrecisione_lg
);

const Goku = new Sayan(
    "Goku",
    400,
    45,
    5,
    0,
    35,
    100,
    "saiyan",
    "calmo",
    "fronte",
    89,
    "goku.webp",
    "goku_super_gif.webp"
);
const Vegeta = new Sayan(
    "Vegeta",
    600,
    38,
    5,
    0,
    40,
    100,
    "saiyan",
    "irascibile",
    "braccio sinistro",
    92,
    "vegeta.png",
    "vegeta_super_gif.gif"
);
const Freezer = new combattente("Freezer", 400, 35, 5, 2, 20, 100, "shimoni", "irascibile", "coda", 90, "freezer.jpg");
const Cell = new combattente("Cell", 500, 40, 5, 1, 30, 100, "cyborg", "esuberante", "stomaco", 91, "cell.jpg");
const KidBU = new combattente("Kid-Bu", 550, 40, 5, 0, 44, 100, "Majin", "furioso", "testa", 75, "kid_buu.jpg");
//
//
export const appElement = document.getElementById("app");

// ricavo dal localStorage eventuale immagine salvata come sfondo

const ArrayPersonaggi: Guerriero[] = [];
ArrayPersonaggi.push(Goku, Vegeta, Freezer, Cell, KidBU);

const h1 = document.createElement("h1");
const h3 = document.createElement("h3");
const customModal = document.createElement("div");
let PlayersDiv = document.createElement("div");
customModal.classList.add("styleCustomModal");
// let personaggioUtente: any | combattente = null;
// let personaggioComputer: any | combattente = null;

// array contenente i due personaggi che combatteranno
let ArrayScontroPersonaggi: Guerriero[] = [];

let startMatch = false;
const divGiocatore = document.createElement("section");
const divOpponent = document.createElement("section");
export const statusBattle = document.createElement("div");
statusBattle.classList.add("statusDivStyle", "display-2", "text-center", "fw-bolder", "d-flex", "align-items-start");
statusBattle.style.minHeight = "50vh";

let WhoIsturn: number = 1;

// creazione input group sfruttando classi bootstrap

//div contenitore
const inputGroup = document.createElement("div");
inputGroup.classList.add("input-group", "m-auto", "w-50");
// input element
const input = document.createElement("input");
input.type = "text";
input.placeholder = "scegli dove ambientare il tuo scontro.";
input.classList.add("form-control");
input.setAttribute("aria-label", "input to choose the background");
// button element
const buttonRequestFetch = document.createElement("button");
buttonRequestFetch.classList.add("btn", "btn-outline-warning");
buttonRequestFetch.innerText = "Cambia Sfondo";
buttonRequestFetch.type = "button";
buttonRequestFetch.id = "buttonSearch";
//append children
inputGroup.append(input);
inputGroup.append(buttonRequestFetch);
//
//------------------------- ELEMENTI GLOBALI SOPRA ---------------------------------------------------------
//
//

document.addEventListener("DOMContentLoaded", () => {
    if (appElement) {
        appElement.classList.add("appElementStyle");
        start();
        chooseYourCharacter();
        appElement?.append(statusBattle);
    }
});

const start = () => {
    appElement?.append(h1);
    appElement?.append(h3);
    appElement?.append(inputGroup);
    // cambio dello sfondo chiamando API di pexels
    buttonRequestFetch.addEventListener("click", () => {
        sfondoFetch(input.value);
    });
    h1.innerHTML = "Benvenuto Al fighters-Z Game.";
    h3.innerHTML = "Scegli il tuo Figther.";
    h1.classList.add("stileh1");
    h3.classList.add("stileh3");
};

const chooseYourCharacter = () => {
    PlayersDiv.classList.add("text-center");

    for (let i = 0; i < ArrayPersonaggi.length; i++) {
        let wrapper = document.createElement("section");
        wrapper.classList.add(
            "bg-white",
            "d-inline-block",
            "text-center",
            "m-3",
            "rounded-5",
            "p-3",
            "hoverAnimation",
            "larghezza"
        );

        const buttonChooseCharacter = document.createElement("button");
        buttonChooseCharacter.classList.add("btn", "btn-transparent");
        buttonChooseCharacter.append(wrapper);
        // button.innerHTML = "Scegli Personaggio";
        // button.classList.add("my-3");

        let charImage = document.createElement("img");
        charImage.src = `/imgs/${ArrayPersonaggi[i].image}`;
        charImage.classList.add("imgDimension");
        wrapper.append(charImage);

        let textWrapper = document.createElement("div");

        let nome = document.createElement("h5");
        nome.innerHTML = `${ArrayPersonaggi[i].nome}`;
        nome.classList.add("text-dark", "fs-1");
        textWrapper.append(nome);

        let pv = document.createElement("p");
        pv.innerHTML = ` PV : ${ArrayPersonaggi[i].pv}`;
        pv.classList.add("text-dark");
        textWrapper.append(pv);

        let difesa = document.createElement("p");
        difesa.innerHTML = ` DEF : ${ArrayPersonaggi[i].difesa}`;
        difesa.classList.add("text-dark");
        textWrapper.append(difesa);

        let lv = document.createElement("p");
        lv.innerHTML = ` LVL : ${ArrayPersonaggi[i].livello}`;
        lv.classList.add("text-dark");
        textWrapper.append(lv);

        let forza = document.createElement("p");
        forza.innerHTML = ` ATK : ${ArrayPersonaggi[i].forza}`;
        forza.classList.add("text-dark");
        textWrapper.append(forza);

        let agilita = document.createElement("p");
        agilita.innerHTML = ` DEX : ${ArrayPersonaggi[i].agilita}`;
        agilita.classList.add("text-dark");
        textWrapper.append(agilita);

        let precisione = document.createElement("p");
        precisione.innerHTML = ` AIM : ${ArrayPersonaggi[i].precisione}`;
        precisione.classList.add("text-dark");
        textWrapper.append(precisione);

        let puntoCritico = document.createElement("p");
        puntoCritico.innerHTML = ` WEAKNESS : ${ArrayPersonaggi[i].puntoCritico}`;
        puntoCritico.classList.add("text-dark");

        textWrapper.append(puntoCritico);

        let razza = document.createElement("p");
        razza.innerHTML = ` RACE : ${ArrayPersonaggi[i].razza}`;
        razza.classList.add("text-dark");

        textWrapper.append(razza);

        let inventario = document.createElement("div");
        inventario.innerHTML = ` Inventario : ${ArrayPersonaggi[i].inventario.map(
            (item) => `${item.nome} <br> +${item.valore}`
        )}`;
        inventario.classList.add("text-dark");

        buttonChooseCharacter.addEventListener(
            "click",
            ((character) => {
                return () => {
                    //scelgo il mio personaggio
                    PersonaggioScelto(character);
                    //rimuovo il personaggio che ho scelto dall array globale dei personaggi.
                    TogliPersonaggioSceltoArray(character);
                    //scelgo player opponent
                    OpponentPLayer(ArrayPersonaggi);
                };
            })(ArrayPersonaggi[i])
        );

        textWrapper.append(inventario);
        wrapper.append(textWrapper);
        // wrapper.append(button);
        PlayersDiv.append(buttonChooseCharacter);
    }
    appElement?.append(PlayersDiv);
};

//  cerco il personaggio che il primo utente ha scelto e lo rimuovo dall'array su cui poi il computer sceglierà l'avversario ( no stessi personaggi combattono tra loro)
const TogliPersonaggioSceltoArray = (personaggioScelto: Guerriero) => {
    const filteredArray = ArrayPersonaggi.filter((personaggio) => personaggio.nome !== personaggioScelto.nome);
    ArrayPersonaggi.splice(0, ArrayPersonaggi.length, ...filteredArray);
    console.log(ArrayPersonaggi);
};

const PersonaggioScelto = function (character: Guerriero) {
    const buttonStartMatch = document.createElement("button");
    buttonStartMatch.innerHTML = "Start Match";
    buttonStartMatch.classList.add("btnStartMatch_Style", "py-2", "fs-1");

    buttonStartMatch.addEventListener("click", () => {
        customModal.classList.add("d-none");
        customModal.classList.remove("display-1", "text-warning", "fw-bolder", "d-flex", "flex-column", "gap-3");
        customModal.innerHTML = "";
        // sistemo il DOM e lo inizializzo con i due personaggi scelti
        startMatch = true;
        // startMatch && DamoseLeBotte(personaggioUtente, personaggioComputer);
        startMatch && DamoseLeBotte(ArrayScontroPersonaggi);
    });

    customModal.innerHTML = `Hai scelto ${character.nome}`;
    customModal.classList.add("display-1", "text-warning", "fw-bolder", "d-flex", "flex-column", "gap-3");
    customModal.append(buttonStartMatch);
    appElement?.append(customModal);
    // personaggioUtente = character;
    ArrayScontroPersonaggi.push(character);
    // console.log(personaggioUtente);
};

// scelta dell'avversario basato su un numero random usato come indice casuale per trovare avversario
const OpponentPLayer = (array: Guerriero[]) => {
    let randomNum = Math.floor(Math.random() * array.length);
    let avversario: combattente = array[randomNum];
    ArrayScontroPersonaggi.push(avversario);
    // personaggioComputer = avversario;
    // console.log(personaggioComputer);
    console.log(ArrayScontroPersonaggi);
};

// creo i div contenenti info dei due personaggi e attacco event listeners che richiamano i metodi necessari per il combattimento
const DamoseLeBotte = (arraycombattenti: Guerriero[]) => {
    h1.innerHTML = ` Combattimento tra ${arraycombattenti[0].nome} e ${arraycombattenti[1].nome}`;
    h3.innerHTML = "";
    PlayersDiv.innerHTML = "";
    PlayersDiv.classList.add("d-flex", "gap-4");
    PlayersDiv.append(divGiocatore);
    divGiocatore.classList.add("w-50");
    PlayersDiv.append(divOpponent);
    divOpponent.classList.add("w-50");
    inputGroup.classList.add("d-none");

    RiproduzioneMusica();

    for (let i = 0; i < 2; i++) {
        // Creazione del div esterno per la progress bar
        const progressDiv = document.createElement("div");
        progressDiv.classList.add("progress");

        // Creazione del div interno per la barra di progresso
        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar", "progress-bar-striped", "progress-bar-animated", "bg-success");
        progressBar.setAttribute("role", "progressbar");

        let vitaPlayer;
        if (i === 0) {
            vitaPlayer = arraycombattenti[0].pv;
            progressBar.style.width = `${vitaPlayer}%`;
        } else {
            vitaPlayer = arraycombattenti[1].pv;
            progressBar.style.width = `${vitaPlayer}%`;
        }

        progressBar.setAttribute("aria-valuenow", `${vitaPlayer.toString()}`);
        progressBar.setAttribute("aria-valuemin", "0");
        progressBar.setAttribute("aria-valuemax", "100");

        // Aggiunta della barra di progresso al div esterno
        progressDiv.appendChild(progressBar);

        if (i === 0) {
            divGiocatore.append(progressDiv);
            populateDiv(arraycombattenti[0], divGiocatore, arraycombattenti[1]);
            setInterval(() => aggiornaProgressBar(arraycombattenti[0], progressBar, divGiocatore), 500); // Aggiorna ogni 1 secondo
        } else {
            divOpponent.append(progressDiv);
            populateDiv(arraycombattenti[1], divOpponent, arraycombattenti[0]);
            setInterval(() => aggiornaProgressBar(arraycombattenti[1], progressBar, divOpponent), 500); // Aggiorna ogni 1 secondo
        }
    }
};

function aggiornaProgressBar(player: Guerriero, progressBar: HTMLElement, divGiocatoreSconfitto: HTMLElement) {
    let vitaAttuale = player.pv;

    if (vitaAttuale > 50) {
        progressBar.style.width = `${vitaAttuale}%`;
        progressBar.classList.add("bg-success");
        progressBar.classList.remove("bg-warning");
        progressBar.classList.remove("bg-danger");
        progressBar.setAttribute("aria-valuenow", vitaAttuale.toString());
    }

    if (vitaAttuale < 50) {
        progressBar.style.width = `${vitaAttuale}%`;
        progressBar.classList.remove("bg-success");
        progressBar.classList.add("bg-warning");
        progressBar.setAttribute("aria-valuenow", vitaAttuale.toString());
    }

    if (vitaAttuale < 25) {
        progressBar.style.width = `${vitaAttuale}%`;
        progressBar.classList.remove("bg-warning");
        progressBar.classList.add("bg-danger");
        progressBar.setAttribute("aria-valuenow", vitaAttuale.toString());
    }

    if (vitaAttuale < 0) {
        vitaAttuale = 0;
        progressBar.style.width = `${vitaAttuale}%`;
        progressBar.setAttribute("aria-valuenow", vitaAttuale.toString());

        if (!customModal.querySelector(".messaggio-sconfitta")) {
            divGiocatoreSconfitto.append(customModal);
            customModal.classList.remove("d-none");
            customModal.classList.remove("styleCustomModal");
            customModal.classList.add("styleCustomModal_1");
            customModal.classList.add("text-danger");
            let messaggioSconfitta = document.createElement("h3");
            messaggioSconfitta.classList.add("messaggio-sconfitta");
            messaggioSconfitta.classList.add("positionMessaggioSconfitta");
            messaggioSconfitta.innerHTML = "SCONFITTA";
            customModal.append(messaggioSconfitta);
        }
    }

    progressBar.style.width = `${vitaAttuale}%`;
    progressBar.setAttribute("aria-valuenow", vitaAttuale.toString());
}

const checkThisGuerrieroIsSayan_AndGoSuper = (character: Guerriero) => {
    return (character as Sayan).superSayan();
};

const populateDiv = (character: Guerriero, divContainer: HTMLElement, enemy: Guerriero) => {
    // all inizio della partita è il turno del primo giocatore
    h3.innerHTML = `È il turno di ${ArrayScontroPersonaggi[0].nome}`.toUpperCase();
    h3.classList.add("display-3");

    const btnCalcio = document.createElement("button");
    btnCalcio.innerText = "Calcio";

    const btnPugno = document.createElement("button");
    btnPugno.innerText = "Pugno";

    const btnRiposo = document.createElement("button");
    btnRiposo.innerText = "Riposo";

    const btnCercaOggetti = document.createElement("button");
    btnCercaOggetti.innerText = "Cerca Oggetti";

    const btnControllaInventario = document.createElement("button");
    btnControllaInventario.innerText = "Controlla inventario";

    const btnCheckTentativiRimastiRicerca = document.createElement("button");
    btnCheckTentativiRimastiRicerca.innerText = "Fatica Accumulata";

    const statusPG = document.createElement("button");
    statusPG.innerText = "STATUS PG";

    let charImage = document.createElement("img");
    charImage.src = `/imgs/${character.image}`;
    charImage.id = `id-${character.nome}`;
    charImage.classList.add("imgDimension");

    let buttonsWrapper = document.createElement("div");

    buttonsWrapper.append(
        btnCalcio,
        btnPugno,
        btnRiposo,
        btnCercaOggetti,
        btnControllaInventario,
        btnCheckTentativiRimastiRicerca,
        statusPG
    );

    // se il personaggio giocato è goku o vegeta hanno la possibilità di avere il bottone super sayan
    if (character.razza.toLowerCase() === "saiyan" || character.nome.toLowerCase() === "saiyan") {
        const btnSuperSayan = document.createElement("button");
        btnSuperSayan.innerText = "SUPER SAYAN";
        divContainer.append(btnSuperSayan);
        btnSuperSayan.addEventListener("click", () => {
            console.log("sono nel click");
            checkThisGuerrieroIsSayan_AndGoSuper(character);

            // trova immagine nel dom e sostituiscila con quella da ssj
            let ImmagineCambiata = document.getElementById(`id-${character.nome}`) as HTMLImageElement;
            if (ImmagineCambiata === null) {
                console.error("nodo del DOM è null.");
            } else {
                ImmagineCambiata.src = `/imgs/${character.image}`;
            }

            // trova la gif e rimuovila dopo 5s
            setTimeout(() => {
                let GifDaRimuovere = document.getElementById(`my-id-is-${character.nome}`);
                if (GifDaRimuovere === null) {
                    console.error("immagine è null.");
                } else {
                    GifDaRimuovere.style.display = "none";
                }
            }, 5000);
        });
    }

    divContainer.classList.add("bg-light");
    divContainer.append(charImage);
    divContainer.append(buttonsWrapper);
    divContainer.append(btnCalcio);
    divContainer.append(btnPugno);
    divContainer.append(btnRiposo);
    divContainer.append(btnCercaOggetti);
    divContainer.append(btnControllaInventario);
    divContainer.append(btnCheckTentativiRimastiRicerca);
    divContainer.append(statusPG);

    btnCalcio.addEventListener("click", () => {
        character.calcio(enemy);
        changeTurn(ArrayScontroPersonaggi);
    });

    btnPugno.addEventListener("click", () => {
        character.Pugno(enemy);
        changeTurn(ArrayScontroPersonaggi);
    });

    btnRiposo.addEventListener("click", () => {
        character.Riposo();
        changeTurn(ArrayScontroPersonaggi);
    });

    btnCercaOggetti.addEventListener("click", () => {
        character.lookAround();
        // changeTurn(ArrayScontroPersonaggi);
    });

    btnControllaInventario.addEventListener("click", () => {
        character.checkInventario();
        // changeTurn(ArrayScontroPersonaggi);
    });

    btnCheckTentativiRimastiRicerca.addEventListener("click", () => {
        character.CheckTentativiRimasti();
        // changeTurn(ArrayScontroPersonaggi);
    });

    statusPG.addEventListener("click", () => {
        character.stats();
        // changeTurn(ArrayScontroPersonaggi);
    });
};

const changeTurn = (array: Guerriero[]) => {
    if (WhoIsturn === 2) {
        WhoIsturn = 1;
        h3.innerHTML = `È il turno di ${array[0].nome}`.toUpperCase();
        return;
    }

    if (WhoIsturn === 1) {
        WhoIsturn = 2;
        h3.innerHTML = `È il turno di ${array[1].nome}`.toUpperCase();
        return;
    }
};

const RiproduzioneMusica = () => {
    //creaiamo degli oggetti canzone
    let canzone2 = new canzone("heavy Dust", "/audio/fightSong1.mp3");
    let canzone1 = new canzone("Prelude to Storm", "/audio/fightSong.mp3");

    //creo array che contiene canzoni
    const playlist: canzone[] = [];
    playlist.push(canzone1, canzone2);

    // creiamo un playerMusicale per musica combattimento
    const MusicPLayer = document.createElement("audio");
    MusicPLayer.setAttribute("controls", "");
    MusicPLayer.autoplay = true;
    MusicPLayer.volume = 0.2;

    // Aggiunta delle canzoni al player musicale come elementi <source>
    playlist.forEach((song) => {
        const sourceElement = document.createElement("source");
        sourceElement.src = song.src;
        sourceElement.type = "audio/mpeg"; // Assicurati che il tipo sia corretto in base al formato dei tuoi file audio
        MusicPLayer.appendChild(sourceElement);
    });
    appElement?.append(MusicPLayer);
};
