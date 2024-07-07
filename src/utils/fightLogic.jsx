import {
  applySpecialAbility,
  getSpecialAbilityDescription,
} from "./specialAbilities";

// Generate message for the outcome of each turn
const generateMessage = (team1Member, team2Member, team1Name, team2Name) => {
  if (team1Member.health <= 0 && team2Member.health <= 0) {
    return `Oh no! Both ${team1Member.name} from ${team1Name} and ${team2Member.name} from ${team2Name} have fallen!`;
  } else if (team1Member.health <= 0) {
    return `Oh no! ${team1Member.name} from ${team1Name} has fallen to ${team2Member.name} from ${team2Name}!`;
  } else if (team2Member.health <= 0) {
    return `Oh no! ${team2Member.name} from ${team2Name} has fallen to ${team1Member.name} from ${team1Name}!`;
  }
  return null;
};

// Handle each turn in the fight
const takeTurn = (team1Member, team2Member, team1Name, team2Name) => {
  let messages = [];

  // Apply special abilities on the first turn of each member
  if (!team1Member.hasUsedAbility) {
    applySpecialAbility(team1Member, team2Member);
    team1Member.hasUsedAbility = true;
    const team1AbilityDesc = getSpecialAbilityDescription(
      team1Member["ability-id"]
    );
    messages.push(
      `Special Ability Used by ${team1Member.name} from ${team1Name}: ${team1AbilityDesc}`
    );
  }

  if (!team2Member.hasUsedAbility) {
    applySpecialAbility(team2Member, team1Member);
    team2Member.hasUsedAbility = true;
    const team2AbilityDesc = getSpecialAbilityDescription(
      team2Member["ability-id"]
    );
    messages.push(
      `Special Ability Used by ${team2Member.name} from ${team2Name}: ${team2AbilityDesc}`
    );
  }

  messages.push(
    `Before turn - ${team1Member.name} from ${team1Name}: Power=${team1Member.power}, Health=${team1Member.health}; ${team2Member.name} from ${team2Name}: Power=${team2Member.power}, Health=${team2Member.health}`
  );

  // Reduce the health of each member by the power of the enemy member
  team1Member.health -= team2Member.power;
  team2Member.health -= team1Member.power;

  messages.push(
    `After turn - ${team1Member.name} from ${team1Name}: Power=${team1Member.power}, Health=${team1Member.health}; ${team2Member.name} from ${team2Name}: Power=${team2Member.power}, Health=${team2Member.health}`
  );

  return messages;
};

// This function will handle the fight logic
export const createFight = (team1, team2) => {
  // Clone teams to avoid mutating the original data
  let team1Members = team1.members.map((member) => ({
    ...member,
    hasUsedAbility: false,
  }));
  let team2Members = team2.members.map((member) => ({
    ...member,
    hasUsedAbility: false,
  }));

  let messages = [];

  const nextTurn = () => {
    if (team1Members.length === 0 || team2Members.length === 0) {
      return null;
    }

    // Get the first member of each team
    let team1Member = team1Members[0];
    let team2Member = team2Members[0];

    // Handle the turn
    const turnMessages = takeTurn(
      team1Member,
      team2Member,
      team1.name,
      team2.name
    );

    // Generate and store message for this turn
    const specialMessage = generateMessage(
      team1Member,
      team2Member,
      team1.name,
      team2.name
    );
    if (specialMessage) {
      messages = [specialMessage]; // Clear other messages and keep only the special message
    } else {
      messages = messages.concat(turnMessages);
    }

    // Check if any member's health drops to 0 or below
    if (team1Member.health <= 0) {
      team1Members.shift(); // Remove the member from team1
    }
    if (team2Member.health <= 0) {
      team2Members.shift(); // Remove the member from team2
    }

    // Ensure team1Members and team2Members are arrays
    team1Members = team1Members.length > 0 ? team1Members : [];
    team2Members = team2Members.length > 0 ? team2Members : [];

    // Determine if the fight is over
    let result;
    if (team1Members.length === 0) {
      result = {
        winner: team2,
        loser: team1,
        messages,
        team1: team1Members,
        team2: team2Members,
      };
    } else if (team2Members.length === 0) {
      result = {
        winner: team1,
        loser: team2,
        messages,
        team1: team1Members,
        team2: team2Members,
      };
    } else {
      result = {
        winner: null,
        loser: null,
        messages,
        team1: team1Members,
        team2: team2Members,
      };
    }

    return result;
  };

  return nextTurn;
};
