// Helpers for the Facebook post carousel and feed. Posts must be public to be embedded.
export const FACEBOOK_POST_URL = /^https:\/\/www\.facebook\.com\/[A-Za-z0-9.\-_]+\/posts\/\d+\/?$/;
export const CAROUSEL_COUNT = 5;
export const FEED_PAGE_SIZE = 10;
// Same SDK version the previous Hugo site used. Meta's embedded-posts docs still show it.
export const FACEBOOK_SDK_VERSION = 'v3.2';

export function validFacebookPostUrl(value) {
  return typeof value === 'string' && FACEBOOK_POST_URL.test(value);
}

export function paginate(items, page, size = FEED_PAGE_SIZE) {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(Math.max(1, Math.trunc(page) || 1), pages);
  return { page: current, pages, items: items.slice((current - 1) * size, current * size) };
}

export function wrapIndex(index, length) {
  return length ? ((index % length) + length) % length : 0;
}
