import Component from '@ember/component';
import { observer } from '@ember/object';
import { copy } from '@ember/object/internals';
import { get } from '@ember/object';

export default Component.extend({
  field: null,

  deleteItem: 'deleteItem',

  'data-viewformat': null,

  viewFormatChanged: observer('data-viewformat', function() {
    const field = this.get('field');
    let formFieldAttributes = get(this, 'field.formFieldAttributes') || {};

    const v = get(this, 'data-viewformat');
    if (v) {
      formFieldAttributes['data-viewformat'] = v;
    } else {
      delete formFieldAttributes['data-viewformat'];
    }
    field.set('formFieldAttributes', copy(formFieldAttributes));
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('data-viewformat', this.get('field.formFieldAttributes.data-viewformat'));
  },

  actions: {
    save() {},
    deleteItem() {
      this.sendAction('deleteItem', this.get('field'));
    }
  }
});
