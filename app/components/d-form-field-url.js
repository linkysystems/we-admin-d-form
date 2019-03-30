import Component from '@ember/component';

export default Component.extend({
  field: null,
  deleteItem: 'deleteItem',

  actions: {
    save() {},
    deleteItem() {
      this.sendAction('deleteItem', this.get('field'));
    }
  }
});
