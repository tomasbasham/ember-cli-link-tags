import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | linkable');

test('it sets link tags', function(assert) {
  visit('/index');

  andThen(function() {
    let canonical = find('link[rel="canonical"]', 'head');

    assert.equal(canonical.length, 1);
    assert.equal(canonical.first().attr('href'), '/');
  });

  visit('/posts');

  andThen(function() {
    let canonical = find('link[rel="canonical"]', 'head');
    let next = find('link[rel="next"]', 'head');

    assert.equal(canonical.length, 1);
    assert.equal(canonical.first().attr('href'), '/posts');

    assert.equal(next.length, 1);
    assert.equal(next.first().attr('href'), '/posts?page=2');
  });
});
