import Route from '@ember/routing/route';
import Linkable from 'ember-cli-link-tags/mixins/linkable';

export default Route.extend(Linkable, {
  links() {
    return {
      canonical: '/'
    }
  }
});
