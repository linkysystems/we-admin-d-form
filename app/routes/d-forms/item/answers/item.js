import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    const parentModel = this.modelFor('d-forms.item');
    const form = get(parentModel, 'record');

    return hash({
      form: form,
      fields: this.get('store').query('d-form-field', {
        formId: form.id,
        order: 'weight ASC'
      }),
      record: this.get('store').findRecord('d-form-answer', params.answerId)
    });
  }
});