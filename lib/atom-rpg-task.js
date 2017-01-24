'use babel';

import { RpgTaskBuilder } from './rpg-task-builder.js';

export default {
  taskBuilder: null,

  activate(state) {
    this.taskBuilder = new RpgTaskBuilder();
    this.taskBuilder.init();
  },

  deactivate() {
    this.taskBuilder.destroy();
  }
};
