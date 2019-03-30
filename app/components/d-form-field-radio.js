import Component from '@ember/component';
import { copy } from '@ember/object/internals';
import { observer } from '@ember/object';
import { get } from '@ember/object';

export default Component.extend({
  field: null,
  deleteItem: 'deleteItem',
  optionToAdd: null,

  onChangeInline: observer('field.inline', function() {
    const field = this.get('field');
    let formFieldAttributes = get(this, 'field.formFieldAttributes') || {};
    const inline = get(field, 'inline');
    formFieldAttributes.inline = inline || false;
    field.set('formFieldAttributes', copy(formFieldAttributes));
  }),

  actions: {
    addOption() {
      const field = this.get('field');
      let optionText = this.get('optionToAdd');
      if (!optionText) {
        return;
      }
      const ffo = this.get('field.fieldOptions') || {};
      ffo[optionText] = optionText;
      field.set('fieldOptions', copy(ffo));
      this.set('optionToAdd', '');

      this.$('input[type=text]').focus();

      return null;
    },
    removeOption(optionText) {
      if(!confirm('Tem certeza que deseja deletar essa opção?\nEssa ação não pode ser desfeita.')) {
        return null;
      }

      const ffo = this.get('field.fieldOptions') || {};
      delete ffo[optionText];
      this.set('field.fieldOptions', copy(ffo));
    },

    deleteItem() {
      this.sendAction('deleteItem', this.get('field'));

    }
  }
});
