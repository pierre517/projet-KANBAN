export function chargerDonnées() {
  let tableauKanban = JSON.parse(localStorage.getItem("tableauKanban")) || [];
  return tableauKanban;
}

export function sauvegarderDonnées(tableau) {
  localStorage.setItem("tableauKanban", JSON.stringify(tableau));
}
