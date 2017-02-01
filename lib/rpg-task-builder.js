'use babel'

import { Character } from './character.js';
import { Misc } from './misc.js'
import { AvatarView } from './views/avatar-view.js';
import { ModalTasksView } from './views/modal-tasks-view.js';

export class RpgTaskBuilder {
  avatarView = null;

  // Events
  activeItemSubscription = null;

  /**
   * Initialize the plugin
   */
  init = () => {
    this.avatarView = new AvatarView();
    Misc.character = new Character();

    let modalTasks = new ModalTasksView();
    modalTasks.show();

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
    this.avatarView.updateLevel(Misc.character.level);
    this.avatarView.setPercentage(Misc.character.experience * 100 / Misc.getCurrentLevelExp(Misc.character.level));
  }

  /**
   * Subscribing to atom events
   */
  subscribeEvents = () => {
    if (!atom.workspace.getActiveTextEditor()) {
      return;
    }

    atom.workspace.getActiveTextEditor().getBuffer().onDidChange(() => {
      Misc.character.addExperience(1);

      if (Misc.character.experience >= Misc.getCurrentLevelExp(Misc.character.level)) {
        Misc.character.levelUp();
      }

      this.updateAvatarView();
    });
  }
}
