import { useEffect, useState } from 'react';
import { CV_DATA, type CVData, type Lang } from './data';

const SECTION_IDS = ['about', 'stack', 'experience', 'projects', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

const CHANNEL_ICONS = ['✉', '✦', '◐', '◉'];

type Theme = 'light' | 'dark';

function useReveal(dep: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

function useActiveSection(ids: readonly SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const trigger = window.innerHeight * 0.35;
      let cur: SectionId = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= trigger) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);
  return active;
}

type NavProps = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: CVData;
  active: SectionId;
};

function Nav({ lang, setLang, theme, setTheme, t, active }: NavProps) {
  const labels: { id: SectionId; label: string }[] = [
    { id: 'about', label: t.nav.about },
    { id: 'stack', label: t.nav.stack },
    { id: 'experience', label: t.nav.experience },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ];
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="logo">
          <span className="mono">AN</span>
          <strong>{t.meta.name}</strong>
        </a>
        <div className="nav-links">
          {labels.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={'nav-link' + (active === l.id ? ' on' : '')}>{l.label}</a>
          ))}
        </div>
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
  );
}

function Hero({ t }: { t: CVData }) {
  return (
    <header className="hero" id="top">
      <div className="hero-status reveal in">
        <span className="pulse"></span>
        <span>{t.hero.status}</span>
      </div>
      <h1 className="hero-name reveal in">{t.meta.name}</h1>
      <p className="hero-role reveal in">
        <strong>{t.meta.title}</strong> — {t.hero.intro}
      </p>
      <div className="hero-chips reveal in">
        <span className="chip"><span className="label">location</span><span className="val">{t.meta.location}</span></span>
        <span className="chip"><span className="label">exp</span><span className="val">{t.meta.experience}</span></span>
        <span className="chip"><span className="label">english</span><span className="val">{t.meta.english}</span></span>
        <span className="chip"><span className="label">salary</span><span className="val">{t.meta.salary}</span></span>
        <span className="chip"><span className="label">mode</span><span className="val">{t.meta.availability}</span></span>
      </div>
      <div className="hero-cta reveal in">
        <a href="#contact" className="btn">
          {t.hero.cta}
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4"/></svg>
        </a>
        <button className="btn ghost" onClick={() => window.print()}>
          {t.hero.ctaSecondary}
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M7 2v8m0 0L4 7m3 3l3-3M2 12h10"/></svg>
        </button>
      </div>
      {/* {t.hero.currentFocus && (
        <div className="hero-current reveal in">
          <span className="nowbar"></span>
          <span className="lbl">{t.ui.now}</span>
          <span>{t.hero.currentFocus}</span>
        </div>
      )} */}
    </header>
  );
}

