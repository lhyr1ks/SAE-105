const container = document.querySelector("#saeContainer");
const detailsContainer = document.querySelector("#detailsContainer");
const overlay = document.querySelector("#overlay");

// Créer un objet pour regrouper les SAE par semestre
const saeBySemester = {};

// Regroupe les SAE par semestre
Object.keys(SAE).forEach((saeKey) => {
  const sae = SAE[saeKey];
  const semestre = sae.semestre;

  // Si le semestre n'existe pas encore, on le crée
  if (!saeBySemester[semestre]) {
    saeBySemester[semestre] = [];
  }
  saeBySemester[semestre].push({ saeKey, sae });
});

// Génération des cartes par semestre
Object.keys(saeBySemester).forEach((semestre) => {
  let saeCount = 1;
  saeBySemester[semestre].forEach(({ saeKey, sae }) => {
    const card = document.createElement("div");
    card.classList.add("sae-card");

    // Créer le lien SAE avec le bon format
    const saeTitle = `SAE ${semestre}${String(saeCount).padStart(2, "0")}`;
    
    card.innerHTML = `
      <h2>${saeTitle}</h2>
      <p><strong>Semestre :</strong> ${sae.semestre}</p>
      <p><strong>Compétences :</strong> ${sae.compétences.join(", ")}</p>
    `;

    card.addEventListener("click", () => {
      showDetails(saeKey); // Afficher les détails pour cette SAE
    });

    container.appendChild(card);
    saeCount++;
  });
});

// Fonction pour afficher les détails d'une SAE
function showDetails(saeKey) {
  const sae = SAE[saeKey];

  // Ajouter un lien pour télécharger le PDF spécifique
  detailsContainer.innerHTML = `
    <h2>${sae.titre}</h2>
    <p><strong>Description :</strong> ${sae.description}</p>
    <p><strong>Compétences :</strong> ${sae.compétences.join(", ")}</p>
    <p><strong>Activités clés :</strong></p>
    <ul>
      ${Object.keys(sae.AC).map(acKey => `<li>${sae.AC[acKey]}</li>`).join("")}
    </ul>
    <p><strong>Ressources :</strong></p>
    <ul>
      ${Object.keys(sae.ressources).map(resKey => `<li>${resKey}: ${sae.ressources[resKey]}</li>`).join("")}
    </ul>

    <!-- Ajouter un bouton pour télécharger le PDF spécifique -->
    <a href="pdf/${sae}.pdf" id="downloadPdf" download>Download PDF</a>
    
    <button id="backButton">Retour</button>
  `;
  console.log(SAE);

  // Afficher les détails et l'overlay
  detailsContainer.style.display = "block";
  overlay.style.display = "block";

  // Gestion du bouton "Retour"
  document.querySelector("#backButton").addEventListener("click", hideDetails);
}

// Fonction pour masquer les détails
function hideDetails() {
  detailsContainer.style.display = "none";
  overlay.style.display = "none";
}
