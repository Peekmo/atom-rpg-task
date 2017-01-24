'use babel';

export class AvatarView {
  container = null;
  firstSlice = null;
  secondSlice = null;
  avatar = null;
  level = null;

  /**
   * Destroy the avatar element
   */
  destroy = () => {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
      this.firstSlice = null;
      this.secondSlice = null;
      this.avatar = null;
      this.level = null;
    }
  }

  /**
   * Adds an element into the DOM
   *
   * @param  {string} className CSS classname to put on the div
   * @param  {DOMElement} parent    Parent element of the created element
   *
   * @return {DOMElement}           Created element
   */
  createElement = (className, parent) => {
    let element = document.createElement("div");
    element.classList.add(className)

    if (parent) {
      parent.appendChild(element)
    }

    return element;
  }

  /**
   * Show the avatar illustration
   */
  show = (editor) => {
    if (!this.container) {
      this.container = this.createElement('atom-rpg-task--avatar-container');

      let experienceContainer = this.createElement('atom-rpg-task--experience-pie', this.container);

      let firstClip = this.createElement('atom-rpg-task--experience-pie--clip1', experienceContainer);
      this.firstSlice = this.createElement('atom-rpg-task--experience-pie--slice1', firstClip);

      let secondClip = this.createElement('atom-rpg-task--experience-pie--clip2', experienceContainer);
      this.secondSlice = this.createElement('atom-rpg-task--experience-pie--slice2', secondClip);

      this.avatar = this.createElement('atom-rpg-task--experience-pie--avatar', experienceContainer);

      this.level = this.createElement('atom-rpg-task--experience-pie--level', experienceContainer);
    }

    editor.querySelector('.scroll-view').appendChild(this.container);
  }

  /**
   * Set percentage of exp bar (http://jsfiddle.net/maayan/byT76/)
   * @param {Integer} percentage Percentage value (between 0/100)
   */
  setPercentage = (percentage) => {
    let firstHalfAngle = 180;
    let secondHalfAngle = 0;

    // caluclate the angle
    let drawAngle = percentage / 100 * 360;

    // calculate the angle to be displayed if each half
    if (drawAngle <= 180) {
      firstHalfAngle = drawAngle;
    } else {
      secondHalfAngle = drawAngle - 180;
    }

    this.firstSlice.style["transform"] = 'rotate(' + firstHalfAngle + 'deg)';
    this.secondSlice.style["transform"] = 'rotate(' + secondHalfAngle + 'deg)';
  }

  /**
   * Update level value
   *
   * @param  {Integer} level Level value
   */
  updateLevel = (level) => {
    this.level.innerHTML = level;
  }
}
