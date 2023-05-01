const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const agentName = document.getElementById("agent-name");
const agentImage = document.getElementById("agent-image");
const agentRole = document.getElementById("agent-role");
const agentDescription = document.getElementById("agent-description");
const agentAbilities = document.getElementById("agent-abilities");
const portraitBackground = document.getElementsByClassName("portrait")[0];
const infoBackground = document.getElementsByClassName("agent-info-container")[0];
const abilityBC = document.getElementsByClassName("ability-container")[0];
const roleBC = document.getElementsByClassName("extra-info")[0];
const agentDeveloperName = document.getElementById("agent-developer-name");
const agentDisplayName = document.getElementById("agent-display-name");
const agentDisplayIcon = document.getElementById("agent-display-icon");
const agentFullPortrait = document.getElementById("agent-full-portrait");
const agentKillfeedPortrait = document.getElementById("agent-killfeed-portrait");
const agentBackground = document.getElementById("agent-background");
const agentBackgroundGradientColors = document.getElementById("agent-background-gradient-colors");
const agentRoleUuid = document.getElementById("agent-role-uuid");
const agentRoleDisplayName = document.getElementById("agent-role-display-name");
const agentRoleDescription = document.getElementById("agent-role-description");
const agentAbility1Slot = document.getElementById("agent-ability1-slot");
const agentAbility1DisplayName = document.getElementById("agent-ability1-display-name");
const agentAbility1Description = document.getElementById("agent-ability1-description");
const agentAbility1DisplayIcon = document.getElementById("agent-ability1-display-icon");
const agentAbility2Slot = document.getElementById("agent-ability2-slot");
const agentAbility2DisplayName = document.getElementById("agent-ability2-display-name");
const agentAbility2Description = document.getElementById("agent-ability2-description");
const agentAbility2DisplayIcon = document.getElementById("agent-ability2-display-icon");
const agentGrenadeSlot = document.getElementById("agent-grenade-slot");
const agentGrenadeDisplayName = document.getElementById("agent-grenade-display-name");
const agentGrenadeDescription = document.getElementById("agent-grenade-description");
const agentGrenadeDisplayIcon = document.getElementById("agent-grenade-display-icon");
const agentUltimateSlot = document.getElementById("agent-ultimate-slot");
const agentUltimateDisplayName = document.getElementById("agent-ultimate-display-name");
const agentUltimateDescription = document.getElementById("agent-ultimate-description");
const agentUltimateDisplayIcon = document.getElementById("agent-ultimate-display-icon");

let currentIndex = 0;
const agentsPerPage = 1;
const apiUrl = "https://valorant-api.com/v1/agents";

async function fetchAgents() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    agentName.innerText = "404";
    agentImage.src = "images/agents/agents-background.jpg";
    agentRole.innerText = "Agent Not Found";
    agentDescription.innerText = "Could not fetch agent data. Please try again later.";
    agentAbilities.innerHTML = "";
    return [];
  }
}

async function renderAgent(agent) {
    agentName.innerText = agent.displayName;
    agentRole.innerText = agent.role.displayName;
    agentImage.src = agent.displayIcon;
    const colors = agent.backgroundGradientColors.map(color => `#${color}`);
    portraitBackground.style.backgroundImage = `linear-gradient(to bottom, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]})`;

    infoBackground.style.backgroundImage = `url(${agent.background})`;
    abilityBC.style.backgroundImage = `url(${agent.background})`;
    roleBC.style.backgroundImage = `url(${agent.role.displayIcon})`;



    

    agentDescription.innerText = agent.description;
  agentDeveloperName.innerText = "Internal Name: " + agent.developerName;
  agentFullPortrait.src = agent.fullPortrait;
  //agentBackgroundGradientColors.innerText = agent.backgroundGradientColors;
  agentRoleDescription.innerText = agent.role.description;

  if (agent.abilities.length === 4) {
    agentAbility1Slot.innerText = agent.abilities[0].slot;
    agentAbility1DisplayName.innerText = agent.abilities[0].displayName;
    agentAbility1Description.innerText = agent.abilities[0].description;
    agentAbility1DisplayIcon.src = agent.abilities[0].displayIcon;

    agentAbility2Slot.innerText = agent.abilities[1].slot;
    agentAbility2DisplayName.innerText = agent.abilities[1].displayName;
    agentAbility2Description.innerText = agent.abilities[1].description;
    agentAbility2DisplayIcon.src = agent.abilities[1].displayIcon;

    agentGrenadeSlot.innerText = agent.abilities[2].slot;
    agentGrenadeDisplayName.innerText = agent.abilities[2].displayName;
    agentGrenadeDescription.innerText = agent.abilities[2].description;
    agentGrenadeDisplayIcon.src = agent.abilities[2].displayIcon;

    agentUltimateSlot.innerText = agent.abilities[3].slot;
    agentUltimateDisplayName.innerText = agent.abilities[3].displayName;
    agentUltimateDescription.innerText = agent.abilities[3].description;
    agentUltimateDisplayIcon.src = agent.abilities[3].displayIcon;
  } else {
    agentAbilities.innerHTML = "";
  }
}

async function init() {
  const agents = await fetchAgents();
  if (agents.length > 0) {
    renderAgent(agents[currentIndex]);
  }
}

init();

prevBtn.addEventListener("click", () => {
    init();

  currentIndex -= agentsPerPage;
  if (currentIndex < 0) {
    currentIndex = agentsPerPage - 1;
  }
  renderAgent(agents[currentIndex]);
});

nextBtn.addEventListener("click", () => {
    init();

  currentIndex += agentsPerPage;
  if (currentIndex >= 22) {
    currentIndex = 0;
  }
  renderAgent(agents[currentIndex]);
});
