import Mixin from '@ember/object/mixin';

import documentHead from 'ember-cli-link-tags/utils/document-head';

import { get, getWithDefault, set } from '@ember/object';
import { run } from '@ember/runloop';
import { isEmpty } from '@ember/utils';

export default Mixin.create({

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

    const selectorString = linkSelectors.join(',');

    // Remove all the link tags from the head.
    documentHead.querySelectorAll(selectorString).forEach(e => e.remove());
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
    const links = this._links();
    const linkSelectors = [];
    const linkElements = [];

    for (let relationship in links) {
      if (links.hasOwnProperty(relationship)) {
        linkSelectors.push(`link[rel="${relationship}"]`);
        linkElements.push(this._createLink(relationship, links[relationship]));
      }
    }

    linkElements.forEach(e => documentHead.appendChild(e));
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
    const links = getWithDefault(this, 'links', {});

    if (typeof links === 'function') {
      return links.apply(this);
    }

    return links;
  },

  /*
   * Create and return a new link DOM
   * element with the both a rel and href
   * attribute.
   *
   * @method createLink
   * @private
   *
   * @param {String} relationship
   *   String value to be placed in the rel attribute.
   *
   * @param {String} href
   *   String value to be placed in the href attribute.
   *
   * @return {Element}
   *   Link element.
   */
  _createLink(relationship, href) {
    const link = window.document.createElement('link');

    link.setAttribute('rel', relationship);
    link.setAttribute('href', href);

    return link;
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
      this._super(...arguments);
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
      this._super(...arguments);
      run.next(this, this.addLinksToHead);
      return true;
    }
  }
});
