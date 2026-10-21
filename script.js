const produits = [

    { nom: "Sac Teri", prix: 10000, image: "Images/sac-teri.jpg"  },

    { nom: "Sac Rowan", prix: 11000, image: "Images/sac-rowan.jpg"  },

    {

    nom: "Lunettes Chrome heart",

    prix: 5500,

    image: "Images/lunettes-chrome.jpg",

    images: [

        "Images/lunette-chrome/chrome-1.jpg",

        "Images/lunette-chrome/chrome-2.jpg",

        "Images/lunette-chrome/chrome-3.jpg",

        "Images/lunette-chrome/chrome-4.jpg"

    ],

    couleurs: ["Noire-argent", "Noire-Or", "Tranaparent-argent","Transparent-Or"]

},

    { nom: "Tote bag", prix: 4000, image: "Images/tote-bag.jpg"  },

    {

    nom: "Gloss Rhode",

    prix: 1500,

    image: "Images/gloss-rhode.jpg",

    images: [

        "Images/gloss-rhode/rhode-1.jpg",

        "Images/gloss-rhode/rhode-2.jpg",

        "Images/gloss-rhode/rhode-3.jpg",

        "Images/gloss-rhode/rhode-4.jpg"

    ],

    couleurs: ["Rose", "Nude", "Rouge"]

},

   {

    nom: "Gloss Kiko",

    prix: 3500,

    image: "Images/gloss-kiko.jpg",

    images: [

        "Images/gloss-kiko/kiko-1.jpg",

        "Images/gloss-kiko/kiko-2.jpg",

        "Images/gloss-kiko/kiko-3.jpg",

        "Images/gloss-kiko/kiko-4.jpg",

        "Images/gloss-kiko/kiko-5.jpg",

        "Images/gloss-kiko/kiko-6.jpg",

        "Images/gloss-kiko/kiko-7.jpg",

        "Images/gloss-kiko/kiko-8.jpg"

    ],

    couleurs: ["# 21", "# 32", "# 04", "# 05", "# 35","# 27","# 02","# 01"]

},

    { nom: "Gloss Gisou", 

        prix: 3000, 
        
        image: "Images/gloss-gisou.jpg",

         images: [

        "Images/gloss-gisous/gisou-2.jpg",

        "Images/gloss-gisous/gisou-1.jpg",

        "Images/gloss-gisous/gisou-3.jpg",

        "Images/gloss-gisous/gisou-4.jpg",

        "Images/gloss-gisous/gisou-5.jpg",

        "Images/gloss-gisous/gisou-6.jpg",

        "Images/gloss-gisous/gisou-7.jpg",

        "Images/gloss-gisous/gisou-8.jpg"

    ],

    couleurs: ["Rasberry", "Coconut", "watermelon", "strawbwerry", "honey"]

},

    { nom: "Summer friday", 

        prix: 2000, 
        
        image: "Images/gloss-summer-vibe.jpg",
    
     images: [

        "Images/gloss-summer-vibe/summer-vibe-1.jpg",

        "Images/gloss-summer-vibe/summer-vibe-2.jpg",

        "Images/gloss-summer-vibe/summer-vibe-3.jpg",

        "Images/gloss-summer-vibe/summer-vibe-4.jpg",

        "Images/gloss-summer-vibe/summer-vibe-5.jpg",

        "Images/gloss-summer-vibe/summer-vibe-6.jpg",

        "Images/gloss-summer-vibe/summer-vibe-7.jpg"

    ],

    couleurs: ["Rose", "vert", "orange", "Rouge"]

    },

    { nom: "Mascara", prix: 4500, image: "Images/mascara.jpg" },

    { nom: "Eye-liner", prix: 4000, image: "Images/eye-liner.jpg" },

    { nom: "Crayon à lèvres", prix: 1000, image: "Images/crayon-levres.jpg" }

];
const listeProduits = document.getElementById("liste-produits");

listeProduits.innerHTML = "";

produits.forEach((produit, index) => {

    const carte = document.createElement("div");

    carte.className = "carte-produit";

    const photos = produit.images || (produit.image ? [produit.image] : []);

    carte.innerHTML = `

        <div class="galerie-produit">

            <img class="photo-produit" src="${photos[0] || ""}" alt="${produit.nom}">

            ${photos.length > 1 ? `

                <button class="photo-precedente" type="button">‹</button>

                <button class="photo-suivante" type="button">›</button>

            ` : ""}

        </div>

        <h3>${produit.nom}</h3>

        <p>${produit.prix.toLocaleString("fr-FR")} FCFA</p>

        <button class="ouvrir-produit" type="button">Voir les couleurs</button>

        <div class="choix-couleurs" hidden></div>

        <button class="ajouter-produit" type="button">Ajouter au panier</button>

    `;

    const boutonCouleurs = carte.querySelector(".ouvrir-produit");
    const zoneCouleurs = carte.querySelector(".choix-couleurs");

    if (produit.couleurs) {
        boutonCouleurs.addEventListener("click", () => {
            zoneCouleurs.hidden = !zoneCouleurs.hidden;

            if (!zoneCouleurs.dataset.cree) {

    produit.couleurs.forEach(couleur => {

        const ligne = document.createElement("div");

        ligne.className = "ligne-couleur";

        const nomCouleur = document.createElement("span");

        nomCouleur.textContent = couleur;

        const boutonPlus = document.createElement("button");

        boutonPlus.textContent = "+";

        boutonPlus.type = "button";

        boutonPlus.setAttribute(

            "aria-label",

            "Ajouter le Gloss Rhode couleur " + couleur + " au panier"

        );

        boutonPlus.addEventListener("click", () => {

            ajouterAuPanier(produit, couleur);

        });

        ligne.appendChild(nomCouleur);

        ligne.appendChild(boutonPlus);

        zoneCouleurs.appendChild(ligne);

    });

    zoneCouleurs.dataset.cree = "oui";

}
        });
    } else {
        boutonCouleurs.hidden = true;
    }

    let photoActuelle = 0;

    const image = carte.querySelector(".photo-produit");

    const precedente = carte.querySelector(".photo-precedente");

    const suivante = carte.querySelector(".photo-suivante");

    if (precedente && suivante) {

        precedente.addEventListener("click", () => {

            photoActuelle = (photoActuelle - 1 + photos.length) % photos.length;

            image.src = photos[photoActuelle];

        });

        suivante.addEventListener("click", () => {

            photoActuelle = (photoActuelle + 1) % photos.length;

            image.src = photos[photoActuelle];

        });

    }

    listeProduits.appendChild(carte);

});
let panier = [];

