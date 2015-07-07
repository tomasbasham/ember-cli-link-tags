import Ember from 'ember';
import Linkable from 'ember-cli-link-tags/mixins/linkable';

export default Ember.Route.extend(Linkable, {
  links: {
    canonical: '/'
  }
});
