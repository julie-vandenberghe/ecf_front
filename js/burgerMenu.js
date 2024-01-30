// Affichage du menu déroulant sur le burger menu
let btnBurger = document.querySelector("button.burger"); // On récupère le bouton burger
let menu = document.querySelector("ul.menu") ; // On récupère le menu


btnBurger.addEventListener('click', (e => { // On ajoute un écouteur d'event au clic
    menu.classList.toggle("active"); // Si la classe active n'est pas là, on la rajoute. Si elle est là, on la supprime.
}));

//Permet de "supprimer"/ranger le menu au clic d'un des liens
const links = document.querySelectorAll("nav ul.menu li"); // On récupère les li
links.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });