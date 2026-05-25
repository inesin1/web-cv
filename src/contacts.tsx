import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CV_DATA, type Lang } from './data';

type Theme = 'light' | 'dark';

function readLang(): Lang {
  const v = localStorage.getItem('cv_lang');
  return v === 'ru' || v === 'en' ? v : 'en';
}

function readTheme(): Theme {
  const v = localStorage.getItem('cv_theme');
  return v === 'light' || v === 'dark' ? v : 'dark';
}

function ContactsPage() {
  const [lang, setLang] = useState<Lang>(readLang);
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [copied, setCopied] = useState<number | null>(null);
  const t = CV_DATA[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('cv_lang', lang);
    localStorage.setItem('cv_theme', theme);
  }, [lang, theme]);

  const copy = (i: number, value: string) => {
    navigator.clipboard?.writeText(value);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="logo">
            <span className="mono">AN</span>
            <strong>{t.meta.name}</strong>
          </a>
          <div className="nav-spacer" />
          <div className="ctrls">
            <div className="seg">
              <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
              <button className={lang === 'ru' ? 'on' : ''} onClick={() => setLang('ru')}>RU</button>
            </div>
            <div className="seg">
              <button className={theme === 'light' ? 'on' : ''} onClick={() => setTheme('light')} aria-label="Light mode" title="Light">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
              </button>
              <button className={theme === 'dark' ? 'on' : ''} onClick={() => setTheme('dark')} aria-label="Dark mode" title="Dark">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="page">
        <header className="hero">
          <div className="sec-label">{t.contact.kicker}</div>
          <h1 className="hero-name">{t.contact.heading}</h1>
          <p className="hero-role">{t.contact.blurb}</p>
        </header>

        <section className="channels-section">
          <div className="channels">
            {t.contact.channels.map((c, i) => {
              const isExternal = c.href?.startsWith('http');
              return (
                <a
                  key={i}
                  className="channel"
                  href={c.href ?? '#'}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (!c.href) {
                      e.preventDefault();
                      copy(i, c.value);
                    }
                  }}
                >
                  <span className="channel-ic">{c.icon}</span>
                  <div className="channel-body">
                    <div className="channel-label">{c.label}</div>
                    <div className="channel-value">{c.value}</div>
                  </div>
                  <span className={'channel-action' + (copied === i ? ' ok' : '')}>
                    {copied === i ? '✓' : c.href ? '↗' : '⎘'}
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        <footer>
          <span>© {new Date().getFullYear()} <span className="l">{t.meta.name}</span></span>
          <a href="/" className="back-link">← {t.meta.handle}</a>
        </footer>
      </main>
    </>
  );
}

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('root element not found');

createRoot(rootEl).render(
  <StrictMode>
    <ContactsPage />
  </StrictMode>,
);
