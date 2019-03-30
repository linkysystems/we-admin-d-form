import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { getOwner } from '@ember/application';
import { hash } from 'rsvp';

let ENV;

export default Route.extend(AuthenticatedRouteMixin, {
  init() {
    this._super(...arguments);

    ENV = getOwner(this).resolveRegistration('config:environment');
  },
  model() {
    const parentModel = this.modelFor('d-forms.item');
    const form = get(parentModel, 'record');

    return  hash({
      ENV: ENV,
      form: form,
      fields: this.get('store').query('d-form-field', {
        formId: form.id,
        order: 'weight ASC'
      }),
      records: this.get('store').query('d-form-answer', {
        formId: form.id
      })
    });
  }
});
