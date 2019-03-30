import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  term: inject(),

  model() {
    return {
      record: this.store.createRecord('d-form', {
        published: false
      })
    };
  },
  actions: {
    save(record) {
      record.save()
      .then( (r)=> {
        this.get('notifications')
            .success('Formulário registrado com sucesso.');

        this.transitionTo('/d-forms/'+ r.id);
        this.send('scrollToTop');
        // success
        return r;
      })
      .catch( (err)=> {
        this.send('queryError', err);
        return null;
      });
    }
  }
});