document.addEventListener("DOMContentLoaded", () => {
    // Get character ID from URL
    const urlParams = new URLSearchParams(window.location.search)
    const characterId = urlParams.get("id")
  
    if (!characterId) {
      window.location.href = "characters.html"
      return
    }
  
    // Get character from localStorage
    const characters = JSON.parse(localStorage.getItem("dnd-characters") || "[]")
    const character = characters.find((char) => char.id === characterId)
  
    if (!character) {
      window.location.href = "characters.html"
      return
    }
  
    // Populate character data
    populateCharacterData(character)
  
    // Tab switching
    const tabBtns = document.querySelectorAll(".tab-btn")
    const tabContents = document.querySelectorAll(".tab-content")
  
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tabName = btn.getAttribute("data-tab")
  
        // Hide all tabs
        tabContents.forEach((content) => {
          content.classList.remove("active")
        })
  
        tabBtns.forEach((btn) => {
          btn.classList.remove("active")
        })
  
        // Show selected tab
        document.getElementById(`${tabName}-tab`).classList.add("active")
        btn.classList.add("active")
      })
    })
  
    // Export character
    document.getElementById("export-character").addEventListener("click", () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(character, null, 2))
      const downloadAnchorNode = document.createElement("a")
      downloadAnchorNode.setAttribute("href", dataStr)
      downloadAnchorNode.setAttribute("download", `${character.name || "character"}.json`)
      document.body.appendChild(downloadAnchorNode)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    })
  
    // Edit character links
    document.getElementById("edit-character").href = `create.html?edit=${character.id}`
    document.getElementById("equipment-update-link").href = `create.html?edit=${character.id}`
    document.getElementById("appearance-update-link").href = `create.html?edit=${character.id}`
  
    // Functions
    function populateCharacterData(character) {
      // Determine emoji based on race
  
      // Page title and header
      document.title = `${character.name || "Character"} - D&D Character Generator`
      document.getElementById("character-name").textContent = character.name || "Unnamed Character"
  
      // Sidebar
      document.getElementById("character-emoji").textContent = emoji
      document.getElementById("appearance-emoji").textContent = emoji
      document.getElementById("sidebar-name").textContent = character.name || "Unnamed Character"
      document.getElementById("sidebar-race-class").textContent = `${character.race || ""} ${character.class || ""}`
  
      // Overview tab
      document.getElementById("overview-name").textContent = character.name || "Unnamed"
      document.getElementById("overview-race").textContent = character.race || "Unknown"
      document.getElementById("overview-class").textContent = character.class || "Unknown"
      document.getElementById("overview-gender").textContent = character.gender || "Unknown"
      document.getElementById("overview-weapon").textContent = character.equipment.weapon || "None"
      document.getElementById("overview-armor").textContent = character.equipment.armor || "None"
      document.getElementById("overview-accessory").textContent = character.equipment.accessory || "None"
      document.getElementById("overview-abilities-count").textContent = character.abilities.length
  
      // Stats
      const overviewStats = document.getElementById("overview-stats")
      overviewStats.innerHTML = ""
  
      Object.entries(character.stats).forEach(([stat, value]) => {
        const modifier = Math.floor((value - 10) / 2)
        const statBox = document.createElement("div")
        statBox.className = "stat-box"
        statBox.innerHTML = `
          <div class="stat-name">${stat}</div>
          <div class="stat-value">${value}</div>
          <div class="stat-mod">Mod: ${modifier >= 0 ? "+" + modifier : modifier}</div>
        `
        overviewStats.appendChild(statBox)
      })
  
      // Abilities
      const overviewAbilities = document.getElementById("overview-abilities")
      overviewAbilities.innerHTML = ""
  
      if (character.abilities.length === 0) {
        overviewAbilities.innerHTML = "<p>No abilities selected</p>"
      } else {
        character.abilities.slice(0, 4).forEach((ability) => {
          const abilityCard = document.createElement("div")
          abilityCard.className = "ability-card"
          abilityCard.innerHTML = `
            <div class="ability-name">${ability.name}</div>
            <div class="ability-desc">${ability.description}</div>
          `
          overviewAbilities.appendChild(abilityCard)
        })
      }
  
      // Detailed stats
      const detailedStats = document.getElementById("detailed-stats")
      detailedStats.innerHTML = ""
  
      Object.entries(character.stats).forEach(([stat, value]) => {
        const modifier = Math.floor((value - 10) / 2)
        const statItem = document.createElement("div")
        statItem.className = "detailed-stat"
  
        let statDescription = ""
        if (stat === "strength") statDescription = "Physical power and carrying capacity"
        else if (stat === "dexterity") statDescription = "Agility, reflexes, and balance"
        else if (stat === "constitution") statDescription = "Endurance, stamina, and health"
        else if (stat === "intelligence") statDescription = "Memory, reasoning, and learning"
        else if (stat === "wisdom") statDescription = "Perception, intuition, and insight"
        else if (stat === "charisma") statDescription = "Force of personality and leadership"
  
        statItem.innerHTML = `
          <div class="stat-icon">${value}</div>
          <div class="stat-details">
            <div class="stat-title">${stat}</div>
            <div class="stat-modifier">Modifier: ${modifier >= 0 ? "+" + modifier : modifier}</div>
            <div class="stat-description">${statDescription}</div>
          </div>
        `
  
        detailedStats.appendChild(statItem)
      })
  
      // Abilities container
      const abilitiesContainer = document.getElementById("abilities-container")
      abilitiesContainer.innerHTML = ""
  
      if (character.abilities.length === 0) {
        abilitiesContainer.innerHTML = `
          <div class="empty-abilities">
            <p>No abilities selected for this character</p>
            <a href="create.html?edit=${character.id}" class="btn btn-primary">Add Abilities</a>
          </div>
        `
      } else {
        character.abilities.forEach((ability) => {
          const abilityItem = document.createElement("div")
          abilityItem.className = "ability-card"
          abilityItem.innerHTML = `
            <div class="ability-header">
              <div class="ability-name">${ability.name}</div>
              <div class="ability-class">${ability.class}</div>
            </div>
            <div class="ability-desc">${ability.description}</div>
          `
          abilitiesContainer.appendChild(abilityItem)
        })
      }
  
      // Equipment
      document.getElementById("equipment-weapon").textContent = character.equipment.weapon || "None equipped"
      document.getElementById("equipment-armor").textContent = character.equipment.armor || "None equipped"
      document.getElementById("equipment-accessory").textContent = character.equipment.accessory || "None equipped"
  
      // Appearance
      document.getElementById("appearance-hair").textContent = character.appearance.hairColor || "Not specified"
      document.getElementById("appearance-eyes").textContent = character.appearance.eyeColor || "Not specified"
      document.getElementById("appearance-height").textContent = character.appearance.height || "Not specified"
      document.getElementById("appearance-weight").textContent = character.appearance.weight || "Not specified"
    }
  })
  