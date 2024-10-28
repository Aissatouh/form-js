const prenom = document.getElementById("pre");
const nom = document.getElementById("nom");
const date = document.getElementById("date");
const email = document.getElementById("email");
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidDate = (date) => /\d{4}-\d{2}-\d{2}/.test(date);
let editingIndex = null;


let tabPersonnes = [];

/**
 * Récupère et retourne les valeurs des champs de formulaire.
 * @returns {Object} Un objet contenant les valeurs des champs 'nom', 'prenom', 'date', et 'email'.
 */
const getFormValues = () => {
    return {
        nomValue: nom.value.trim(),
        prenomValue: prenom.value.trim(),
        dateValue: date.value.trim(),
        emailValue: email.value.trim(),
    };
};


/**
 * Génère une adresse email basée sur les valeurs du prénom, nom, et date de naissance.
 * L'email est créé sous le format : première lettre du prénom + nom + année de naissance + "@sonatel.com".
 * Si les champs requis ne sont pas remplis, une alerte demande à l'utilisateur de remplir les champs.
 */
const generer = () => {
    const { nomValue, prenomValue, dateValue } = getFormValues();
    if (nomValue !== "" && prenomValue !== "" && dateValue !== "") {
        const emailValue = prenomValue[0] + nomValue + dateValue.split("-")[0] + "@sonatel.com";
        email.value = emailValue.toLowerCase();
    } else {
        alert("Veuillez remplir tous les champs svp");
    }
};


/**
 * Enregistre une personne dans le tableau `tabPersonnes` si tous les champs sont remplis.
 * Chaque personne est enregistrée sous la forme d'un objet contenant 'prenom', 'nom', 'date', et 'email'.
 * Après l'enregistrement, les champs du formulaire sont vidés et la liste des personnes est mise à jour.
 * Si un champ est manquant, une alerte est affichée.
 */





const enregistrer = () => {
    const { nomValue, prenomValue, dateValue, emailValue } = getFormValues();

    if (nomValue && prenomValue && dateValue && emailValue) {
        const personnes = {
            prenom: prenomValue,
            nom: nomValue,
            date: dateValue,
            email: emailValue
        };

        if (editingIndex !== null) {
            tabPersonnes[editingIndex] = personnes;
            editingIndex = null;
        } else {
            tabPersonnes.push(personnes);
        }
        
        console.table(tabPersonnes);
        viderChamps();
        ajoutPerso();
    } else {
        alert("Tous les champs sont obligatoires.");
    }
};



/**
 * Vide tous les champs du formulaire : 'prenom', 'nom', 'date', et 'email'.
 */
const viderChamps = () => {
    prenom.value = "";
    nom.value = "";
    date.value = "";
    email.value = "";
};


/**
 * Met à jour l'affichage de la liste des personnes enregistrées dans le tableau `tabPersonnes`.
 * Chaque personne est affichée dans un tableau HTML avec un bouton pour supprimer cette personne.
 */
const ajoutPerso = () => {
    list.innerHTML = "";
    tabPersonnes.forEach((element, i) => {
        let trElement = `
            <tr>
                <td class="text-center ">${i + 1}</td>
                <td class="text-center ">${element?.prenom || ''}</td>
                <td class="text-center ">${element.nom}</td>
                <td class="text-center ">${element.date}</td>
                <td class="text-center ">${element.email}</td>
                <td width="20%" class="text-center" d-flex justify-content-between >
                    <button onclick="supprimerPerso('${i}')" class="btn btn-outline-danger btn-sm ">X</button>
                    <button onclick="modifPerso('${i}')" class="btn btn-outline-danger btn-sm ">0</button>
                </td>
            </tr>
        `;
        list.innerHTML += trElement;
    });
};


/**
 * Supprime une personne du tableau `tabPersonnes` à l'index donné.
 * @param {number} position - L'index de la personne à supprimer dans le tableau.
 * Demande une confirmation à l'utilisateur avant la suppression.
 * Après suppression, la liste des personnes est mise à jour.
 */
const supprimerPerso = (position) => {
    if (confirm("Voulez-vous supprimer cette personne ?")) {
        tabPersonnes.splice(position, 1);
        ajoutPerso();
    }
};
const modifPerso = (index) =>{
     //Recuperer la personne a modifier dans le tableau
     const p = tabPersonnes[index];
     //Charger les elements au niveau du formulaire
     prenom.value = p.prenom;
     nom.value = p.nom;
     date.value = p.date;
     email.value = p.email;
     editingIndex = index;
    
    
    
}


const showSection = (sectionId) => {
    document.getElementById("home").style.display = "none";
    document.getElementById("info").style.display = "none";
    // Affiche la section sélectionnée
    document.getElementById(sectionId).style.display = "block";
};
