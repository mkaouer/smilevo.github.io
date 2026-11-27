'use client';
import { useEffect, useState } from 'react';

const KEY = 'cookie-consent';
function apply(choice) {
  if (typeof window.gtag === 'function')
    window.gtag('consent', 'update', {
      analytics_storage: choice === 'granted' ? 'granted' : 'denied',
    });
}
export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    if (!saved) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener('open-cookie-settings', reopen);
    return () => window.removeEventListener('open-cookie-settings', reopen);
  }, []);
  const choose = (choice) => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {}
    apply(choice);
    setOpen(false);
  };
  if (!open) return null;
  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <p>
        This site uses Google Analytics cookies to count visits and see which pages are useful. They
        are only set if you accept.
      </p>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose('denied')}>
          Decline
        </button>
        <button type="button" className="primary" onClick={() => choose('granted')}>
          Accept
        </button>
      </div>
    </div>
  );
}
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="cookie-settings"
      onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
    >
      Cookie settings
    </button>
  );
}
