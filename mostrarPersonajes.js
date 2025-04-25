document.addEventListener("DOMContentLoaded", () => {
    const characterListDiv = document.getElementById("character-list");
    const banderinSection = document.querySelector(".containerBanderin");
    const characters = JSON.parse(localStorage.getItem("dndCharacters") || "[]");

    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    document.body.appendChild(modalContainer);

    if (characters.length === 0) {
        characterListDiv.innerHTML = "<p>No hay personajes guardados.</p>";
        return;
    }

    characters.forEach(character => {
        const { name, race, class: charClass, gender } = character.basicInfo;
        const { strength } = character.stats;

        const charCard = document.createElement("div");
        charCard.classList.add("char-card");
        charCard.dataset.characterId = character.id;
        charCard.innerHTML = `
            <h3>${name || "Sin nombre"}</h3>
            <p><strong>Raza:</strong> ${race || "Desconocida"}</p>
            <p><strong>Clase:</strong> ${charClass || "Desconocida"}</p>
            <p><strong>Género:</strong> ${gender || "No especificado"}</p>
            <p><strong>Fuerza:</strong> ${strength ?? 'N/A'}</p>
        `;
        characterListDiv.appendChild(charCard);

        const banderinDiv = document.createElement("div");
        banderinDiv.classList.add("banderin-wrapper");
        banderinDiv.dataset.characterId = character.id;
        banderinDiv.innerHTML = `
            <img class="banderin" src="storage/img/banderinpagina4.png">
        `;

        // Abre el modal con los detalles del personaje
        banderinDiv.addEventListener("click", () => showCharacterModal(character));
        charCard.addEventListener("click", () => showCharacterModal(character));

        // Inserta cada nuevo banderín al inicio de la sección (orden inverso)
        banderinSection.insertBefore(banderinDiv, banderinSection.firstChild);
    });
});

function showCharacterModal(character) {
    const modalContainer = document.querySelector(".modal-container");

    // Transforma la lista de habilidades en elementos <li>
    const abilitiesList = character.abilities.map(ability => 
        `<li><strong>${ability.name}</strong> (${ability.class}): ${ability.description}</li>`
    ).join('');

    modalContainer.innerHTML = `
        <div class="character-modal">
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <h2>${character.basicInfo.name}</h2>
                <div class="modal-section">
                    <h3>Información Básica</h3>
                    <p><strong>Raza:</strong> ${character.basicInfo.race}</p>
                    <p><strong>Clase:</strong> ${character.basicInfo.class}</p>
                    <p><strong>Género:</strong> ${character.basicInfo.gender}</p>
                </div>
                <div class="modal-section">
                    <h3>Estadísticas</h3>
                    <div class="stats-grid">
                        <div class="stat-item"><strong>Fuerza:</strong> ${character.stats.strength}</div>
                        <div class="stat-item"><strong>Destreza:</strong> ${character.stats.dexterity}</div>
                        <div class="stat-item"><strong>Constitución:</strong> ${character.stats.constitution}</div>
                        <div class="stat-item"><strong>Inteligencia:</strong> ${character.stats.intelligence}</div>
                        <div class="stat-item"><strong>Sabiduría:</strong> ${character.stats.wisdom}</div>
                        <div class="stat-item"><strong>Carisma:</strong> ${character.stats.charisma}</div>
                    </div>
                </div>
                <div class="modal-section">
                    <h3>Apariencia</h3>
                    <p><strong>Color de pelo:</strong> ${character.appearance.hairColor}</p>
                    <p><strong>Color de ojos:</strong> ${character.appearance.eyeColor}</p>
                    <p><strong>Altura:</strong> ${character.appearance.height}</p>
                    <p><strong>Peso:</strong> ${character.appearance.weight}</p>
                </div>
                <div class="modal-section">
                    <h3>Equipamiento</h3>
                    <p><strong>Arma:</strong> ${character.equipment.weapon}</p>
                    <p><strong>Armadura:</strong> ${character.equipment.armor}</p>
                    <p><strong>Accesorio:</strong> ${character.equipment.accessory}</p>
                </div>
                <div class="modal-section">
                    <h3>Habilidades</h3>
                    <ul class="abilities-list">
                        ${abilitiesList}
                    </ul>
                </div>
                <div class="modal-actions">
                    <button class="edit-button" data-id="${character.id}">Editar</button>
                    <button class="delete-button" data-id="${character.id}">Borrar</button>
                </div>
            </div>
        </div>
    `;

    modalContainer.style.display = "flex";

    // Cierre del modal con la X
    modalContainer.querySelector(".close-button").addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    // Cierre del modal al hacer clic fuera del contenido
    modalContainer.addEventListener("click", (event) => {
        if (event.target === modalContainer) {
            modalContainer.style.display = "none";
        }
    });

    // Elimina el personaje del almacenamiento y recarga la vista
    modalContainer.querySelector(".delete-button").addEventListener("click", () => {
        if (confirm("¿Estás seguro que deseas eliminar este personaje?")) {
            deleteCharacter(character.id);
            modalContainer.style.display = "none";
            location.reload();
        }
    });

    // Guarda el ID para edición y redirige a la página de edición
    modalContainer.querySelector(".edit-button").addEventListener("click", () => {
        localStorage.setItem("editCharacterId", character.id);
        window.location.href = "crearPersonaje.html";
    });
}

// Eliminar un personaje del localStorage con su ID
function deleteCharacter(characterId) {
    let characters = JSON.parse(localStorage.getItem("dndCharacters") || "[]");
    characters = characters.filter(char => char.id !== characterId);
    localStorage.setItem("dndCharacters", JSON.stringify(characters));
}
