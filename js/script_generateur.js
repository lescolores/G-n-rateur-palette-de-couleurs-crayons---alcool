const floatingMenu = document.querySelector('.menu-float');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 120) {
            floatingMenu.classList.add('is-visible');
        }
        else {
            floatingMenu.classList.remove('is-visible');
        }
    });

const PalettePrincipale = document.getElementById('palette-principale-couleurs');
const PalettesSecondaires = document.getElementById('palette-secondaire');

// Dico de couleurs
const DicoCouleurs = { // Banque de couleurs Ohuhu et l'équivalent HEX
  "VP902": "#FF0000",
  "Y1": "#00FF00",
  "Y76": "#0000FF",
  "VR108": "#FFFF00",
  "B103": "#800080",
  "O86": "#d18024",
  "YR579": "#3d9477"
};
console.log(DicoCouleurs["VP902"]); // Équivalent à l'appel de fonction

// Fonction pour choisir random de couleurs
function getRandomCouleursDansDico(n) {
  const names = Object.keys(DicoCouleurs); // Dictionnaire = object, keys (équivalent à name) = "VP902", valeur "#FF000"
  
  for (let i = names.length - 1; i > 0; i--) { // Boucle qui permet de ne pas avoir 2x la même couleurs par palette
    const j = Math.floor(Math.random() * (i + 1));
    [names[i], names[j]] = [names[j], names[i]];
  }

  return names.slice(0, n).map(name => ({ name: name, code: DicoCouleurs[name] }));
}

// Fonction pour styliser le texte afficher sur les couleurs
function styletextePaletteprincipale(randomColor) {
    const nameElem = document.createElement('span');

    nameElem.textContent = randomColor.name ; // Affiche la variable voulue, le nom de la couleur ex : VP902
    nameElem.style.color = '#ffffff';
    nameElem.style.fontWeight = 'bold';
    nameElem.style.fontSize = '1.5em';
    nameElem.style.textShadow = '1px 1px 2px #0008';
    nameElem.style.fontFamily = 'Sans-serif'
    return nameElem
}

// Fonction pour mettre 5 couleurs de large
function generateColonnesCouleurs(n) {
    return getRandomCouleursDansDico(n); 
}

function PalettesDeCouleurs(Palette, nbPalettesSecondaires) {
    Palette.innerHTML = ''; 

    for (let i = 0; i < nbPalettesSecondaires; i++) {
        // On génère 5 couleurs à chaque tour de boucle
        const colors = generateColonnesCouleurs(5); 

        colors.forEach(color => {
            const box = document.createElement('div');
            box.className = 'colonnes-palettes';
            box.style.backgroundColor = color.code;
            
            // Correction ici : On ajoute le span stylisé au lieu d'écraser avec .textContent
            const nameElem = styletextePaletteprincipale(color);
            box.appendChild(nameElem);
            
            Palette.appendChild(box);
        });
    }
}

// Harmonies de couleurs
const Dicoharmonies = { // Banque des harmonies
  "aleatoire": "Aléatoire",
  "analogue": "Analogue",
  "monochrome": "Monochrome",
  "triade": "Triade",
  "complementaire": "Complémentaire",
  "complementaire-adjacent": "Complémentaire adjacent",
  "tetrade": "Tétrade",
  "carre": "Carré"
};

// window.onload dit que chaque fois que la page load, on appelle une fonction
window.onload = function() {
    PalettesDeCouleurs(PalettePrincipale, 1)
    PalettesDeCouleurs(PalettesSecondaires, 3)
    const dropdown = document.getElementById('harmonies-couleurs');
        Object.entries(Dicoharmonies).forEach(([value, text]) => {
        const option = document.createElement('option');
        option.value = value;
        option.text = text;
        dropdown.appendChild(option);
        });
}

// Bouton nombre de couleurs
const btnMinus = document.querySelector('.btn-minus'); // Permet de faire -1
const btnPlus = document.querySelector('.btn-plus'); // Permet de faire +1
const valueDisplay = document.querySelector('.number-value'); // Affiche le nombre actuel

const min = parseInt(valueDisplay.getAttribute('data-min')); // Mets un minimum
const max = parseInt(valueDisplay.getAttribute('data-max')); // Mets un max

btnPlus.addEventListener('click', () => {
    let current = parseInt(valueDisplay.textContent);
    if (current < max) {
        valueDisplay.textContent = current + 1;
    }
});

btnMinus.addEventListener('click', () => {
    let current = parseInt(valueDisplay.textContent);
    if (current > min) {
        valueDisplay.textContent = current - 1;
    }
});

// Bouton harmonies de couleurs
document.getElementById('harmonies-couleurs').addEventListener('change', function() {
  alert('Ok ça a changé grosse bitch ' + this.value);
});

// Bouton new palette
document.getElementById('bouton-generer').addEventListener('click', function() {
  location.reload();
});

// Bouton new palette scroll
document.getElementById('bouton-generer-scroll').addEventListener('click', function() {
  location.reload();
});