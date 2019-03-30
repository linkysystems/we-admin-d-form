import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
  i18n: inject(),
  model() {
    return  hash({
      records: this.get('store').query('d-form', {}),
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
          propertyName: 'publishedAt',
          disableSorting: true,
          disableFiltering: true,
          title: 'Publicado em',
          component: 'mt-list-item-created-at',
          className: 'mt-c-publishedAt'
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
          component: 'mt-actions-d-form'
        }
      ]
    });
  }
});