function About({ t }: { t: CVData }) {
  return (
    <section id="about" className="about">
      <div className="sec-label reveal">{t.about.kicker}</div>
      <h2 className="sec-h reveal">{t.about.heading}</h2>
      <div className="reveal">
        {t.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </section>
  );
}

function Stack({ t }: { t: CVData }) {
  return (
    <section id="stack">
      <div className="sec-label reveal">{t.stack.kicker}</div>
      <h2 className="sec-h reveal">{t.stack.heading}</h2>
      <div className="stack-groups reveal">
        {t.stack.groups.map((g, i) => (
          <div key={i} className="stack-group">
            <h3>{g.name}</h3>
            <div className="stack-items">
              {g.items.map((it, j) => <span key={j} className="stack-tag">{it}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience({ t }: { t: CVData }) {
  return (
    <section id="experience">
      <div className="sec-label reveal">{t.experience.kicker}</div>
      <h2 className="sec-h reveal">{t.experience.heading}</h2>
      <div className="timeline">
        {t.experience.items.map((e, i) => {
          const isNow = e.period.includes('Present') || e.period.includes('настоящее');
          return (
            <div key={i} className="job reveal">
              <div className="job-head">
                <span className="job-company">{e.company}</span>
                <span className="job-period">
                  {e.period}
                  {isNow && <span className="now">{t.ui.now}</span>}
                </span>
              </div>
              <div className="job-role">{e.role}</div>
              <div className="job-note">{e.note}</div>
              <ul className="job-bullets">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
              <div className="job-stack">
                {e.stack.map((s, j) => <span key={j}>{s}</span>)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Projects({ t }: { t: CVData }) {
  return (
    <section id="projects">
      <div className="sec-label reveal">{t.projects.kicker}</div>
      <h2 className="sec-h reveal">{t.projects.heading}</h2>
      <div className="projects reveal">
        {t.projects.items.map((p, i) => (
          <div key={i} className="proj">
            <div className="proj-head">
              <span className="proj-name">{p.name}</span>
              <span className="proj-role">{p.role}</span>
            </div>
            <p className="proj-desc">{p.desc}</p>
            <div className="proj-meta">
              <div className="proj-tags">
                {p.tags.map((tg, j) => <span key={j}>{tg}</span>)}
              </div>
              {p.installs && <span className="proj-badge">● {p.installs}</span>}
            </div>
            {p.links && p.links.length > 0 && (
              <div className="proj-links">
                {p.links.map((l, j) => (
                  <a key={j} href={l.href} target="_blank" rel="noopener noreferrer">↗ {l.label}</a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Education({ t }: { t: CVData }) {
  return (
    <section id="education">
      <div className="sec-label reveal">{t.education.kicker}</div>
      <h2 className="sec-h reveal">{t.education.heading}</h2>
      <div className="reveal">
        {t.education.items.map((e, i) => (
          <div key={i} className="edu">
            <div className="edu-school">{e.school}</div>
            <div className="edu-degree">{e.degree}</div>
            <div className="edu-period">{e.period}</div>
          </div>
        ))}
        <ul className="edu-extras">
          {t.education.extras.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      </div>
    </section>
  );
}

function Contact({ t }: { t: CVData }) {
  const [copied, setCopied] = useState<number | null>(null);
  return (
    <section id="contact">
      <div className="sec-label reveal">{t.contact.kicker}</div>
      <div className="contact-head">
        <div>
          <h2 className="sec-h reveal" style={{ marginBottom: 14 }}>{t.contact.heading}</h2>
          <p className="contact-blurb reveal">{t.contact.blurb}</p>
        </div>
      </div>
      <div className="channels reveal">
        {t.contact.channels.map((c, i) => (
          <a
            key={i}
            className="channel"
            href={c.href ?? '#'}
            target={c.href && c.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!c.href) {
                e.preventDefault();
                navigator.clipboard?.writeText(c.value);
                setCopied(i);
                setTimeout(() => setCopied(null), 1500);
              }
            }}
          >
            <span className="channel-ic">{CHANNEL_ICONS[i] ?? '·'}</span>
            <div className="channel-body">
              <div className="channel-label">{c.label}</div>
              <div className="channel-value">{c.value}</div>
            </div>
            <span className={'channel-action' + (copied === i ? ' ok' : '')}>
              {copied === i ? '✓' : c.href ? '↗' : '⎘'}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function BackTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={'back-top' + (show ? ' show' : '')}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
    >
      ↑
    </button>
  );
}

function readLang(): Lang {
  const v = localStorage.getItem('cv_lang');
  return v === 'ru' || v === 'en' ? v : 'en';
}

function readTheme(fallback: Theme): Theme {
  const v = localStorage.getItem('cv_theme');
  return v === 'light' || v === 'dark' ? v : fallback;
}

export function App() {
  const [lang, setLang] = useState<Lang>(readLang);
  const [theme, setTheme] = useState<Theme>(() => readTheme('dark'));
  const t = CV_DATA[lang];
  const active = useActiveSection(SECTION_IDS);

  useReveal(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('cv_lang', lang);
    localStorage.setItem('cv_theme', theme);
  }, [lang, theme]);

  return (
    <>
      <Nav lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t} active={active} />
      <main className="page">
        <Hero t={t} />
        <About t={t} />
        <Stack t={t} />
        <Experience t={t} />
        <Projects t={t} />
        <Education t={t} />
        <Contact t={t} />
        <footer>
          <span>© {new Date().getFullYear()} <span className="l">{t.meta.name}</span></span>
          <span>{t.meta.handle} · {t.meta.location}</span>
        </footer>
      </main>
      <BackTop />
    </>
  );
}
