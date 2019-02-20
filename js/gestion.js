// pointeur sur la position de la question courante dans le questionnaire
var index = 0;
// initialisation du catalogue
var catalogue = [];
// nbre de réponse à une question
var nbReponse;
// nbr de réponse possible
var reponsePossible;
var nbCheck;

function executerRequete(callback) {
    // on vérifie si le fichier a déjà été chargé pour n'exécuter la requête AJAX
    // qu'une seule fois
    if (catalogue.length === 0) {
        // on récupère un objet XMLHttpRequest
        var xhr = getXMLHttpRequest();
        // on réagit à l'événement onreadystatechange
        xhr.onreadystatechange = function() {
            // test du statut de retour de la requête AJAX
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                // on désérialise le questionnaire et on le sauvegarde dans une variable
                catalogue = JSON.parse(xhr.responseText);
                // on lance la fonction de callback avec le questionnaire récupéré
                callback();
            }
        }
        // la requête AJAX : lecture de data.json
        xhr.open("GET", "bdd/quizz.json", true);
        xhr.send();
    } else {
        // on lance la fonction de callback avec le questionnaire déjà récupéré précédemment
        callback();
    }
}

function afficheResultat() {
    // cacher le bouton 
    document.getElementById("boutResult").style.display = "none";
    // recuperer les valeurs sélectionnées
    var valeur = [];
    var ind = index-1;
    for (i=0; i<nbReponse; i++) {
        j=0;
		if (document.getElementById("id"+i).checked) {
            valeur[j] = i;
            // alert(j);
            // alert(valeur[j]);
        // si on a une seule réponse possible
        if (catalogue[ind].reponse_possible == 1) {

            // alert(catalogue[ind].reponse[valeur[j]].valide );
            // alert(catalogue[ind].libelle_question);
            // verification dans le fichier des réponses
            if (catalogue[ind].reponse[valeur[j]].valide == true){
 
                success = true;
                break;
            } else {

                success = false;
                break;
            }
        } else {
            // plusieurs réponses possible
            for ()
        }
        }
        j++;
           
    }

    if (success == true){
        var libReponse = catalogue[ind].argument_bonnereponse;

        var child = document.createElement("h3");
        var node = document.createTextNode(libReponse);
        var node = document.createTextNode(libReponse);
        child.setAttribute("id","res");
        child.appendChild(node);

        var parent = document.getElementById("resultat");
        parent.appendChild(child);
    }else{
        var libReponse = catalogue[ind].argument_mauvaisereponse;

        var child = document.createElement("h3");
        var node = document.createTextNode(libReponse);
        child.setAttribute("id","res");
        child.appendChild(node);

        var parent = document.getElementById("resultat");
        parent.appendChild(child);
    }
}

function lireSuivant() {

    document.getElementById("boutResult").style.display = "inline";
    // connaitre le nombre de question dans le fichier Json
    var longueur = catalogue.length;
    var libelle = catalogue[index].libelle_question;
    reponsePossible = catalogue[index].reponse_possible;
    nbCheck = 0;
    // manipulation du DOM pour afficher le libellé de la question
    var parent = document.getElementById("quiz");
    var child = document.getElementById("cont");
    var para = document.createElement("h3");
    para.setAttribute("id","cont");
    var node = document.createTextNode(libelle);
    para.appendChild(node);
    parent.replaceChild(para,child);

    // effacer les réponses précedentes
    if (index != 0){
        for (i=0; i<nbReponse; i++)
        {
            var parent = document.getElementById("li"+i);
            var child = document.getElementById("id"+i);
            parent.removeChild(child);
            var parent = document.getElementById("li"+i);
            var child = document.getElementById("lab"+i);            
            parent.removeChild(child); 
            var parent = document.getElementById("reponse");
            var child = document.getElementById("li"+i);
            parent.removeChild(child);     

        }  
        // efface la zone résultat
        var parent = document.getElementById("resultat");
        var child = document.getElementById("res");
        parent.removeChild(child); 
      }

    // connaitre le nombre de réponse à afficher
    nbReponse = catalogue[index].nbr_reponse;
    type = catalogue[index].type_reponse;

    // afficher les réponses
    for (i=0; i<nbReponse; i++)
    {
        var li = document.createElement('li');
        li.setAttribute("id", "li"+i);
        var para = document.createElement("input");
        var libelle = catalogue[index].reponse[i].libelle_reponse;
        para.setAttribute("type",type);
        para.setAttribute("id", "id"+i);
        para.setAttribute("name",type);
        if (type=="checkbox"){
            para.setAttribute("onclick","clickCheck(this);");           
        }
        li.appendChild(para);
        var label = document.createElement("label");
        label.setAttribute("for", "id"+i);
        label.setAttribute("id", "lab"+i);
        label.innerHTML = libelle;
        li.appendChild(label);
        var element = document.getElementById("reponse");
        element.appendChild(li);
    }    
    if (index < longueur - 1) {
        index++;
    }
}


// on initialise la lecture au premier élément
executerRequete(lireSuivant);

	
function isChecked(elmt)
{
    if( elmt.checked )
    {
        return true;
    }
    else
    {
        return false;
    }
}

function clickCheck(elmt)
{
    if( (nbCheck < reponsePossible) || (isChecked(elmt) == false) )
    {
        if( isChecked(elmt) == true )
        {
            nbCheck += 1;
        }
        else
        {
            nbCheck -= 1;
        }
    }
    else
    {
        elmt.checked = '';
    }
}
