import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { getOwner } from '@ember/application';

let ENV;

export default Controller.extend({
  ajax: inject(),
  session: inject('session'),
  settings: inject('settings'),

  init() {
    this._super(...arguments);
    ENV = getOwner(this).resolveRegistration('config:environment');
  },

  actions: {
    searchCategoryTerms(term) {
      let url = `${ENV.API_HOST}/api/v1/term-texts?term=${term}&vocabularyName=Category`;
      return this.get('ajax')
      .request(url)
      .then((json) => json.term );
    },
    searchTagsTerms(term) {
      let url = `${ENV.API_HOST}/api/v1/term-texts?term=${term}&vocabularyName=Tags`;
      return this.get('ajax')
      .request(url)
      .then((json) => {
        // add current term in  terms returned from backend search:
        json.term.push(term);
        return json.term;
      });
    },
    changeDate(record, field, dates) {
      if (!dates || !dates[0]) {
        return;
      }
      this.get('model.record').set(field, dates[0]);
    }
  }
});
