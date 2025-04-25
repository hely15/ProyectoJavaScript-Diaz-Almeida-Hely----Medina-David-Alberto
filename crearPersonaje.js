document.addEventListener("DOMContentLoaded", () => {
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")
  const saveBtn = document.getElementById("save-btn")

  let currentTabIndex = 0
  const tabs = ["basic", "stats", "equipment", "abilities", "appearance"]

  // Initialize character object
  let character = {
    id: Date.now().toString(),
    name: "",
    race: "",
    class: "",
    gender: "",
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    equipment: {
      weapon: "",
      armor: "",
      accessory: "",
    },
    abilities: [],
    appearance: {
      hairColor: "",
      eyeColor: "",
      height: "",
      weight: "",
    },
  }



  // Todas las peticiones por medio de fech al api
  fetchRaces()
  fetchClasses()
  setupEquipment()
  setupAbilities()
  setupStatSliders()
  updateCharacterPreview()



  // botton de guardado de character
  saveBtn.addEventListener("click", saveCharacter)

  document.getElementById("name").addEventListener("input", (e) => {
    character.name = e.target.value

  })

  document.getElementById("race").addEventListener("change", (e) => {
    character.race = e.target.value
  })

  document.getElementById("class").addEventListener("change", (e) => {
    character.class = e.target.value
  
  })

  document.getElementById("gender").addEventListener("change", (e) => {
    character.gender = e.target.value
  })

  document.getElementById("hairColor").addEventListener("input", (e) => {
    character.appearance.hairColor = e.target.value
  })

  document.getElementById("eyeColor").addEventListener("input", (e) => {
    character.appearance.eyeColor = e.target.value
  })

  document.getElementById("height").addEventListener("input", (e) => {
    character.appearance.height = e.target.value
  })

  document.getElementById("weight").addEventListener("input", (e) => {
    character.appearance.weight = e.target.value
  })

  function switchTab(tabName) {
    // Mostrar el contenido del tab seleccionado
    tabContents.forEach((content) => {
      content.classList.remove("active")
    })

    // activar el color en la seccion seleccionada 
    tabBtns.forEach((btn) => {
      btn.classList.remove("active")
    })

    document.getElementById(`${tabName}-tab`).classList.add("active")
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add("active")

    currentTabIndex = tabs.indexOf(tabName)


    prevBtn.disabled = currentTabIndex === 0

    if (currentTabIndex === tabs.length - 1) {
      nextBtn.style.display = "none"
      saveBtn.style.display = "block"
    } else {
      nextBtn.style.display = "block"
      saveBtn.style.display = "none"
    }
  }

  function fetchRaces() {
    fetch("https://www.dnd5eapi.co/api/races")
      .then((response) => response.json())
      .then((data) => {
        const raceSelect = document.getElementById("race")
        data.results.forEach((race) => {
          const option = document.createElement("option")
          option.value = race.name
          option.textContent = race.name
          raceSelect.appendChild(option)
        })
        // Si el personaje ya tiene una raza, la seleccionamos
        if (character.race) {
          raceSelect.value = character.race
        }
      })
      .catch((error) => {
        console.error("Error fetching races:", error)
        // Agrego valores por defecto por si el llamado falla
        const defaultRaces = ["Human", "Elf", "Dwarf", "Halfling", "Dragonborn"]
        const raceSelect = document.getElementById("race")
        defaultRaces.forEach((race) => {
          const option = document.createElement("option")
          option.value = race
          option.textContent = race
          raceSelect.appendChild(option)
        })

        if (character.race) {
          raceSelect.value = character.race
        }
      })
  }

  function fetchClasses() {
    fetch("https://www.dnd5eapi.co/api/classes")
      .then((response) => response.json())
      .then((data) => {
        const classSelect = document.getElementById("class")
        data.results.forEach((cls) => {
          const option = document.createElement("option")
          option.value = cls.name
          option.textContent = cls.name
          classSelect.appendChild(option)
        })

        if (character.class) {
          classSelect.value = character.class
        }
      })
      .catch((error) => {
        console.error("Error fetching classes:", error)
        // Agrego valores por defecto por si el llamado falla
        const defaultClasses = ["Fighter", "Wizard", "Rogue", "Cleric", "Barbarian"]
        const classSelect = document.getElementById("class")
        defaultClasses.forEach((cls) => {
          const option = document.createElement("option")
          option.value = cls
          option.textContent = cls
          classSelect.appendChild(option)
        })

        if (character.class) {
          classSelect.value = character.class
        }
      })
  }

  function setupEquipment() {
    // Mockeamos el api de equipo
    const equipment = {
      weapons: [
        { name: "Longsword", type: "Martial Melee", damage: "1d8" },
        { name: "Shortbow", type: "Simple Ranged", damage: "1d6" },
        { name: "Dagger", type: "Simple Melee", damage: "1d4" },
        { name: "Greataxe", type: "Martial Melee", damage: "1d12" },
        { name: "Staff", type: "Simple Melee", damage: "1d6" },
      ],
      armor: [
        { name: "Leather Armor", type: "Light", ac: 11 },
        { name: "Chain Shirt", type: "Medium", ac: 13 },
        { name: "Plate", type: "Heavy", ac: 18 },
        { name: "Shield", type: "Shield", ac: "+2" },
        { name: "Robe", type: "Clothing", ac: 10 },
      ],
      accessories: [
        { name: "Ring of Protection", type: "Ring", bonus: "+1 AC" },
        { name: "Amulet of Health", type: "Amulet", bonus: "Constitution 19" },
        { name: "Cloak of Elvenkind", type: "Cloak", bonus: "Advantage on Stealth" },
        { name: "Boots of Speed", type: "Boots", bonus: "Double speed" },
        { name: "Circlet of Blasting", type: "Headwear", bonus: "Scorching Ray 1/day" },
      ],
    }

    // mostrar Weapon
    const weaponSelect = document.getElementById("weapon")
    equipment.weapons.forEach((weapon) => {
      const option = document.createElement("option")
      option.value = weapon.name
      option.textContent = `${weapon.name} (${weapon.damage})`
      weaponSelect.appendChild(option)
    })

    // mostrar Armor
    const armorSelect = document.getElementById("armor")
    equipment.armor.forEach((armor) => {
      const option = document.createElement("option")
      option.value = armor.name
      option.textContent = `${armor.name} (AC ${armor.ac})`
      armorSelect.appendChild(option)
    })

    // mostrar Accessory
    const accessorySelect = document.getElementById("accessory")
    equipment.accessories.forEach((accessory) => {
      const option = document.createElement("option")
      option.value = accessory.name
      option.textContent = `${accessory.name} (${accessory.bonus})`
      accessorySelect.appendChild(option)
    })

    if (character.equipment.weapon) {
      weaponSelect.value = character.equipment.weapon
    }
    if (character.equipment.armor) {
      armorSelect.value = character.equipment.armor
    }
    if (character.equipment.accessory) {
      accessorySelect.value = character.equipment.accessory
    }

    weaponSelect.addEventListener("change", (e) => {
      character.equipment.weapon = e.target.value
    })

    armorSelect.addEventListener("change", (e) => {
      character.equipment.armor = e.target.value
    })

    accessorySelect.addEventListener("change", (e) => {
      character.equipment.accessory = e.target.value
    })
  }

  function setupAbilities() {
    // Mockeamos las habilidades del api
    const abilities = [
      { name: "Action Surge", description: "Take an additional action on your turn", class: "Fighter" },
      { name: "Rage", description: "Enter a rage, gaining damage bonus and resistance", class: "Barbarian" },
      { name: "Sneak Attack", description: "Deal extra damage when you have advantage", class: "Rogue" },
      { name: "Channel Divinity", description: "Channel divine energy to fuel magical effects", class: "Cleric" },
      { name: "Wild Shape", description: "Transform into a beast", class: "Druid" },
      { name: "Spellcasting", description: "Cast spells from your class's spell list", class: "Wizard" },
    ]

    const abilitiesList = document.getElementById("abilities-list")

    abilities.forEach((ability) => {
      const abilityItem = document.createElement("div")
      abilityItem.className = "ability-item"

      const isChecked = character.abilities.some((a) => a.name === ability.name)

      abilityItem.innerHTML = `
          <div class="ability-info">
            <h3>${ability.name}</h3>
            <p>${ability.description}</p>
            <p class="ability-class">${ability.class}</p>
          </div>
          <label class="ability-toggle">
            <input type="checkbox" data-ability="${ability.name}" ${isChecked ? "checked" : ""}>
            <span class="ability-slider"></span>
          </label>
        `

      abilitiesList.appendChild(abilityItem)

      // Add event listener to checkbox
      const checkbox = abilityItem.querySelector('input[type="checkbox"]')
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          character.abilities.push(ability)
        } else {
          character.abilities = character.abilities.filter((a) => a.name !== ability.name)
        }
      })
    })
  }


  function saveCharacter() {
    // Traer personajes del localStorage para verificar si ya existe
    const characters = JSON.parse(localStorage.getItem("dnd-characters") || "[]")

    // mirar si ya hay un perosnaje con el mismo id
    if (editId) {
      const index = characters.findIndex((char) => char.id === editId)
      if (index !== -1) {
        characters[index] = character
      }
    } else {
      characters.push(character)
    }


    localStorage.setItem("dnd-characters", JSON.stringify(characters))

  }
})
