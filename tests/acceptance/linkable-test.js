import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | linkable', function(hooks) {
  setupApplicationTest(hooks);

  test('it sets link tags', async function(assert) {
    await visit('/index');

    let canonical = find('link[rel="canonical"]', 'head');

    assert.equal(canonical.length, 1);
    assert.equal(canonical.first().attr('href'), '/');

    await visit('/posts');

    canonical = find('link[rel="canonical"]', 'head');
    let next = find('link[rel="next"]', 'head');

    assert.equal(canonical.length, 1);
    assert.equal(canonical.first().attr('href'), '/posts');

    assert.equal(next.length, 1);
    assert.equal(next.first().attr('href'), '/posts?page=2');
  });
});
