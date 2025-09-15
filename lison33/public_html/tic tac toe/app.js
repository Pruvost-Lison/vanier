let cases = document.querySelectorAll(".case");
let replaybtn = document.querySelector("#replay");
let panneauMessage = document.querySelector("#message");

// Variables pour le score
let scoreX = 0;
let scoreO = 0;
let scoreXElement = document.querySelector("#scoreX");
let scoreOElement = document.querySelector("#scoreO");

// Variables du jeu
let joueurX = true;
const patrons = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

// Événements de clic
for (let boite of cases) {
    boite.active = true;
    boite.addEventListener("click", function () {
        if (boite.active) { 
            if (joueurX) {
                boite.style.backgroundImage = "url('assets/img/SVG/nigizushi.svg')";
                boite.style.backgroundSize = "90%"; 
            } else {
                boite.style.backgroundImage = "url('assets/img/SVG/Maki_gauche.svg')";
                boite.style.backgroundSize = "80%";
            }
            boite.style.backgroundRepeat = "no-repeat";
            boite.style.backgroundPosition = "center";
            boite.active = false;
            joueurX = !joueurX;
            
            valide();
        }
    });
}

// Validation du jeu
function valide() {
    // Vérifier victoire
    for (let patron of patrons) {
        let val1 = cases[patron[0]].style.backgroundImage;
        let val2 = cases[patron[1]].style.backgroundImage;
        let val3 = cases[patron[2]].style.backgroundImage;

        if (val1 && val1 !== "" && val1 === val2 && val1 === val3) {
            let gagnant = val1.includes('nigizushi.svg') ? 'X' : 'O';
            
            // Ajouter point
            if (gagnant === 'X') {
                scoreX++;
                scoreXElement.textContent = scoreX;
            } else {
                scoreO++;
                scoreOElement.textContent = scoreO;
            }
            
            panneauMessage.innerText = `Manche gagnée par joueur ${gagnant}`;
            
            // Verifier l'état de la partie (3 manches)
            if (scoreX === 3 || scoreO === 3) {
                setTimeout(() => afficherPopupVictoire(gagnant), 1500);
            } else {
                // Prochaine manche dans 2 secondes
                setTimeout(viderPlateau, 2000);
            }
            
            // Désactiver cases
            for (let boite of cases) {
                boite.active = false;
            }
            return;
        }
    }
    
    // Vérifier match nul
    let casesRemplies = 0;
    for (let boite of cases) {
        if (boite.style.backgroundImage !== "") {
            casesRemplies++;
        }
    }
    
    if (casesRemplies === 9) {
        panneauMessage.innerText = "Match nul !";
        setTimeout(viderPlateau, 2000);
    }
}

// Vider le plateau pour la manche suivante
function viderPlateau() {
    for (let boite of cases) {
        boite.active = true;
        boite.style.backgroundImage = "";
    }
    joueurX = true;
    panneauMessage.innerText = "";
}

// Popup de victoire finale
function afficherPopupVictoire(gagnant) {
    let imageSrc = gagnant === 'X' ? 'assets/img/SVG/nigizushi.svg' : 'assets/img/SVG/Maki_gauche.svg';
    
    document.body.insertAdjacentHTML('beforeend', `
        <div class="popup" id="victoire-popup">
            <div class="popup-content">
                <img src="${imageSrc}" alt="Gagnant">
                <h2>JOUEUR ${gagnant} L'EMPORTE</h2>
                <h1>Duel gagné !</h1>
                <p>Joueur ${gagnant} a tout mangé<br>Le plat est vide...</p>
                <button class="popup-button" onclick="nouvellePartie()">REJOUER</button>
            </div>
        </div>
    `);
    
    document.getElementById('victoire-popup').style.display = 'block';
}

// Nouvelle partie
function nouvellePartie() {
    document.getElementById('victoire-popup').remove();
    scoreX = 0;
    scoreO = 0;
    scoreXElement.textContent = "0";
    scoreOElement.textContent = "0";
    viderPlateau();
}

// Bouton rejouer (manche suivante)
replaybtn.addEventListener("click", viderPlateau);