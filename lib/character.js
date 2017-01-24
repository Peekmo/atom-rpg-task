'use babel';

export class Character {
  experience = 0;
  level = 1;

  addExperience = (experience) => {
    this.experience += experience;
  };

  levelUp = () => {
    this.level += 1;
    this.experience = 0;
  }
}
