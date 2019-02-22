function score(){
    var valeur = document.getElementById("compteurPoint");   
    // changer texte bouton suivant
    valeur.innerHTML = readCookie('monscore');
    var valeur = document.getElementById("pointMax");   
    // changer texte bouton suivant
    valeur.innerHTML = readCookie('scoremax');
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function retour() {  
    document.location.href="nature18.html";
}

