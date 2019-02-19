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
    // manipulation du DOM pour afficher les caractéristiques de l'article
    document.getElementById("quest").innerHTML = catalogue[index].libelle_question;
    // efface les div de réponse
    for (i=0; i<8; i++)
    {
        var numdiv="cont"+i;
        document.getElementById(numdiv).style.display = "none";
    }  
    // connaitre le nombre de réponse à afficher
    nbReponse = catalogue[index].nbr_reponse;

    // si necessaire changer le type radio en checkbox
    type = catalogue[index].type_reponse;
    if (type == "checkbox"){

    } else if (type == "radio") {
        
    }
    for (i=0; i<nbReponse; i++)
    {
        var numlabel='lab'+i;
        var numdiv='cont'+i;
        var numInput='id'+i;
        // document.getElementById(numInput).style.type = type;
        document.getElementById(numdiv).style.display = "block";
        document.getElementById(numlabel).textContent = catalogue[index].reponse[i].libelle_reponse;
    }    
    if (index < longueur - 1) {
        index++;
    }
}


// on initialise la lecture au premier élément
executerRequete(lireSuivant);
