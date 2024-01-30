import Report from "./report.js";

import './burgerMenu.js';

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

    switch (company) {
        case 'company-1':
            company = "Jardins d'Ariana";
            break;
        case 'company-2':
            company = "Jérôme Livran";
            break;
        case 'company-3':
            company = "Philippe Parguey";
            break;
        case 'company-4':
            company = "Archimed";
            break;
        case 'company-5':
            company = "BeCom";
            break;
        default:
            break;
    }


    if (comment == "") {comment = "Pas d'observations"}

    // On vérifie que les champs "Entreprise" et "date" ne sont pas vides
    if (company === '') {
        alert("Création de l'avis impossible : vous n'avez sélectionné aucun client.")
    }
    else if (dateInput === '') {
        alert("Création de l'avis impossible : vous n'avez entré aucune date.")
    }
    // S'ils ne sont pas vides, on ajoute le nouvel avis
    else {
        const report = new Report(company, date, comment)
        
        reports.push(report);
        window.localStorage.setItem('reports', JSON.stringify(reports));
        
        console.log(reports);
        
        document.getElementById('message').innerHTML = '<i class="fa-solid fa-circle-info"></i> Avis ajout&eacute;';
        form.reset(); // Permet de vider le formulaire 
        
        displayReportsList(); // Sans cet appel, la liste des avis sur la page web ne serait pas mise à jour dynamiquement afin de matcher les changements dans les données.
        displayDetails(report);
    }
});


// TRAITEMENT DU FORMULAIRE POUR RECHERCHER UN AVIS (ET LE SUPPRIMER)
let formCheckout = document.getElementById("deleteReport");
formCheckout.addEventListener("submit", (e) => {
    e.preventDefault(); //Annule le comportement par défait. Ici, cela permet de ne pas recharger la page
    let recordNumber = Number(document.getElementById("recordNumber").value);

    // On cherche le client dans nos données
    let findOne = reports.find(function(report){
        return (report.id  === recordNumber);
    });
    //Si le client est trouvé
    if (findOne) {
        let div = `<div><i class="fa-solid fa-circle-info"></i> Avis ${findOne.id} supprimé</div>`;
        document.getElementById('message').innerHTML = div;
        reports = reports.filter(report => {
            return (report.id  !== recordNumber); //Permet de ne supprimer que le client recherché. Si on enlève le !, cela supprime TOUUUUS les reports, sauf celui recherché.
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
        let reportList = document.createElement("div");

        reports.forEach((report) => {
            let reportItem = document.createElement("div");
            reportItem.classList.add("avis");
            reportItem.innerHTML = `<div class="avisTitle">Avis de passage n° ${report.id} </div><div class="avisCompany"> ${report.company} </div><div class="avisDate"> ${report.date}</div><div class="avisComment"> ${report.comment}</div><hr/>`;
            reportList.appendChild(reportItem);
        });

        // Ajouter la liste des avis à la section
        reportListContainer.appendChild(reportList);
    } else {
        reportListContainer.innerHTML = '<i class="fa-solid fa-circle-info"></i> Aucun avis enregistré';
    }

}


// FONCTION POUR AFFICHER L'AVIS NOUVELLEMENT CRÉÉ
function displayDetails(report) {
    let reportItem = document.createElement("div");
    reportItem.classList.add("avis");
    reportItem.innerHTML = `<div class="avisTitle">Avis de passage n° ${report.id} </div><div class="avisCompany"> ${report.company} </div><div class="avisDate"> ${report.date}</div><div class="avisComment"> ${report.comment}</div>`;
    document.querySelector('#detailsRecord').appendChild(reportItem);

    document.querySelector('#landing').classList.add('hidden')
    document.querySelector('#new').classList.add('hidden')
    document.querySelector('#delete').classList.add('hidden')
    document.querySelector('#list').classList.add('hidden')
    document.querySelector('#details').classList.remove('hidden')
}


// PERMET LE DISPLAY D'UNE SECTION EN FONCTION DE CE QUI EST CLIQUÉ DANS LE MENU
document.querySelector('#newLink').addEventListener('click', function() {
    document.querySelector('#landing').classList.add('hidden')
    document.querySelector('#new').classList.remove('hidden')
    document.querySelector('#delete').classList.add('hidden')
    document.querySelector('#list').classList.add('hidden')
    document.querySelector('#details').classList.add('hidden')

    document.getElementById('message').innerHTML = ''
})

document.querySelector('#deleteLink').addEventListener('click', function() {
    document.querySelector('#landing').classList.add('hidden')
    document.querySelector('#new').classList.add('hidden')
    document.querySelector('#delete').classList.remove('hidden')
    document.querySelector('#list').classList.add('hidden')
    document.querySelector('#details').classList.add('hidden')

    document.getElementById('message').innerHTML = ''
})

document.querySelector('#listLink').addEventListener('click', function() {
    document.querySelector('#landing').classList.add('hidden')
    document.querySelector('#new').classList.add('hidden')
    document.querySelector('#delete').classList.add('hidden')
    document.querySelector('#list').classList.remove('hidden')
    document.querySelector('#details').classList.add('hidden')

    document.getElementById('message').innerHTML = ''
})