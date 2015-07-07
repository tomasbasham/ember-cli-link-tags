import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../helpers/start-app';

var App;

module('Integration | Mixin | Linkable', {
  beforeEach: function() {
    App = startApp();
  },

  afterEach: function() {
    Ember.run(App, 'destroy');
  }
});

test('it sets link tags', function(assert) {
  visit('/index');
  andThen(function() {
    var canonical = find('link[rel="canonical"]', 'head');

    assert.equal(canonical.length, 1);
    assert.equal(canonical.first().attr('href'), '/');
  });

  visit('/posts');
  andThen(function() {
    var canonical, next;

    canonical = find('link[rel="canonical"]', 'head');
    next = find('link[rel="next"]', 'head');

    assert.equal(canonical.length, 1);
    assert.equal(canonical.first().attr('href'), '/posts');

    assert.equal(next.length, 1);
    assert.equal(next.first().attr('href'), '/posts?page=2');
  });
});