function ajouterAuPanier(produit, couleur = "") {

    const article = panier.find(p =>

        p.nom === produit.nom && p.couleur === couleur

    );

    if (article) {

        article.quantite++;

    } else {

        panier.push({

            ...produit,

            couleur: couleur,

            quantite: 1

        });

    }

    afficherPanier();

}

const boutons = document.querySelectorAll(".ajouter-produit");
boutons.forEach((bouton, index) => {


    bouton.addEventListener("click", () => {

        const produit = produits[index];

        const article = panier.find(p => p.nom === produit.nom);

        if (article) {

            article.quantite++;

        } else {

            panier.push({ ...produit, quantite: 1 });

        }

        afficherPanier();

    });

});

function afficherPanier() {

    const listePanier = document.getElementById("liste-panier");

    const totalPanier = document.getElementById("total-panier");

    listePanier.innerHTML = "";

    let total = 0;

    if (panier.length === 0) {

        listePanier.innerHTML = "<p>Ton panier est vide.</p>";

    }

    panier.forEach((produit, index) => {

        total += produit.prix * produit.quantite;

        const ligne = document.createElement("div");

        ligne.style.marginBottom = "15px";

        const nom = document.createElement("p");

        nom.textContent = `${produit.nom}${produit.couleur ? " - Couleur : " + produit.couleur : ""} — ${produit.prix.toLocaleString("fr-FR")} FCFA`;

        const moins = document.createElement("button");

        moins.textContent = "−";

        moins.addEventListener("click", () => {

            produit.quantite--;

            if (produit.quantite <= 0) {

                panier.splice(index, 1);

            }

            afficherPanier();

        });

        const quantite = document.createElement("span");

                quantite.textContent = produit.quantite;

        quantite.style.margin = "0 10px";

        const plus = document.createElement("button");

        plus.textContent = "+";

        plus.addEventListener("click", () => {

            produit.quantite++;

            afficherPanier();

        });

        ligne.appendChild(nom);

        ligne.appendChild(moins);

        ligne.appendChild(quantite);

        ligne.appendChild(plus);

        listePanier.appendChild(ligne);

    });

    totalPanier.textContent = total.toLocaleString("fr-FR");

}

let villeSelectionnee = "";

document.querySelectorAll(".bouton-ville").forEach(bouton => {

    bouton.addEventListener("click", () => {

        villeSelectionnee = bouton.dataset.ville;

        document.getElementById("ville-choisie").textContent =

            "Ville choisie : " + villeSelectionnee;

        document.querySelectorAll(".bouton-ville").forEach(b => {

            b.style.backgroundColor = "#572B43";

        });

        bouton.style.backgroundColor = "#B77C89";

    });

});

const boutonCommander = document.getElementById("commander-whatsapp");

const formulaireCommande = document.getElementById("formulaire-commande");

boutonCommander.addEventListener("click", () => {

    formulaireCommande.hidden = false;

    formulaireCommande.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

});

const formulaireClient = document.getElementById("formulaire-client");

formulaireClient.addEventListener("submit", (event) => {
    event.preventDefault();

    if (panier.length === 0) {
        alert("Ton panier est vide !");
        return;
    }

    const nom = document.getElementById("nom-client").value.trim();
    const telephone = document.getElementById("telephone-client").value.trim();
    const quartier = document.getElementById("quartier-client").value.trim();
    const ville = document.getElementById("ville-client").value;
    const mode = document.getElementById("mode-reception").value;
    let total = 0;

    const details = panier.map(produit => {
        const sousTotal = produit.prix * produit.quantite;
        total += sousTotal;
        const couleur = produit.couleur ? ` (Couleur : ${produit.couleur})` : "";
        return `- ${produit.nom}${couleur} x ${produit.quantite} = ${sousTotal.toLocaleString("fr-FR")} FCFA`;
    }).join("\n");

    const message = `Bonjour ElsyShop  

Je souhaite passer une commande.

 Nom : ${nom}
 Téléphone : ${telephone}
 Quartier : ${quartier}
 Ville : ${ville}
 Réception : ${mode}

 Ma commande :
${details}

 Total des produits : ${total.toLocaleString("fr-FR")} FCFA

Merci `;

    const numeroBoutique = "237699476492";
    const url = `https://wa.me/${numeroBoutique}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
});