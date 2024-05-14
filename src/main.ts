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

const Goku = new combattente("Goku", 50, 30, 1, 0, 35, 150, "saiyan", "calmo", "fronte", 89, "goku.webp");
const Vegeta = new combattente(
    "Vegeta",
    60,
    22,
    1,
    0,
    40,
    100,
    "saiyan",
    "irascibile",
    "braccio sinistro",
    92,
    "vegeta.png"
);
const Freezer = new combattente("Freezer", 40, 35, 4, 2, 20, 110, "shimoni", "irascibile", "coda", 90, "freezer.jpg");
const Cell = new combattente("Cell", 50, 40, 5, 1, 30, 130, "cyborg", "esuberante", "stomaco", 91, "cell.jpg");
const appElement = document.getElementById("app");
appElement?.classList.add("appElementStyle");

const ArrayPersonaggi: combattente[] = [];
ArrayPersonaggi.push(Goku, Vegeta, Freezer, Cell);

const h1 = document.createElement("h1");
const h3 = document.createElement("h3");
const customModal = document.createElement("div");
customModal.classList.add("styleCustomModal");
let personaggioUtente: null | combattente = null;
let personaggioComputer: null | combattente = null;
let startMatch = false;
//
//------------------------- ELEMENTI GLOBALI SOPRA ---------------------------------------------------------
//
//

document.addEventListener("DOMContentLoaded", () => {
    if (appElement) {
        start();
        chooseYourCharacter();
        OpponentPLayer(ArrayPersonaggi);
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
    let PlayerDiv = document.createElement("div");
    PlayerDiv.classList.add("text-center");

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
                    PersonaggioScelto(character);
                };
            })(ArrayPersonaggi[i])
        );

        textWrapper.append(inventario);
        wrapper.append(textWrapper);
        // wrapper.append(button);
        PlayerDiv.append(buttonChooseCharacter);
    }
    appElement?.append(PlayerDiv);
};

const PersonaggioScelto = function (character: combattente) {
    const buttonStartMatch = document.createElement("button");
    buttonStartMatch.innerHTML = "Start Match";
    buttonStartMatch.classList.add("btnStartMatch_Style", "py-2", "fs-1");

    buttonStartMatch.addEventListener("click", () => {
        customModal.style.display = "none";
        customModal.classList.remove("display-1", "text-warning", "fw-bolder", "d-flex", "flex-column", "gap-3");
        customModal.innerHTML = "";
        startMatch = true;
        startMatch && DamoseLeBotte();
    });
    // setTimeout(() => {
    //     customModal.style.display = "none";
    // }, 2500);
    customModal.innerHTML = `Hai scelto ${character.nome}`;
    customModal.classList.add("display-1", "text-warning", "fw-bolder", "d-flex", "flex-column", "gap-3");
    customModal.append(buttonStartMatch);
    appElement?.append(customModal);
    personaggioUtente = character;
    console.log(personaggioUtente);
};

const OpponentPLayer = (array: combattente[]) => {
    let randomNum = Math.floor(Math.random() * array.length);
    let avversario: combattente = array[randomNum];
    personaggioComputer = avversario;
    console.log(personaggioComputer);
};

const DamoseLeBotte = () => {
    console.log("stiamo combattendo!");
};
