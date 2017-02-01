'use babel';

import { View, TextEditorView, $ } from 'atom-space-pen-views';
import { ModalNewTaskView } from './modal-new-task-view.js';
import { Misc } from './../misc.js';

export class ModalTasksView extends View {
  modalPanel = null;

  constructor() {
    super();
  }

  /**
   * View to render
   */
  static content() {
    this.div({class: "atom-rpg-task--modal"}, () => {
      this.h1("Your quests", {class: "atom-rpg-task--modal--title"});

      this.button({class: "atom-rpg-task--modal--button-title modal--button-title-add"}, () => {
        this.span({class: "atom-rpg-icon-plus"});
      });

      this.button({class: "atom-rpg-task--modal--button-title modal--button-title-close"}, () => {
        this.span({class: "atom-rpg-icon-cross"});
      });

      Misc.character.quests.forEach((quest) => {
        this.div({class: "atom-rpg-task--modal--row"}, () => {
          // Buttons
          this.div({class: "atom-rpg-task--modal--row--action"}, () => {
            this.button({class: "atom-rpg-task--modal--row--action--btn"}, () => {
              this.span({class: "atom-rpg-icon-checkmark"});
            });
            this.button({class: "atom-rpg-task--modal--row--action--btn"}, () => {
              this.span({class: "atom-rpg-icon-bin"});
            });
          });

          // Content
          this.div({class: "atom-rpg-task--modal--row--content"}, () => {
            this.div(quest.title, {class: "atom-rpg-task--modal--row--content--title"});

            this.div({class: "atom-rpg-task--modal--row--content--metadata"}, () => {
              this.div({class: "atom-rpg-task--modal--row--content--metadata--days-left"}, () => {
                this.span({class: "atom-rpg-icon-clock2"});
                this.span(" " + quest.daysLeft + " days left");
              })
              this.div(quest.complexity, {class: "atom-rpg-task--modal--row--content--metadata--complexity metadata--complexity--green"});
            });
          });
        });
      });
    });
  }

  /**
   * Events on elements
   * @todo check if events are not fired twice if we close and reopen the pane
   */
  bindEvents = () => {
    // Add event
    $(".modal--button-title-add").on("click", () => {
      this.modalPanel.destroy();

      let newTask = new ModalNewTaskView(this.character);
      newTask.show();
    });

    // Close event
    $(".modal--button-title-close").on("click", () => {
      this.modalPanel.destroy();
    });
  }

  /**
   * Show the modal task list
   */
  show = () => {
    this.modalPanel = atom.workspace.addModalPanel({item: this, visible: true});

    this.bindEvents();
  }
}
