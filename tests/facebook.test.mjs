import test from 'node:test';
import assert from 'node:assert/strict';
import { paginate, wrapIndex, validFacebookPostUrl } from '../lib/facebook.mjs';

test('pagination clamps pages and slices 10 per page by default', () => {
  const items = Array.from({ length: 22 }, (_, i) => i);
  assert.equal(paginate(items, 1).items.length, 10);
  assert.equal(paginate(items, 3).items.length, 2);
  assert.equal(paginate(items, 99).page, 3);
  assert.equal(paginate(items, 0).page, 1);
  assert.equal(paginate([], 1).pages, 1);
});

test('carousel index wraps in both directions', () => {
  assert.equal(wrapIndex(5, 5), 0);
  assert.equal(wrapIndex(-1, 5), 4);
  assert.equal(wrapIndex(3, 0), 0);
});

test('only public-post style Facebook URLs are accepted', () => {
  assert.ok(validFacebookPostUrl('https://www.facebook.com/mkaouer/posts/10170794214640453'));
  assert.ok(!validFacebookPostUrl('http://www.facebook.com/mkaouer/posts/1'));
  assert.ok(!validFacebookPostUrl('https://evil.example/facebook.com/mkaouer/posts/1'));
  assert.ok(!validFacebookPostUrl('javascript:alert(1)'));
});
