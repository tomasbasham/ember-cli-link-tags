import Ember from 'ember';
import LinkableMixin from '../../../mixins/linkable';
import { module, test } from 'qunit';
import Sinon from 'sinon';

const {
  run
} = Ember;

const {
  spy
} = Sinon;

module('Unit | Mixin | linkable');

test('it calls removeLinksFromHead', function(assert) {
  let LinkableRoute = Ember.Route.extend(LinkableMixin);
  let subject = LinkableRoute.create();

  subject.removeLinksFromHead = spy();
  subject.send('willTransition');

  assert.ok(subject.removeLinksFromHead.calledOnce);
});

test('it calls addLinksToHead', function(assert) {
  let LinkableRoute = Ember.Route.extend(LinkableMixin);
  let subject = LinkableRoute.create();
  let called = assert.async();

  subject.addLinksToHead = spy();
  subject.send('didTransition');

  run.next(function() {
    assert.ok(subject.addLinksToHead.calledOnce);
    called();
  });
});
