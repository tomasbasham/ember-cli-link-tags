import Ember from 'ember';

/*
 * Return the head element used
 * to append link tags.
 *
 * @method documentHead
 *
 * @return {Object}
 *   The head element in the DOM.
 */
function documentHead() {
  return Ember.$('head');
}

export default Ember.Mixin.create({

  /*
   * Remove all link tags from the DOM
   * so we are presented with a clean
   * slate. This should be called before
   * adding new link tags to the DOM.
   *
   * @method removeLinksFromHead
   */
  removeLinksFromHead: function() {
    var linkSelectors = this.get('currentRouteLinkSelectors');

    if (!linkSelectors) {
      return;
    }

    // Remove all the link tags from the head.
    documentHead().find(linkSelectors.join(',')).remove();
    this.set('currentRouteLinkSelectors', null);
  },

  /*
   * Insert link tags into the DOM. This
   * should ideally be run from within the
   * emberjs runloop to provide greater
   * efficiency when manipulating the DOM.
   *
   * @method addLinksToHead
   */
  addLinksToHead: function() {
    var cloneLink, links, linkSelectors, linkElements;

    cloneLink = function() {
      return Ember.$('<link>').clone();
    };

    links = this._links();
    linkSelectors = [];
    linkElements = [];

    Object.keys(links).map(function(relationship) {
      if (links.hasOwnProperty(relationship)) {
        linkSelectors.push('link[rel="' + relationship + '"]');
        linkElements.push(cloneLink().attr('rel', relationship).attr('href', links[relationship]));
      }
    });

    documentHead().append(linkElements);
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
  _links: function() {
    var links = this.get('links');

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
    willTransition: function() {
      this._super.apply(this, arguments);
      this.removeLinksFromHead();
    },

    /*
     * Trigger the route to add link tags
     * into the DOM after a complete
     * transition occurs.
     *
     * @method didTransition
     */
    didTransition: function() {
      this._super.apply(this, arguments);
      Ember.run.next(this, this.addLinksToHead);
    }
  }
});
