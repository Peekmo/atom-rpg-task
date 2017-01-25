'use babel'

import { Character } from './character.js';
import { Misc } from './misc.js'
import { AvatarView } from './views/avatar-view.js';
import { ModalTasksView } from './views/modal-tasks-view.js';

export class RpgTaskBuilder {
  avatarView = null;
  chararcter = null;

  // Events
  activeItemSubscription = null;

  /**
   * Initialize the plugin
   */
  init = () => {
    let modalTasks = new ModalTasksView();
    modalTasks.showTasks();

    this.avatarView = new AvatarView();
    this.character = new Character();

    this.avatarView.show(atom.views.getView(atom.workspace.getActiveTextEditor()));

    this.activeItemSubscription = atom.workspace.onDidStopChangingActivePaneItem(() => {
      this.avatarView.destroy();
      this.avatarView.show(atom.views.getView(atom.workspace.getActiveTextEditor()));

      this.subscribeEvents();
      this.updateAvatarView();

    });

    this.subscribeEvents();
    this.updateAvatarView();
  }

  /**
   * Destroy every elements from the plugin
   * @return {[type]} [description]
   */
  destroy = () => {
    this.avatarView.destroy();

    if (this.activeItemSubscription) {
      this.activeItemSubscription.dispose();
    }
  }

  /**
   * Updates data in "avatarView"
   */
  updateAvatarView = () => {
    this.avatarView.updateLevel(this.character.level);
    this.avatarView.setPercentage(this.character.experience * 100 / Misc.getCurrentLevelExp(this.character.level));
  }

  /**
   * Subscribing to atom events
   */
  subscribeEvents = () => {
    if (!atom.workspace.getActiveTextEditor()) {
      return;
    }

    atom.workspace.getActiveTextEditor().getBuffer().onDidChange(() => {
      this.character.addExperience(1);

      if (this.character.experience >= Misc.getCurrentLevelExp(this.character.level)) {
        this.character.levelUp();
      }

      this.updateAvatarView();
    });
  }
}
