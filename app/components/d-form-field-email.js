import Component from '@ember/component';

export default Component.extend({
  field: null,

  deleteItem: 'deleteItem',

  didReceiveAttrs() {
    this._super(...arguments);
    const validate = !this.get('field.validate') || {};
    if (!validate || !validate.isEmail) {
      this.set('field.validate', { 'isEmail': true });
    }
  },

  actions: {
    save() {},
    deleteItem() {
      this.sendAction('deleteItem', this.get('field'));
    }
  }
});
