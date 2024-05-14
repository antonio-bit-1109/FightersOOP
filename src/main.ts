import { combattente } from "./classes/combattente";
import { pozione } from "./classes/pozione";
import torneoImg from "./assets/imgs/torneo.png";

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

document.addEventListener("DOMContentLoaded", () => {
    if (appElement) {
        start();
        chooseYourCharacter();
    }
});

const start = () => {
    const h1 = document.createElement("h1");
    appElement?.append(h1);
    h1.innerHTML = "Benvenuto Al fighters-Z Game";
    h1.classList.add("stileh1");
};

const chooseYourCharacter = () => {
    let PlayerDiv = document.createElement("div");
    PlayerDiv.classList.add("text-center");

    for (let i = 0; i < ArrayPersonaggi.length; i++) {
        let wrapper = document.createElement("section");
        wrapper.classList.add("bg-white", "d-inline-block", "text-center", "mx-3", "rounded-5", "px-3");

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
        textWrapper.append(pv);

        let lv = document.createElement("p");
        lv.innerHTML = ` LVL : ${ArrayPersonaggi[i].livello}`;
        textWrapper.append(lv);

        let forza = document.createElement("p");
        forza.innerHTML = ` ATK : ${ArrayPersonaggi[i].forza}`;
        textWrapper.append(forza);

        let agilita = document.createElement("p");
        agilita.innerHTML = ` DEX : ${ArrayPersonaggi[i].agilita}`;
        textWrapper.append(agilita);

        let precisione = document.createElement("p");
        precisione.innerHTML = ` AIM : ${ArrayPersonaggi[i].precisione}`;
        textWrapper.append(precisione);

        let puntoCritico = document.createElement("p");
        puntoCritico.innerHTML = ` WEAKNESS : ${ArrayPersonaggi[i].puntoCritico}`;
        textWrapper.append(puntoCritico);

        let razza = document.createElement("p");
        razza.innerHTML = ` RACE : ${ArrayPersonaggi[i].razza}`;
        textWrapper.append(razza);

        wrapper.append(textWrapper);
        PlayerDiv.append(wrapper);
    }
    appElement?.append(PlayerDiv);
};
