// pointeur sur la position de l'article courant dans le catalogue
var index = 0;
// initialisation du catalogue
var catalogue = [];

function executerRequete(callback) {
    // on vérifie si le catalogue a déjà été chargé pour n'exécuter la requête AJAX
    // qu'une seule fois
    if (catalogue.length === 0) {
        // on récupère un objet XMLHttpRequest
        var xhr = getXMLHttpRequest();
        // on réagit à l'événement onreadystatechange
        xhr.onreadystatechange = function() {
            // test du statut de retour de la requête AJAX
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                // on désérialise le catalogue et on le sauvegarde dans une variable
                catalogue = JSON.parse(xhr.responseText);
                // on lance la fonction de callback avec le catalogue récupéré
                callback();
            }
        }
        // la requête AJAX : lecture de data.json
        xhr.open("GET", "bdd/quizz.json", true);
        xhr.send();
    } else {
        // on lance la fonction de callback avec le catalogue déjà récupéré précédemment
        callback();
    }
}

function lireSuivant() {
    // connaitre le nombre d'articles dans le catalogue
    var longueur = catalogue.length;
    var libelle = catalogue[index].libelle_question;

    // manipulation du DOM pour afficher les caractéristiques de l'article
    var parent = document.getElementById("quiz");
    var child = document.getElementById("cont");
    var para = document.createElement("p");
    para.setAttribute("id","cont");
    var node = document.createTextNode(libelle);
    para.appendChild(node);
    parent.replaceChild(para,child);

    // connaitre le nombre de réponse à afficher
    nbReponse = catalogue[index].nbr_reponse;
    type = catalogue[index].type_reponse;

    // afficher les réponses
    for (i=0; i<nbReponse; i++)
    {
        var para = document.createElement("input");
        var libelle = catalogue[index].reponse[i].libelle_reponse;
        var node = document.createTextNode(libelle);
        para.setAttribute("type",type);
        para.setAttribute("name",type);
        para.appendChild(node);
        var element = document.getElementById("reponse");
        element.appendChild(para);

    }    
    if (index < longueur - 1) {
        index++;
    }
}


// on initialise la lecture au premier élément
executerRequete(lireSuivant);