import test from 'node:test';
import assert from 'node:assert/strict';
import {
  paginate,
  wrapIndex,
  validFacebookPostUrl,
  validLinkedInUrn,
  linkedInEmbedUrl,
  linkedInPostUrl,
} from '../lib/social.mjs';

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

test('LinkedIn urns are validated and turned into embed and post links', () => {
  assert.ok(validLinkedInUrn('urn:li:share:7511406811300831233'));
  assert.ok(validLinkedInUrn('urn:li:ugcPost:123'));
  assert.ok(validLinkedInUrn('urn:li:activity:123'));
  assert.ok(!validLinkedInUrn('urn:li:share:abc'));
  assert.ok(!validLinkedInUrn('https://evil.example/urn:li:share:1'));
  assert.ok(!validLinkedInUrn('urn:li:share:1"><script>'));
  assert.equal(
    linkedInEmbedUrl('urn:li:share:1'),
    'https://www.linkedin.com/embed/feed/update/urn:li:share:1?collapsed=1',
  );
  assert.equal(
    linkedInPostUrl('urn:li:share:1'),
    'https://www.linkedin.com/feed/update/urn:li:share:1/',
  );
});
