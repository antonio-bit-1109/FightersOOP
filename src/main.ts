import { combattente } from "./classes/combattente";
import { pozione } from "./classes/pozione";

const pozioneVita_sm = new pozione(20, "pozioneVita_sm");
const pozioneVita_md = new pozione(50, "pozioneVita_md");
const pozioneVita_lg = new pozione(100, "pozioneVita_lg");

const pozioneDifesa_sm = new pozione(5, "pozioneDIfesa_sm");
const pozioneDifesa_md = new pozione(10, "pozioneDIfesa_md");
const pozioneDifesa_lg = new pozione(20, "pozioneDIfesa_lg");

const pozioneAttacco_sm = new pozione(3, "pozioneAttacco_sm");
const pozioneAttacco_md = new pozione(5, "pozioneAttacco_md");
const pozioneAttacco_lg = new pozione(9, "pozioneAttacco_lg");

const pozionePrecisione_sm = new pozione(2, "pozionePrecisione_sm");
const pozionePrecisione_md = new pozione(3, "pozionePrecisione_md");
const pozionePrecisione_lg = new pozione(5, "pozionePrecisione_lg");

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

const Goku = new combattente("Goku", 1000, 30, 12, 0, 35, 100, "saiyan", "calmo", "fronte", 89, "goku.webp");
const Vegeta = new combattente(
    "Vegeta",
    6000,
    22,
    10,
    0,
    40,
    100,
    "saiyan",
    "irascibile",
    "braccio sinistro",
    92,
    "vegeta.png"
);
const Freezer = new combattente("Freezer", 4000, 35, 4, 2, 20, 100, "shimoni", "irascibile", "coda", 90, "freezer.jpg");
const Cell = new combattente("Cell", 5000, 4000, 5, 1, 30, 100, "cyborg", "esuberante", "stomaco", 91, "cell.jpg");
const KidBU = new combattente("Kid-Bu", 5500, 35, 6, 0, 44, 100, "Majin", "furioso", "testa", 75, "kid_buu.jpg");
//
//
const appElement = document.getElementById("app");
appElement?.classList.add("appElementStyle");

const ArrayPersonaggi: combattente[] = [];
ArrayPersonaggi.push(Goku, Vegeta, Freezer, Cell, KidBU);

const h1 = document.createElement("h1");
const h3 = document.createElement("h3");
const customModal = document.createElement("div");
let PlayersDiv = document.createElement("div");
customModal.classList.add("styleCustomModal");
// let personaggioUtente: any | combattente = null;
// let personaggioComputer: any | combattente = null;

// array contenente i due personaggi che combatteranno
let ArrayScontroPersonaggi: combattente[] = [];

let startMatch = false;
const divGiocatore = document.createElement("section");
const divOpponent = document.createElement("section");
export const statusBattle = document.createElement("div");
statusBattle.classList.add("statusDivStyle", "display-2", "text-center", "fw-bolder");

let WhoIsturn: number = 1;
//
//------------------------- ELEMENTI GLOBALI SOPRA ---------------------------------------------------------
//
//

document.addEventListener("DOMContentLoaded", () => {
    if (appElement) {
        start();
        chooseYourCharacter();
        appElement?.append(statusBattle);
    }
});

const start = () => {
    appElement?.append(h1);
    appElement?.append(h3);
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
        charImage.src = `./src/assets/imgs/${ArrayPersonaggi[i].image}`;
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
const TogliPersonaggioSceltoArray = (personaggioScelto: combattente) => {
    const filteredArray = ArrayPersonaggi.filter((personaggio) => personaggio.nome !== personaggioScelto.nome);
    ArrayPersonaggi.splice(0, ArrayPersonaggi.length, ...filteredArray);
    console.log(ArrayPersonaggi);
};

const PersonaggioScelto = function (character: combattente) {
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
const OpponentPLayer = (array: combattente[]) => {
    let randomNum = Math.floor(Math.random() * array.length);
    let avversario: combattente = array[randomNum];
    ArrayScontroPersonaggi.push(avversario);
    // personaggioComputer = avversario;
    // console.log(personaggioComputer);
    console.log(ArrayScontroPersonaggi);
};

// creo i div contenenti info dei due personaggi e attacco event listeners che richiamano i metodi necessari per il combattimento
const DamoseLeBotte = (arraycombattenti: combattente[]) => {
    h1.innerHTML = ` Combattimento tra ${arraycombattenti[0].nome} e ${arraycombattenti[1].nome}`;
    h3.innerHTML = "";
    PlayersDiv.innerHTML = "";
    PlayersDiv.classList.add("d-flex", "gap-4");
    PlayersDiv.append(divGiocatore);
    divGiocatore.classList.add("w-50");
    PlayersDiv.append(divOpponent);
    divOpponent.classList.add("w-50");

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

function aggiornaProgressBar(player: combattente, progressBar: any, divGiocatoreSconfitto: HTMLElement) {
    let vitaAttuale = player.pv;
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

const populateDiv = (character: combattente, divContainer: HTMLElement, enemy: combattente) => {
    // all inizio della partita è il turno del primo giocatore
    h3.innerHTML = `È il turno di ${ArrayScontroPersonaggi[0].nome}`.toUpperCase();

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

    let charImage = document.createElement("img");
    charImage.src = `./src/assets/imgs/${character.image}`;
    charImage.classList.add("imgDimension");

    let textWrapper = document.createElement("div");

    let nome = document.createElement("h5");
    nome.innerHTML = `${character.nome}`;
    nome.classList.add("text-dark", "fs-1");
    textWrapper.append(nome);

    let pv = document.createElement("p");
    pv.innerHTML = ` PV : ${character.pv}`;
    pv.classList.add("text-dark");
    textWrapper.append(pv);

    let lv = document.createElement("p");
    lv.innerHTML = ` LVL : ${character.livello}`;
    lv.classList.add("text-dark");
    textWrapper.append(lv);

    let forza = document.createElement("p");
    forza.innerHTML = ` ATK : ${character.forza}`;
    forza.classList.add("text-dark");
    textWrapper.append(forza);

    let agilita = document.createElement("p");
    agilita.innerHTML = ` DEX : ${character.agilita}`;
    agilita.classList.add("text-dark");
    textWrapper.append(agilita);

    let precisione = document.createElement("p");
    precisione.innerHTML = ` AIM : ${character.precisione}`;
    precisione.classList.add("text-dark");
    textWrapper.append(precisione);

    let puntoCritico = document.createElement("p");
    puntoCritico.innerHTML = ` WEAKNESS : ${character.puntoCritico}`;
    puntoCritico.classList.add("text-dark");

    divContainer.classList.add("bg-light");
    divContainer.append(charImage);
    divContainer.append(textWrapper);
    divContainer.append(btnCalcio);
    divContainer.append(btnPugno);
    divContainer.append(btnRiposo);
    divContainer.append(btnCercaOggetti);
    divContainer.append(btnControllaInventario);
    divContainer.append(btnCheckTentativiRimastiRicerca);

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
        changeTurn(ArrayScontroPersonaggi);
    });

    btnControllaInventario.addEventListener("click", () => {
        character.checkInventario();
        changeTurn(ArrayScontroPersonaggi);
    });

    btnCheckTentativiRimastiRicerca.addEventListener("click", () => {
        character.CheckTentativiRimasti();
        changeTurn(ArrayScontroPersonaggi);
    });
};

const changeTurn = (array: combattente[]) => {
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
