'use babel';

import { View } from 'atom';

export class ModalTasksView {
  container = null;
  modalPanel = null;
  tasks = [];

  constructor(tasks) {
    this.tasks = tasks;
  }

  showTasks = () => {
    this.container = this.createElement("div", "atom-rpg-task--modal");

    let title = this.createElement("h1", "atom-rpg-task--modal--title", this.container);
    title.textContent = "~ Your quests ~";

    let newTasks = this.createElement("button", "atom-rpg-task--modal--button-title modal--button-title-add", this.container);
    this.createElement("span", "atom-rpg-icon-plus", newTasks);
    newTasks.addEventListener('click', () => {
      this.showNewTask();
    });

    let close = this.createElement("button", "atom-rpg-task--modal--button-title modal--button-title-close", this.container);
    this.createElement("span", "atom-rpg-icon-cross", close);
    close.addEventListener('click', () => {
      this.modalPanel.destroy();
    });

    let hr = this.createElement("hr", "", this.container);

    for (var i = 0; i < 50; i++) {
      let task = this.createElement("div", "atom-rpg-task--modal--row", this.container);
      let taskActions = this.createElement("div", "atom-rpg-task--modal--row--action", task);

      let buttonComplete = this.createElement("button", "atom-rpg-task--modal--row--action--btn", taskActions);
      this.createElement("span", "atom-rpg-icon-checkmark", buttonComplete);
      let buttonDelete = this.createElement("button", "atom-rpg-task--modal--row--action--btn", taskActions);
      this.createElement("span", "atom-rpg-icon-bin", buttonDelete);

      let taskContainer = this.createElement("div", "atom-rpg-task--modal--row--content", task);
      let taskTitle = this.createElement("div", "atom-rpg-task--modal--row--content--title", taskContainer);
      taskTitle.textContent = "This is a quest This is a quest This is a quest";

      let taskMetadata = this.createElement("div", "atom-rpg-task--modal--row--content--metadata", taskContainer);
      let daysLeft = this.createElement("div", "atom-rpg-task--modal--row--content--metadata--days-left", taskMetadata);
      this.createElement("span", "atom-rpg-icon-clock2", daysLeft);
      let daysLeftTxt = this.createElement("span", "", daysLeft);
      daysLeftTxt.textContent = " 10 days left";

      let complexity = this.createElement("div", "atom-rpg-task--modal--row--content--metadata--complexity metadata--complexity--green", taskMetadata);
      complexity.textContent = "Easy";
    }

    this.show();
  }

  showNewTask = () => {
    this.modalPanel.destroy();

    this.container = this.createElement("div", "atom-rpg-task--modal");

    let title = this.createElement("h1", "atom-rpg-icon-rpg-task--modal--title", this.container);
    title.textContent = "~ New quest ~";

    let close = this.createElement("button", "atom-rpg-task--modal--button-title modal--button-title-close", this.container);
    this.createElement("span", "atom-rpg-icon-cross", close);
    close.addEventListener('click', () => {
      this.modalPanel.destroy();

      this.showTasks();
    });

    let hr = this.createElement("hr", "", this.container);

    let taskName = this.createElement("input", "", this.container);
    taskName.attributes.type = "text";

    let taskContent = this.createElement("textarea", "", this.container);

    this.show();
  }

  /**
   * Adds an element into the DOM
   *
   * @param  {string} tag       HTML tag to build
   * @param  {string} className CSS classname to put on the div
   * @param  {DOMElement} parent    Parent element of the created element
   *
   * @return {DOMElement}           Created element
   */
  createElement = (tag, className, parent) => {
    let element = document.createElement(tag);

    if (className) {
      className.split(" ").forEach((classToAdd) => {
        element.classList.add(classToAdd);
      });
    }

    if (parent) {
      parent.appendChild(element)
    }

    return element;
  }

  show = () => {
    this.modalPanel = atom.workspace.addModalPanel({item: this.container, visible: true})
  }
}
