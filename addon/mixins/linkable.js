import Ember from 'ember';
import documentHead from 'ember-cli-link-tags/utils/document-head';

const {
  get,
  isEmpty,
  set
} = Ember;

const {
  keys
} = Object;

export default Ember.Mixin.create({

  /*
   * Remove all link tags from the DOM
   * so we are presented with a clean
   * slate. This should be called before
   * adding new link tags to the DOM.
   *
   * @method removeLinksFromHead
   */
  removeLinksFromHead() {
    const linkSelectors = get(this, 'currentRouteLinkSelectors');

    if (isEmpty(linkSelectors)) {
      return;
    }

    // Remove all the link tags from the head.
    documentHead.find(linkSelectors.join(',')).remove();
    set(this, 'currentRouteLinkSelectors', null);
  },

  /*
   * Insert link tags into the DOM. This
   * should ideally be run from within the
   * emberjs runloop to provide greater
   * efficiency when manipulating the DOM.
   *
   * @method addLinksToHead
   */
  addLinksToHead() {
    const cloneLink = function() {
      return Ember.$('<link>').clone();
    };

    const links = this._links();
    const linkSelectors = [];
    const linkElements = [];

    keys(links).map(function(relationship) {
      if (links.hasOwnProperty(relationship)) {
        linkSelectors.push(`link[rel="${relationship}"]`);
        linkElements.push(cloneLink().attr('rel', relationship).attr('href', links[relationship]));
      }
    });

    documentHead.append(linkElements);
    this.set('currentRouteLinkSelectors', linkSelectors);
  },

  /*
   * Return a hash of link values for
   * this route.
   *
   * Since we may set the links property
   * on a route as either a plain
   * JavaScript object or a function
   * returning a plain JavaScript object
   * this function will either simply
   * return a hash or invoke the links
   * function in the context of the route.
   *
   * @method links
   * @private
   *
   * @return {Object}
   *   Link values.
   */
  _links() {
    const links = get(this, 'links');

    if (typeof links === 'function') {
      return links.apply(this);
    }

    return links || {};
  },

  actions: {

    /*
     * Trigger the route to remove link
     * tags from the DOM before a complete
     * transitions occurs.
     *
     * @method willTransition
     */
    willTransition() {
      this._super.apply(this, arguments);
      this.removeLinksFromHead();
      return true;
    },

    /*
     * Trigger the route to add link tags
     * into the DOM after a complete
     * transition occurs.
     *
     * @method didTransition
     */
    didTransition() {
      this._super.apply(this, arguments);
      Ember.run.next(this, this.addLinksToHead);
      return true;
    }
  }
});
