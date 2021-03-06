import Component from '@ember/component';
import { observer } from '@ember/object';
import { copy } from '@ember/object/internals';
import { get } from '@ember/object';

export default Component.extend({
  field: null,
  deleteItem: 'deleteItem',

  rows: 5,
  maxlength: null,

  rowsValueChanged: observer('rows', function() {
    const field = this.get('field');
    let formFieldAttributes = get(this, 'field.formFieldAttributes') || {};

    const rows = get(this, 'rows');
    if (rows) {
      formFieldAttributes.rows = rows;
    } else {
      delete formFieldAttributes.rows;
    }
    field.set('formFieldAttributes', copy(formFieldAttributes));
  }),
  maxlengthValueChanged: observer('maxlength', function() {
    const field = this.get('field');
    let formFieldAttributes = get(this, 'field.formFieldAttributes') || {};

    const maxlength = get(this, 'maxlength');
    if (maxlength) {
      formFieldAttributes.maxlength = maxlength;
    } else {
      delete formFieldAttributes.maxlength;
    }
    field.set('formFieldAttributes', copy(formFieldAttributes));
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    const ffa = this.get('field.formFieldAttributes') || {};
    if (!ffa || !ffa.rows) {
      ffa.rows = 5; // set the default value
    }

    this.set('field.formFieldAttributes', ffa);
    this.set('rows', ffa.rows);
    this.set('maxlength', this.get('field.formFieldAttributes.maxlength') || null);
  },

  actions: {
    save() {},
    deleteItem() {
      this.sendAction('deleteItem', this.get('field'));
    }
  }
});
