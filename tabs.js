document.addEventListener("DOMContentLoaded", function () {
    let character = {
        basicInfo: {
            name: "",
            race: "",
            class: "",
            gender: ""
        },
        stats: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10
        },
        equipment: {
            weapon: "",
            armor: "",
            accessory: ""
        },
        abilities: [],
        appearance: {
            hairColor: "",
            eyeColor: "",
            height: "",
            weight: ""
        }
    };


    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    //cambiar de pestaña en el menu de creqcion de personajes
    function switchTab(tabId) {
        saveCurrentTabData();

        // ocultar la pestaña activa al cambiar a otrs
        tabContents.forEach(content => {
            content.classList.remove("active");
        });

        tabButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Mostrar la pestaña seleccionada 
        document.getElementById(`${tabId}-tab`).classList.add("active");
        document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");

        updateTabDisplay(tabId);
    }

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            const tabId = this.getAttribute("data-tab");
            switchTab(tabId);
        });
    });

    // Al cambiar de pestaña guarda los datos de la pestaña anterior 
    function saveCurrentTabData() {
        // Mirar que pestaña se encuentra activa en el menu
        const activeTab = document.querySelector(".tab-content.active");
        if (!activeTab) return;

        const tabId = activeTab.id.replace("-tab", "");

        switch (tabId) {
            case "basic":
                character.basicInfo.name = document.getElementById("name").value || "";
                character.basicInfo.race = document.getElementById("race").value || "";
                character.basicInfo.class = document.getElementById("class").value || "";
                character.basicInfo.gender = document.getElementById("gender").value || "";
                break;

            case "stats":
                character.stats.strength = parseInt(document.getElementById("strength").value) || 10;
                character.stats.dexterity = parseInt(document.getElementById("dexterity").value) || 10;
                character.stats.constitution = parseInt(document.getElementById("constitution").value) || 10;
                character.stats.intelligence = parseInt(document.getElementById("intelligence").value) || 10;
                character.stats.wisdom = parseInt(document.getElementById("wisdom").value) || 10;
                character.stats.charisma = parseInt(document.getElementById("charisma").value) || 10;
                break;

            case "equipment":
                character.equipment.weapon = document.getElementById("weapon").value || "";
                character.equipment.armor = document.getElementById("armor").value || "";
                character.equipment.accessory = document.getElementById("accessory").value || "";
                break;

            case "abilities":
                const abilityCheckboxes = document.querySelectorAll("#abilities-list input[type='checkbox']:checked");
                character.abilities = [];
                abilityCheckboxes.forEach(checkbox => {
                    const abilityName = checkbox.getAttribute("data-ability");
                    const abilityDescription = checkbox.closest(".ability-item").querySelector("p").textContent;
                    const abilityClass = checkbox.closest(".ability-item").querySelector(".ability-class").textContent;

                    character.abilities.push({
                        name: abilityName,
                        description: abilityDescription,
                        class: abilityClass
                    });
                });
                break;

            case "appearance":
                character.appearance.hairColor = document.getElementById("hairColor").value || "";
                character.appearance.eyeColor = document.getElementById("eyeColor").value || "";
                character.appearance.height = document.getElementById("height").value || "";
                character.appearance.weight = document.getElementById("weight").value || "";
                break;
        }

        localStorage.setItem("currentCharacter", JSON.stringify(character));

        updatePreview();
    }

    // Aqui podemos volver a la pestaña y se quedan las ultimas selecciones escogidas 
    function updateTabDisplay(tabId) {
        switch (tabId) {
            case "basic":
                document.getElementById("name").value = character.basicInfo.name;
                if (character.basicInfo.race) document.getElementById("race").value = character.basicInfo.race;
                if (character.basicInfo.class) document.getElementById("class").value = character.basicInfo.class;
                if (character.basicInfo.gender) document.getElementById("gender").value = character.basicInfo.gender;
                break;

            case "stats":
                document.getElementById("strength").value = character.stats.strength;
                document.getElementById("strength-value").textContent = character.stats.strength;

                document.getElementById("dexterity").value = character.stats.dexterity;
                document.getElementById("dexterity-value").textContent = character.stats.dexterity;

                document.getElementById("constitution").value = character.stats.constitution;
                document.getElementById("constitution-value").textContent = character.stats.constitution;

                document.getElementById("intelligence").value = character.stats.intelligence;
                document.getElementById("intelligence-value").textContent = character.stats.intelligence;

                document.getElementById("wisdom").value = character.stats.wisdom;
                document.getElementById("wisdom-value").textContent = character.stats.wisdom;

                document.getElementById("charisma").value = character.stats.charisma;
                document.getElementById("charisma-value").textContent = character.stats.charisma;
                break;

            case "equipment":
                if (character.equipment.weapon) document.getElementById("weapon").value = character.equipment.weapon;
                if (character.equipment.armor) document.getElementById("armor").value = character.equipment.armor;
                if (character.equipment.accessory) document.getElementById("accessory").value = character.equipment.accessory;
                break;

            case "abilities":
                document.querySelectorAll("#abilities-list input[type='checkbox']").forEach(checkbox => {
                    const abilityName = checkbox.getAttribute("data-ability");
                    checkbox.checked = character.abilities.some(ability => ability.name === abilityName);
                });
                break;

            case "appearance":
                document.getElementById("hairColor").value = character.appearance.hairColor;
                document.getElementById("eyeColor").value = character.appearance.eyeColor;
                document.getElementById("height").value = character.appearance.height;
                document.getElementById("weight").value = character.appearance.weight;
                break;
        }
    }

    // Función para actualizar la vista previa del personaje
    function updatePreview() {
        const previewName = document.getElementById("preview-name");
        const previewRaceClass = document.getElementById("preview-race-class");
        const previewPhysical = document.getElementById("preview-physical");

        if (previewName) previewName.textContent = character.basicInfo.name || "Unnamed Character";

        if (previewRaceClass) {
            let raceClass = "";
            if (character.basicInfo.race) raceClass += character.basicInfo.race;
            if (character.basicInfo.race && character.basicInfo.class) raceClass += " ";
            if (character.basicInfo.class) raceClass += character.basicInfo.class;
            previewRaceClass.textContent = raceClass;
        }

        if (previewPhysical) {
            let physical = "";
            if (character.appearance.height) physical += character.appearance.height;
            if (character.appearance.height && character.appearance.weight) physical += ", ";
            if (character.appearance.weight) physical += character.appearance.weight;
            previewPhysical.textContent = physical;
        }
    }

    // Función para guardar el personaje completo
    function saveCharacter() {
 
        saveCurrentTabData();


        if (!character.basicInfo.name) {
            alert("Por favor, introduce un nombre para tu personaje");
            return;
        }

        // Generar ID único 
        if (!character.id) {
            character.id = Date.now().toString();
        }

        // Obtener personajes guardados
        const savedCharacters = JSON.parse(localStorage.getItem("dndCharacters") || "[]");

        // Comprobar si ya existe este personaje
        const existingIndex = savedCharacters.findIndex(char => char.id === character.id);

        if (existingIndex >= 0) {
            // Actualizar personaje existente
            savedCharacters[existingIndex] = character;
        } else {
            // Añadir nuevo personaje
            savedCharacters.push(character);
        }

        localStorage.setItem("dndCharacters", JSON.stringify(savedCharacters));


        alert("¡Personaje guardado con éxito!");
    }

    // Actualizar el valor de los stats al mover el slider
    document.querySelectorAll(".stat-slider").forEach(slider => {
        slider.addEventListener("input", function () {
            const statName = this.id;
            const valueDisplay = document.getElementById(`${statName}-value`);
            if (valueDisplay) {
                valueDisplay.textContent = this.value;
            }
        });     
    });

    // Cargar personaje guardado si existe
    const savedCharacter = localStorage.getItem("currentCharacter");
    if (savedCharacter) {
        try {
            character = JSON.parse(savedCharacter);
            // Actualizar la pestaña actual
            const activeTab = document.querySelector(".tab-content.active");
            if (activeTab) {
                const tabId = activeTab.id.replace("-tab", "");
                updateTabDisplay(tabId);
            }
        } catch (e) {
            console.error("Error al cargar el personaje guardado:", e);
        }
    }

    // Iniciar en la primera pestaña
    switchTab("basic");

    // Agregar botón de guardar si no existe
    if (!document.getElementById("saveCharacterBtn")) {
        const saveBtn = document.createElement("button");
        saveBtn.id = "saveCharacterBtn";
        saveBtn.textContent = "Guardar Personaje";
        saveBtn.className = "save-button";
        saveBtn.addEventListener("click", saveCharacter);

        document.querySelector(".containerCrearPersonaje").appendChild(saveBtn);
    }
});