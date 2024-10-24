// Array of abilities, with GCD and oGCD specification
const abilities = [
    { id: 1, name: "Potion", icon: "./images/ability1.png", job: "universal", type: "oGCD" },
    { id: 2, name: "Overpower", icon: "./images/ability2.png", job: "warrior", type: "GCD" },
    { id: 3, name: "Inner Beast", icon: "https://lds-img.finalfantasyxiv.com/d/c72ea7de2c06ad8a03bc55598297aba5bf00b0b6.png", job: "warrior", type: "GCD" },
    { id: 4, name: "Fire IV", icon: "./images/ability4.png", job: "black_mage", type: "GCD" },
    { id: 5, name: "Thunder III", icon: "./images/ability5.png", job: "black_mage", type: "oGCD" },
    { id: 6, name: "Spineshatter Dive", icon: "./images/ability6.png", job: "dragoon", type: "oGCD" },
];

// Selecting DOM elements
const abilityList = document.getElementById('ability-list');
const rotationTimeline = document.getElementById('rotation-timeline');
const jobSelect = document.getElementById('job-select');

// Function to add ability to the timeline
function addToTimeline(ability) {
    const abilityDiv = document.createElement("div");

    // Apply the appropriate class based on ability type (GCD or oGCD)
    if (ability.type === "GCD") {
        abilityDiv.classList.add("gcd");
    } else if (ability.type === "oGCD") {
        abilityDiv.classList.add("ogcd");
    }

    abilityDiv.innerHTML = `<img src="${ability.icon}" alt="${ability.name}" width="100%">`;

    // Add click event to remove ability from timeline
    abilityDiv.addEventListener("click", function() {
        rotationTimeline.removeChild(abilityDiv);
    });

    rotationTimeline.appendChild(abilityDiv);
}

// Function to display abilities based on the selected job
function displayAbilities(selectedClass) {
    // Clear the current ability list
    abilityList.innerHTML = '';

    // Create a label for universal abilities
    const universalLabel = document.createElement('h3');
    universalLabel.textContent = 'Universal Abilities';
    abilityList.appendChild(universalLabel);

    // Display universal abilities
    abilities.forEach(ability => {
        if (ability.job === 'universal') {
            const abilityDiv = document.createElement("div");
            abilityDiv.classList.add("ability-icon");
            abilityDiv.setAttribute("data-id", ability.id);
            abilityDiv.innerHTML = `<img src="${ability.icon}" alt="${ability.name}" width="100%">`;

            // Add click event to add to timeline
            abilityDiv.addEventListener("click", () => addToTimeline(ability));

            abilityList.appendChild(abilityDiv);
        }
    });

    // Create a label for job-specific abilities
    const jobLabel = document.createElement('h3');
    jobLabel.textContent = `${selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)} Abilities`;
    abilityList.appendChild(jobLabel);

    // Display job-specific abilities
    abilities.forEach(ability => {
        if (selectedClass === 'all' || ability.job === selectedClass) {
            const abilityDiv = document.createElement("div");
            abilityDiv.classList.add("ability-icon");
            abilityDiv.setAttribute("data-id", ability.id);
            abilityDiv.innerHTML = `<img src="${ability.icon}" alt="${ability.name}" width="100%">`;

            // Add click event to add to timeline
            abilityDiv.addEventListener("click", () => addToTimeline(ability));

            abilityList.appendChild(abilityDiv);
        }
    });
}

// Event listener for job selection
jobSelect.addEventListener('change', function() {
    displayAbilities(this.value);
});

// Initial display of all abilities (universal and job-specific)
displayAbilities('all');
