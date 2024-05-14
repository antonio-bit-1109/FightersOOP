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

const Goku = new combattente("Goku", 50, 30, 1, 0, 35, 150, "saiyan", "calmo", "fronte", 89);
const Vegeta = new combattente("Vegeta", 60, 22, 1, 0, 40, 100, "saiyan", "irascibile", "braccio sinistro", 92);
const Freezer = new combattente("Freezer", 40, 35, 4, 2, 20, 110, "shimoni", "irascibile", "coda", 90);

document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.getElementById("app");
});
