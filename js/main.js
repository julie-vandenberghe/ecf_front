import Report from "./report.js";


// TRAITEMENT DU FORMULAIRE POUR AJOUTER UN AVIS
let form = document.getElementById("newReport");
let reports = JSON.parse(window.localStorage.getItem('reports') || '[]');
// Appel initial pour afficher la liste des avis existants
displayReportsList(); // Si on ne fait pas ça, aucun affichage au début


form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let company = document.getElementById("company-select").value;
    let dateInput = document.getElementById("date").value;
    let date = new Date(dateInput).toLocaleDateString('fr-FR'); // 2023-02-01 sera affiché 01/01/2023
    let comment = document.getElementById("comment").value;

    if (company == "company-1") {company = "Jardins d'Ariana"}
    if (company == "company-2") {company = "Jérôme Livran"}
    if (company == "company-3") {company = "Philippe Parguey"}
    if (company == "company-4") {company = "Archimed"}
    if (company == "company-5") {company = "BeCom"}


    // Ajout nouveau client
    reports.push(new Report(company, date, comment));
    window.localStorage.setItem('reports', JSON.stringify(reports));
    console.log(reports);
    document.getElementById('message').innerHTML = '<i class="fa-solid fa-circle-info"></i> Avis ajout&eacute;';
    form.reset(); // Permet de vider le formulaire 
    displayReportsList(); // Sans cet appel, la liste des avis sur la page web ne serait pas mise à jour dynamiquement afin de matcher les changements dans les données.
});


// TRAITEMENT DU FORMULAIRE POUR RECHERCHER UN AVIS (ET LE SUPPRIMER)
let formCheckout = document.getElementById("deleteReport");
formCheckout.addEventListener("submit", (e) => {
    e.preventDefault(); //Annule le comportement par défait. Ici, cela permet de ne pas recharger la page
    let recordNumber = document.getElementById("recordNumber").value;    
    
    // On cherche le client dans nos données
    let findOne = reports.find(function(report){
        return (report.id  === recordNumber);
    });
    //Si le client est trouvé
    if (findOne) {
        let div = `<div><i class="fa-solid fa-circle-info"></i> Avis ${findOne.id} supprimé</div>`;
        document.getElementById('message').innerHTML = div;
        reports = reports.filter(item => {
            return (item.nom  !== recordNumber); //Permet de ne supprimer que le client recherché. Si on enlève le !, cela supprime TOUUUUS les reports, sauf celui recherché.
        });
        window.localStorage.setItem('reports', JSON.stringify(reports));
    }
    else {
        //console.log("❌ Avis introuvable");
        let div = `Avis introuvable`;
        document.getElementById('message').innerHTML = div;
    }
    displayReportsList();
});



// FONCTION POUR AFFICHER TOUS LES AVIS
function displayReportsList() {
// 
    let reportListSection = document.getElementById("list");
    let reportListContainer = document.getElementById("reportRecord");

    // Effacer le contenu actuel
    reportListContainer.innerHTML = "";

    if (reports.length > 0) {
        // Construire la liste des avis
        let reportList = document.createElement("ul");

        reports.forEach((report) => {
            let reportItem = document.createElement("li");
            reportItem.textContent = `${report.company} - ${report.date}`;
            reportList.appendChild(reportItem);
        });

        // Ajouter la liste des avis à la section
        reportListContainer.appendChild(reportList);
    } else {
        reportListContainer.textContent = '<i class="fa-solid fa-circle-info"></i> Aucun avis enregistré';
    }

    // Afficher la section des avis
    reportListSection.classList.remove("hidden");
}



// PERMET LE DISPLAY D'UNE SECTION EN FONCTION DE CE QUI EST CLIQUÉ DANS LE MENU
document.querySelector('#newLink').addEventListener('click', function() {
    document.querySelector('#new').classList.remove('hidden')
    document.querySelector('#delete').classList.add('hidden')
    document.querySelector('#list').classList.add('hidden')
    document.getElementById('message').innerHTML = ''
})

document.querySelector('#deleteLink').addEventListener('click', function() {
    document.querySelector('#new').classList.add('hidden')
    document.querySelector('#delete').classList.remove('hidden')
    document.querySelector('#list').classList.add('hidden')
    document.getElementById('message').innerHTML = ''
})

document.querySelector('#listLink').addEventListener('click', function() {
    document.querySelector('#new').classList.add('hidden')
    document.querySelector('#delete').classList.add('hidden')
    document.querySelector('#list').classList.remove('hidden')
    document.getElementById('message').innerHTML = ''
})