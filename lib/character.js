'use babel';

export class Character {
  experience = 0;
  level = 1;
  quests = [];

  /**
   * Adds experience to the character
   *
   * @param {int} experience Experience to add
   */
  addExperience = (experience) => {
    this.experience += experience;
  };

  /**
   * Process a level up of the character
   */
  levelUp = () => {
    this.level += 1;
    this.experience = 0;
  }

  /**
   * Adds a new task to the character
   * @param {Object} quest
   */
  addQuest = (quest) => {
    // Generate quest UUID
    
    this.quests.push(quest);
  }
}
