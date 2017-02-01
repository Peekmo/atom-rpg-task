'use babel';

import { View, TextEditorView, $ } from 'atom-space-pen-views';
import { ModalTasksView } from './modal-tasks-view.js';
import { Misc } from './../misc.js';

export class ModalNewTaskView extends View {
  modalPanel = null;
  character = null;

  constructor(character) {
    super();

    this.character = character;
  }

  /**
   * View to render
   */
  static content() {
    this.div({class: "atom-rpg-task--modal"}, () => {
      this.h1("New quest", {class: "atom-rpg-task--modal--title"});

      this.button({class: "atom-rpg-task--modal--button-title modal--button-title-add"}, () => {
        this.span({class: "atom-rpg-icon-plus"});
      });

      this.button({class: "atom-rpg-task--modal--button-title modal--button-title-close"}, () => {
        this.span({class: "atom-rpg-icon-cross"});
      });

      this.div({class: "atom-rpg-task--modal--row--new-content"}, () => {
        // Title
        this.div({class: "atom-rpg-task--modal--row--new-content--input-group"}, () => {
          this.label("Title", {class: "atom-rpg-task--modal--row--new-content--label"});
          this.div({class: "atom-rpg-task--modal--row--new-content--input"}, () => {
            this.subview("titleInput", new TextEditorView({mini: true, attributes: {id: 'titleInput'}}));
          });
        });

        // Days left
        this.div({class: "atom-rpg-task--modal--row--new-content--input-group"}, () => {
          this.label("Days left", {class: "atom-rpg-task--modal--row--new-content--label"});
          this.div({class: "atom-rpg-task--modal--row--new-content--input"}, () => {
            this.subview("daysLeftInput", new TextEditorView({mini: true, attributes: {id: 'daysLeftInput'}}));
          });
        });

        // Description
        this.div({class: "atom-rpg-task--modal--row--new-content--input-group"}, () => {
          this.label("Description", {class: "atom-rpg-task--modal--row--new-content--label"});
          this.div({class: "atom-rpg-task--modal--row--new-content--area"}, () => {
            this.subview("descriptionInput", new TextEditorView({attributes: {id: 'descriptionInput'}}));
          });
        });

        // Complexity
        this.div({class: "atom-rpg-task--modal--row--new-content--input-group"}, () => {
          this.label("Complexity", {class: "atom-rpg-task--modal--row--new-content--label"});
          this.select({class: "atom-rpg-task--modal--row--new-content--input form-control", id: "selectInput"}, () => {
            this.option("Easy", {value: "easy"});
            this.option("Medium", {value: "medium"});
            this.option("Hard", {value: "hard"});
          });
        });

        this.button("Save", {class: "atom-rpg-task--modal--row--new-content--submit"});
      });
    });
  }

  /**
   * Events on elements
   * @todo check if events are not fired twice if we close and reopen the pane
   */
  bindEvents = () => {
    // Save quest
    $(".atom-rpg-task--modal--row--new-content--submit").on("click", () => {
      let title = this.find("#titleInput").views()[0].getModel().getText();
      let daysLeft = this.find("#daysLeftInput").views()[0].getModel().getText();
      let description = this.find("#descriptionInput").views()[0].getModel().getText();
      let complexity = $(this.find("#selectInput").toArray()[0]).val();

      Misc.character.addQuest({
        title: title,
        daysLeft: daysLeft,
        description: description,
        complexity: complexity
      });

      this.destroy();
    });

    // Close event
    $(".modal--button-title-close").on("click", () => {
      this.destroy();
    });
  }

  destroy = () => {
    this.modalPanel.destroy();

    let modalTasksView = new ModalTasksView();
    modalTasksView.show();
  }

  /**
   * Show the modal task list
   */
  show = () => {
    this.modalPanel = atom.workspace.addModalPanel({item: this, visible: true});

    this.bindEvents();
  }
}
