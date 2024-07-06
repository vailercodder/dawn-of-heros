// Define special abilities based on ability-id
const specialAbilities = {
  1: {
    apply: (member, opponent) => {
      // Ability: Increase power by 10%
      member.power = Math.ceil(member.power * 1.1);
    },
    description: "Increase power by 10%",
  },
  2: {
    apply: (member, opponent) => {
      // Ability: Increase health by 20%
      member.health = Math.ceil(member.health * 1.2);
    },
    description: "Increase health by 20%",
  },
  3: {
    apply: (member, opponent) => {
      // Ability: Decrease opponent's power by 15%
      opponent.power = Math.ceil(opponent.power * 0.85);
    },
    description: "Decrease opponent's power by 15%",
  },
  4: {
    apply: (member, opponent) => {
      // Ability: Decrease opponent's health by 10%
      opponent.health = Math.ceil(opponent.health * 0.9);
    },
    description: "Decrease opponent's health by 10%",
  },
  // Add more abilities as needed
};

// Apply special abilities to a member and their opponent
export const applySpecialAbility = (member, opponent) => {
  const abilityId = member["ability-id"];
  if (specialAbilities[abilityId]) {
    specialAbilities[abilityId].apply(member, opponent);
  }
};

// Get the description of a special ability
export const getSpecialAbilityDescription = (abilityId) => {
  if (specialAbilities[abilityId]) {
    return specialAbilities[abilityId].description;
  }
  return "No special ability";
};
