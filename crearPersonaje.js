document.addEventListener("DOMContentLoaded", () => {
    // Tab Navigation
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
  
    // Check if we're editing an existing character
    const urlParams = new URLSearchParams(window.location.search)
    const editId = urlParams.get("edit")
  
    if (editId) {
      const characters = JSON.parse(localStorage.getItem("dnd-characters") || "[]")
      const existingCharacter = characters.find((char) => char.id === editId)
  
      if (existingCharacter) {
        character = existingCharacter
        populateForm(character)
      }
    }
  
    // Fetch data from D&D 5e API
    fetchRaces()
    fetchClasses()
    setupEquipment()
    setupAbilities()
    setupStatSliders()
    updateCharacterPreview()
  
    // Tab switching
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabName = btn.getAttribute("data-tab")
        switchTab(tabName)
      })
    })
  
    // Next and Previous buttons
    nextBtn.addEventListener("click", () => {
      if (currentTabIndex < tabs.length - 1) {
        switchTab(tabs[currentTabIndex + 1])
      }
    })
  
    prevBtn.addEventListener("click", () => {
      if (currentTabIndex > 0) {
        switchTab(tabs[currentTabIndex - 1])
      }
    })
  
    // Save button
    saveBtn.addEventListener("click", saveCharacter)
  
    // Form input event listeners
    document.getElementById("name").addEventListener("input", (e) => {
      character.name = e.target.value
      updateCharacterPreview()
    })
  
    document.getElementById("race").addEventListener("change", (e) => {
      character.race = e.target.value
      updateCharacterPreview()
    })
  
    document.getElementById("class").addEventListener("change", (e) => {
      character.class = e.target.value
      updateCharacterPreview()
    })
  
    document.getElementById("gender").addEventListener("change", (e) => {
      character.gender = e.target.value
      updateCharacterPreview()
    })
  
    document.getElementById("hairColor").addEventListener("input", (e) => {
      character.appearance.hairColor = e.target.value
      updateCharacterPreview()
    })
  
    document.getElementById("eyeColor").addEventListener("input", (e) => {
      character.appearance.eyeColor = e.target.value
      updateCharacterPreview()
    })
  
    document.getElementById("height").addEventListener("input", (e) => {
      character.appearance.height = e.target.value
      updateCharacterPreview()
    })
  
    document.getElementById("weight").addEventListener("input", (e) => {
      character.appearance.weight = e.target.value
      updateCharacterPreview()
    })
  
    // Functions
    function switchTab(tabName) {
      // Hide all tabs
      tabContents.forEach((content) => {
        content.classList.remove("active")
      })
  
      tabBtns.forEach((btn) => {
        btn.classList.remove("active")
      })
  
      // Show selected tab
      document.getElementById(`${tabName}-tab`).classList.add("active")
      document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add("active")
  
      // Update current tab index
      currentTabIndex = tabs.indexOf(tabName)
  
      // Update button states
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
  
          // Set selected value if editing
          if (character.race) {
            raceSelect.value = character.race
          }
        })
        .catch((error) => {
          console.error("Error fetching races:", error)
          // Add some default races as fallback
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
          // Add some default classes as fallback
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
      // Mock equipment data
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
  
      // Populate weapon select
      const weaponSelect = document.getElementById("weapon")
      equipment.weapons.forEach((weapon) => {
        const option = document.createElement("option")
        option.value = weapon.name
        option.textContent = `${weapon.name} (${weapon.damage})`
        weaponSelect.appendChild(option)
      })
  
      // Populate armor select
      const armorSelect = document.getElementById("armor")
      equipment.armor.forEach((armor) => {
        const option = document.createElement("option")
        option.value = armor.name
        option.textContent = `${armor.name} (AC ${armor.ac})`
        armorSelect.appendChild(option)
      })
  
      // Populate accessory select
      const accessorySelect = document.getElementById("accessory")
      equipment.accessories.forEach((accessory) => {
        const option = document.createElement("option")
        option.value = accessory.name
        option.textContent = `${accessory.name} (${accessory.bonus})`
        accessorySelect.appendChild(option)
      })
  
      // Set values if editing
      if (character.equipment.weapon) {
        weaponSelect.value = character.equipment.weapon
      }
      if (character.equipment.armor) {
        armorSelect.value = character.equipment.armor
      }
      if (character.equipment.accessory) {
        accessorySelect.value = character.equipment.accessory
      }
  
      // Add event listeners
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
      // Mock abilities data
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
  
    function setupStatSliders() {
      const stats = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]
  
      stats.forEach((stat) => {
        const slider = document.getElementById(stat)
        const valueDisplay = document.getElementById(`${stat}-value`)
  
        // Set initial value from character
        slider.value = character.stats[stat]
        valueDisplay.textContent = character.stats[stat]
  
        // Add event listener
        slider.addEventListener("input", () => {
          character.stats[stat] = Number.parseInt(slider.value)
          valueDisplay.textContent = slider.value
        })
      })
    }
  
    function updateCharacterPreview() {
      const previewName = document.getElementById("preview-name")
      const previewRaceClass = document.getElementById("preview-race-class")
      const previewPhysical = document.getElementById("preview-physical")
  
      previewName.textContent = character.name || "Unnamed Character"
  
      let raceClass = ""
      if (character.race) raceClass += character.race
      if (character.race && character.class) raceClass += " "
      if (character.class) raceClass += character.class
  
      previewRaceClass.textContent = raceClass || ""
  
      let physical = ""
      if (character.appearance.height) physical += character.appearance.height
      if (character.appearance.height && character.appearance.weight) physical += ", "
      if (character.appearance.weight) physical += character.appearance.weight
  
      previewPhysical.textContent = physical || ""
    }
  
    function populateForm(character) {
      // Basic info
      document.getElementById("name").value = character.name || ""
  
      // Stats will be set in setupStatSliders
  
      // Appearance
      document.getElementById("hairColor").value = character.appearance.hairColor || ""
      document.getElementById("eyeColor").value = character.appearance.eyeColor || ""
      document.getElementById("height").value = character.appearance.height || ""
      document.getElementById("weight").value = character.appearance.weight || ""
  
      // Equipment and abilities will be set in their respective setup functions
    }
  
    function saveCharacter() {
      // Get existing characters from localStorage
      const characters = JSON.parse(localStorage.getItem("dnd-characters") || "[]")
  
      // Check if we're editing an existing character
      if (editId) {
        const index = characters.findIndex((char) => char.id === editId)
        if (index !== -1) {
          characters[index] = character
        }
      } else {
        // Add new character
        characters.push(character)
      }
  
      // Save to localStorage
      localStorage.setItem("dnd-characters", JSON.stringify(characters))
  
      // Redirect to characters page
      window.location.href = "characters.html"
    }
  })
  