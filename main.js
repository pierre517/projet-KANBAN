import { sauvegarderDonnées } from "./modules/sauvegarder-charger.js";
import { chargerDonnées } from "./modules/sauvegarder-charger.js";

const tableauDeDonnees = chargerDonnées();

for (let i = 0; i < tableauDeDonnees.length; i++) {
  afficherListe(tableauDeDonnees[i].nomListe, i);
}

const bouttonListe = document.querySelector(".ajouterListe");

bouttonListe.addEventListener("click", function () {
  // je demande le titre de la liste à l'utilisateur
  const titreDeLaListe = prompt("quel est le titre de votre liste?");

  // je rajoute la liste dans mon tableau de données
  tableauDeDonnees.push({ nomListe: titreDeLaListe, tache: [] });
  sauvegarderDonnées(tableauDeDonnees);
  afficherListe(titreDeLaListe, tableauDeDonnees.length - 1);
});

function afficherListe(titre, index) {
  const main = document.querySelector("main");
  //   je créé une div et je lui donne une class nouvelleListe, puis je la place dans le main
  const nouvelleListe = document.createElement("section");
  nouvelleListe.classList.add("nouvelleListe");
  nouvelleListe.setAttribute("aria-label", "liste contenant les taches");
  main.appendChild(nouvelleListe);
  //   je créé un titre dans cette Nouvelle liste qui sera la valeur de l'input du prompt et je le place dans la div
  let nomDeLaListe = document.createElement("h2");
  nomDeLaListe.classList.add("nomDeLaListe");
  nouvelleListe.appendChild(nomDeLaListe);
  nomDeLaListe.textContent = titre;

  // je créé une boucle afin de parcourir les taches, de trouver les taches exisantes et de les afficher

  for (let i = 0; i < tableauDeDonnees[index].tache.length; i++) {
    afficherTache(tableauDeDonnees[index].tache[i], nomDeLaListe, index);
  }

  // je créé un input afin de donner du contenu aux nouvelles taches, je lui donne une classe css et je l'insere dans ma liste
  let titreTache = document.createElement("input");
  titreTache.classList.add("titreTache");
  titreTache.setAttribute(
    "aria-label",
    "espace pour entrer le titre de votre nouvelle tache"
  );
  titreTache.setAttribute("name", "titreTache");
  nouvelleListe.appendChild(titreTache);
  titreTache.placeholder = `votre nouvelle tache ici`;
  //   dans ma liste je créé un bouton pour ajouter des taches, je le place dans ma liste et je lui donne une classe css
  const bouttonTache = document.createElement("button");
  bouttonTache.textContent = `ajouter une tache`;
  bouttonTache.classList.add("bouttonTache");
  nouvelleListe.appendChild(bouttonTache);
  //   je créé un boutton pour supprimer la liste
  const bouttonSupprimerListe = document.createElement("button");
  bouttonSupprimerListe.textContent = `supprimer la liste X`;
  bouttonSupprimerListe.classList.add("bouttonSupprimerListe");
  nouvelleListe.appendChild(bouttonSupprimerListe);

  // ecoute sur le boutton ajouter une tache ____________::::::::::::::

  bouttonTache.addEventListener("click", function () {
    // je créé une div avec élément p pour afficher la tache demandée,un boutton pour la supprimer, je lui donne une classe et je la place apres le titre de la liste
    const tache = document.createElement("div");
    tache.classList.add("tache");
    let texteTache = document.createElement("h3");
    texteTache.classList.add("texteTache");
    texteTache.textContent = titreTache.value;
    tache.appendChild(texteTache);
    const bouttonSupprimerTache = document.createElement("button");
    bouttonSupprimerTache.textContent = `X`;
    bouttonSupprimerTache.classList.add("bouttonSupprimerTache");
    tache.appendChild(bouttonSupprimerTache);
    nomDeLaListe.after(tache);
    tableauDeDonnees[index].tache.push(texteTache.textContent);
    sauvegarderDonnées(tableauDeDonnees);
    titreTache.value = ``;
    // ecoute sur le boutton pour supprimer la tache

    bouttonSupprimerTache.addEventListener("click", function () {
      tache.remove();
      tableauDeDonnees[index].tache.splice(
        tableauDeDonnees[index].tache.indexOf(texteTache.textContent),
        1
      );
      sauvegarderDonnées(tableauDeDonnees);
    });
  });
  //  ecoute sur le boutton pour supprimer la liste

  bouttonSupprimerListe.addEventListener("click", function () {
    nouvelleListe.remove();
    tableauDeDonnees.splice(index, 1);
    sauvegarderDonnées(tableauDeDonnees);
  });
}

function afficherTache(nomDeTache, parent, index) {
  const tache = document.createElement("div");
  tache.classList.add("tache");
  let texteTache = document.createElement("h3");
  texteTache.classList.add("texteTache");
  texteTache.textContent = nomDeTache;
  tache.appendChild(texteTache);
  const bouttonSupprimerTache = document.createElement("button");
  bouttonSupprimerTache.textContent = `X`;
  bouttonSupprimerTache.classList.add("bouttonSupprimerTache");
  bouttonSupprimerTache.setAttribute("aria-label", "supprimer la tache");
  tache.appendChild(bouttonSupprimerTache);
  parent.after(tache);

  bouttonSupprimerTache.addEventListener("click", function () {
    tache.remove();
    tableauDeDonnees[index].tache.splice(
      tableauDeDonnees[index].tache.indexOf(texteTache.textContent),
      1
    );
    sauvegarderDonnées(tableauDeDonnees);
  });
}
