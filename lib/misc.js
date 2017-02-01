'use babel';

export class Misc {
  static character = null;
  
  /**
   * Returns the max experience needed to reach the next level
   *
   * @return {Integer}
   */
  static getCurrentLevelExp(level) {
    return level * 10;
  }
}
