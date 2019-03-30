import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { getOwner } from '@ember/application';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  i18n: inject(),
  model() {
    return  hash({
      ENV: getOwner(this).resolveRegistration('config:environment'),
      records: this.get('store').query('d-form-answer', {}),
      columns: [
        {
          propertyName: 'id',
          title: 'ID',
          className: 'mt-c-id'
        },
        {
          propertyName: 'name',
          filteredBy: 'name_contains',
          title: 'Nome',
          className: 'mt-c-name text-cell'
        },
        {
          propertyName: 'email',
          filteredBy: 'email_contains',
          title: 'Email',
          className: 'mt-c-email text-cell'
        },
        {
          propertyName: 'createdAt',
          filteredBy: 'createdAt',
          title: 'Criado em',
          component: 'mt-list-item-created-at',
          className: 'mt-c-createdAt'
        },
        {
          propertyName: 'actions',
          disableSorting: true,
          disableFiltering: true,
          title: 'Ações',
          component: 'mt-actions-d-form-answer'
        }
      ]
    });
  }
});
