const prenom = document.getElementById("pre");
const nom = document.getElementById("nom");
const date = document.getElementById("date");
const email = document.getElementById("email");
const list = document.getElementById("list");
let editingIndex = null;
let tabPersonnes = [];

/**
 * Validation de l'email
 */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Validation de la date de naissance (ne doit pas être dans le futur)
 */
const isValidDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate <= today;
};

/**
 * Validation des champs nom et prénom (lettres uniquement)
 */
const isValidName = (name) => /^[a-zA-Z]+$/.test(name);

/**
 * Récupère et retourne les valeurs des champs de formulaire.
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
 * Génère un email basé sur le prénom, nom, et date de naissance.
 */
const generer = () => {
    const { nomValue, prenomValue, dateValue } = getFormValues();
    if (nomValue && prenomValue && dateValue) {
        if (!isValidName(nomValue) || !isValidName(prenomValue)) {
            alert("Le prénom et le nom doivent contenir uniquement des lettres.");
            return;
        }
        if (!isValidDate(dateValue)) {
            alert("La date de naissance ne peut pas être dans le futur.");
            return;
        }
        const emailValue = prenomValue[0] + nomValue + dateValue.split("-")[0] + "@sonatel.com";
        email.value = emailValue.toLowerCase();
    } else {
        alert("Veuillez remplir tous les champs.");
    }
};

/**
 * Enregistre une personne dans le tableau `tabPersonnes` si tous les champs sont remplis et valides.
 */
const enregistrer = () => {
    const { nomValue, prenomValue, dateValue, emailValue } = getFormValues();

    if (nomValue && prenomValue && dateValue && emailValue) {
        if (!isValidName(nomValue) || !isValidName(prenomValue)) {
            alert("Le prénom et le nom doivent contenir uniquement des lettres.");
            return;
        }
        if (!isValidDate(dateValue)) {
            alert("La date de naissance ne peut pas être dans le futur.");
            return;
        }
        if (!isValidEmail(emailValue)) {
            alert("Veuillez entrer un email valide.");
            return;
        }

        const personnes = { prenom: prenomValue, nom: nomValue, date: dateValue, email: emailValue };

        // Utilisation de map pour créer une nouvelle version du tableau modifié
        if (editingIndex !== null) {
            tabPersonnes = tabPersonnes.map((personne, index) =>
                index === editingIndex ? personnes : personne
            );
            editingIndex = null;
        } else {
            tabPersonnes = [...tabPersonnes, personnes]; // Ajout de la personne avec spread operator
        }

        console.table(tabPersonnes);
        viderChamps();
        ajoutPerso();
    } else {
        alert("Tous les champs sont obligatoires.");
    }
};


/**
 * Vide tous les champs du formulaire.
 */
const viderChamps = () => {
    prenom.value = "";
    nom.value = "";
    date.value = "";
    email.value = "";
};

/**
 * Met à jour l'affichage de la liste des personnes enregistrées.
 */
const ajoutPerso = () => {
    list.innerHTML = tabPersonnes
        .map((element, i) => `
            <tr>
                <td class="text-center">${i + 1}</td>
                <td class="text-center">${element.prenom}</td>
                <td class="text-center">${element.nom}</td>
                <td class="text-center">${element.date}</td>
                <td class="text-center">${element.email}</td>
                <td width="20%" class="text-center">
                    <button onclick="supprimerPerso('${i}')" class="btn btn-outline-danger btn-sm">✂</button>
                    <button onclick="modifPerso('${i}')" class="btn btn-outline-info btn-sm">✏</button>
                </td>
            </tr>
        `)
        .join(""); // Utilisation de join pour transformer le tableau en chaîne
};


/**
 * Supprime une personne du tableau `tabPersonnes` à l'index donné.
 */
const supprimerPerso = (position) => {
    if (confirm("Voulez-vous supprimer cette personne ?")) {
        tabPersonnes.splice(position, 1);
        ajoutPerso();
    }
};

/**
 * Prépare le formulaire pour modifier une personne.
 */
const modifPerso = (index) => {
    const p = tabPersonnes[index];
    prenom.value = p.prenom;
    nom.value = p.nom;
    date.value = p.date;
    email.value = p.email;
    editingIndex = index;
};

/**
 * Affiche la section sélectionnée et cache les autres.
 */
const showSection = (sectionId) => {
    document.getElementById("home").style.display = "none";
    document.getElementById("info").style.display = "none";
    document.getElementById(sectionId).style.display = "block";
};
