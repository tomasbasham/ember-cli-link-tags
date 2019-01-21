import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | linkable', function(hooks) {
  setupApplicationTest(hooks);

  test('it sets link tags', async function(assert) {
    await visit('/index');

    let canonical = document.head.querySelector('link[rel="canonical"]');

    assert.ok(canonical);
    assert.equal(canonical.getAttribute('rel'), 'canonical');
    assert.equal(canonical.getAttribute('href'), '/');

    await visit('/posts');

    canonical = document.head.querySelector('link[rel="canonical"]');
    let next = document.head.querySelector('link[rel="next"]');

    assert.ok(canonical);
    assert.equal(canonical.getAttribute('rel'), 'canonical');
    assert.equal(canonical.getAttribute('href'), '/posts');

    assert.ok(next);
    assert.equal(next.getAttribute('rel'), 'next');
    assert.equal(next.getAttribute('href'), '/posts?page=2');
  });
});
