import Route from '@ember/routing/route';
import Sinon from 'sinon';

import LinkableMixin from 'ember-cli-link-tags/mixins/linkable';

import { run } from '@ember/runloop';
import { module, test } from 'qunit';

let sandbox;

module('Unit | Mixin | linkable', function(hooks) {
  hooks.beforeEach(function() {
    sandbox = Sinon.sandbox.create();
  });

  hooks.afterEach(function() {
    sandbox.restore();
  });

  test('it calls removeLinksFromHead', function(assert) {
    let LinkableRoute = Route.extend(LinkableMixin);
    let subject = LinkableRoute.create();

    const spy = sandbox.spy(subject, 'removeLinksFromHead');

    subject.send('willTransition');
    assert.ok(spy.calledOnce);
  });

  test('it calls addLinksToHead', function(assert) {
    let LinkableRoute = Route.extend(LinkableMixin);
    let subject = LinkableRoute.create();

    const done = assert.async();
    const spy = sandbox.spy(subject, 'addLinksToHead');

    subject.send('didTransition');
    run.next(function() {
      assert.ok(spy.calledOnce);
      done();
    });
  });
});
