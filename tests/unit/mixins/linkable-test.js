import Ember from 'ember';
import LinkableMixin from 'ember-cli-link-tags/mixins/linkable';
import sinon from 'sinon';
import { module, test } from 'qunit';

module('Unit | Mixin | linkable');

test('it works', function(assert) {
  var LinkableRoute = Ember.Route.extend(LinkableMixin);
  var subject = LinkableRoute.create();
  assert.ok(subject);
});

test('it calls removeLinksFromHead', function(assert) {
  var LinkableRoute = Ember.Route.extend(LinkableMixin);
  var subject = LinkableRoute.create();

  subject.removeLinksFromHead = sinon.spy();
  subject.send('willTransition');

  assert.ok(subject.removeLinksFromHead.calledOnce);
});

test('it calls addLinksToHead', function(assert) {
  var LinkableRoute = Ember.Route.extend(LinkableMixin);
  var subject = LinkableRoute.create();
  var called = assert.async();

  subject.addLinksToHead = sinon.spy();
  subject.send('didTransition');

  Ember.run.next(function() {
    assert.ok(subject.addLinksToHead.calledOnce);
    called();
  });
});
