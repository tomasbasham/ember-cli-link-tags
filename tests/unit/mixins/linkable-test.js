import Ember from 'ember';
import LinkableMixin from '../../../mixins/linkable';
import { module, test } from 'qunit';
import Sinon from 'sinon';

const {
  run
} = Ember;

let sandbox;

module('Unit | Mixin | linkable', {
  beforeEach() {
    sandbox = Sinon.sandbox.create();
  },

  afterEach() {
    sandbox.restore();
  }
});

test('it calls removeLinksFromHead', function(assert) {
  let LinkableRoute = Ember.Route.extend(LinkableMixin);
  let subject = LinkableRoute.create();

  const spy = sandbox.spy(subject, 'removeLinksFromHead');

  subject.send('willTransition');
  assert.ok(spy.calledOnce);
});

test('it calls addLinksToHead', function(assert) {
  let LinkableRoute = Ember.Route.extend(LinkableMixin);
  let subject = LinkableRoute.create();

  const done = assert.async();
  const spy = sandbox.spy(subject, 'addLinksToHead');

  subject.send('didTransition');
  run.next(function() {
    assert.ok(spy.calledOnce);
    done();
  });
});
