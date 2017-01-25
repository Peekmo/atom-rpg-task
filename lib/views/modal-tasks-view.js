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

    let newTasks = this.createElement("button", "", this.container);
    newTasks.textContent = "+";
    newTasks.addEventListener('click', () => {
      this.showNewTask();
    });

    let close = this.createElement("button", "", this.container);
    close.textContent = "x";
    close.addEventListener('click', () => {
      this.modalPanel.destroy();
    });

    let hr = this.createElement("hr", "", this.container);

    let table = this.createElement("table", "atom-rpg-task--modal--table", this.container);
    for (var i = 0; i < 50; i++) {
      let task = this.createElement("tr", "atom-rpg-task--modal--table--row", table);
      let taskContent = this.createElement("td", "", task);
      taskContent.textContent = "This is a quest This is a quest This is a quest This is a quest This is a quest This is a quest This is a quest This is a quest This is a quest ";
    }

    this.show();
  }

  showNewTask = () => {
    this.modalPanel.destroy();

    this.container = this.createElement("div", "atom-rpg-task--modal");

    let title = this.createElement("h1", "atom-rpg-task--modal--title", this.container);
    title.textContent = "~ New quest ~";

    let close = this.createElement("button", "", this.container);
    close.textContent = "x";
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
      element.classList.add(className)
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
