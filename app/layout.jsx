import Link from 'next/link';
import Script from 'next/script';
import { site, projects, gallery } from '@/lib/content';
import CookieConsent, { CookieSettingsButton } from '@/components/cookie-consent';
import Navigation from '@/components/navigation';
import './globals.css';
export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'SMILE Research Group · University of Michigan-Flint',
    template: '%s · SMILE Research Group',
  },
  description: site.description,
  icons: { icon: '/images/favicon.ico' },
};
const GA_ID = 'G-LLNHS5DT91';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
var c='denied';try{c=localStorage.getItem('cookie-consent')==='granted'?'granted':'denied';}catch(e){}
gtag('consent','default',{analytics_storage:c,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <aside className="sidebar">
          <Link href="/" className="lab-brand" aria-label="SMILE Research Group home">
            <span className="brand-caption">
              SMILE
              <br />
              Research Group
            </span>
          </Link>
          <Navigation
            extraLinks={[
              ...(projects.length ? [['/research/', 'Research']] : []),
              ...(gallery.length ? [['/pictures/', 'Pictures']] : []),
            ]}
          />
        </aside>
        <div className="site-body">
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <footer>
            <div>
              We are part of the{' '}
              <a href="https://directory.umflint.edu/cit/mmkaouer">
                College of Innovation &amp; Technology
              </a>{' '}
              at the <a href="https://umflint.edu/">University of Michigan-Flint</a>.
            </div>
            <CookieSettingsButton />
          </footer>
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
