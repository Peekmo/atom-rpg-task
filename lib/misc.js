'use babel';

export class Misc {
  /**
   * Returns the max experience needed to reach the next level
   *
   * @return {Integer}
   */
  static getCurrentLevelExp(level) {
    return level * 10;
  }
}
