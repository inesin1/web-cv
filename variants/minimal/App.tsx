import { type HTMLAttributes, type ReactNode, useEffect, useRef, useState } from 'react';
import { CV_DATA, type CVData, type Lang } from '@/data';

type Theme = 'light' | 'dark';

const MARQUEE_TOKENS = ['TypeScript', 'Node.js', 'NestJS', 'Vue 3', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'REST', 'OAuth', 'Cursor', 'Vite'];

function useCursor() {
  useEffect(() => {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let rafId = 0;

    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest('a, button, .cta, .stack-card, .exp-item, .proj-row, .channel, .seg');
      const text = target?.closest('p, h1, h2, h3, span:not(.dot), li');
      ring.classList.toggle('is-link', !!link);
      ring.classList.toggle('is-text', !link && !!text);
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    loop();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

function magnetize(el: HTMLElement | null, strength = 0.25): () => void {
  if (!el) return () => {};
  const onMove = (e: MouseEvent) => {
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${mx * strength}px, ${my * strength}px)`;
  };
  const onLeave = () => { el.style.transform = 'translate(0,0)'; };
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);
  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
  };
}

type MagneticProps = { children: ReactNode; strength?: number } & HTMLAttributes<HTMLSpanElement>;
function Magnetic({ children, strength = 0.25, ...rest }: MagneticProps) {
  const r = useRef<HTMLSpanElement>(null);
  useEffect(() => magnetize(r.current, strength), [strength]);
  return (
    <span ref={r} style={{ display: 'inline-block', transition: 'transform .25s cubic-bezier(.2,.7,.3,1)' }} {...rest}>
      {children}
    </span>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

type TopBarProps = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: CVData;
};

function TopBar({ lang, setLang, theme, setTheme, t }: TopBarProps) {
  return (
    <div className="topbar">
      <div className="brand">
        <span className="dot"></span>
        <span>AN&nbsp;·&nbsp;{t.meta.handle}</span>
        <span style={{ marginLeft: 12, opacity: .6 }}>{t.hero.status}</span>
      </div>
      <div className="controls">
        <div className="seg" role="tablist" aria-label="Language">
          <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          <button className={lang === 'ru' ? 'on' : ''} onClick={() => setLang('ru')}>RU</button>
        </div>
        <span className="ctrl-divider"></span>
        <div className="seg" role="tablist" aria-label="Theme">
          <button className={theme === 'light' ? 'on' : ''} onClick={() => setTheme('light')}>{t.ui.theme_light}</button>
          <button className={theme === 'dark' ? 'on' : ''} onClick={() => setTheme('dark')}>{t.ui.theme_dark}</button>
        </div>
      </div>
    </div>
  );
}

function Hero({ t }: { t: CVData }) {
  const words = t.meta.name.split(' ');
  return (
    <section className="hero">
      <div className="hero-meta reveal">
        <span>{t.meta.location}</span>
        <span>{t.meta.experience}</span>
        <span>EN {t.meta.english}</span>
        <span>{t.meta.availability}</span>
      </div>
      <h1 className="reveal">
        {words.map((w, i) => (
          <span key={i} className={i === words.length - 1 ? 'italic' : ''} style={{ display: 'inline-block', marginRight: '0.18em' }}>
            <Magnetic strength={0.18}>{w}</Magnetic>
          </span>
        ))}
      </h1>
      <div className="hero-sub reveal">
        <p className="hero-tag">{t.hero.tagline}</p>
        <p className="hero-intro">{t.hero.intro}</p>
      </div>
      <div className="hero-foot reveal">
        <div className="hero-stack">
          <strong>{t.meta.title}</strong><br/>
          {t.meta.subtitle}
        </div>
        <div className="hero-cta-row">
          <Magnetic>
            <a href="#contact" className="cta">
              {t.hero.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7h8M7 3l4 4-4 4"/></svg>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#" className="cta ghost" onClick={(e) => { e.preventDefault(); window.print(); }}>
              {t.hero.ctaSecondary}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 2v8m0 0L4 7m3 3l3-3M2 12h10"/></svg>
            </a>
          </Magnetic>
        </div>
      </div>
      <div className="scroll-hint">{t.ui.scrollHint}<span className="line"></span></div>
    </section>
  );
}

function About({ t }: { t: CVData }) {
  return (
    <section className="s" id="about">
      <div className="s-head">
        <span className="s-num">01</span>
        <span className="s-kicker">{t.about.kicker}</span>
        <h2 className="s-title reveal">{t.about.heading}</h2>
      </div>
      <div className="about-grid">
        <div className="about-side reveal">
          5 / 7<br/>
          <span style={{ display: 'block', marginTop: 8, fontFamily: 'var(--serif)', fontSize: 14, fontStyle: 'italic', textTransform: 'none', letterSpacing: 0, color: 'var(--ink-2)' }}>
            Five years of commercial backend & fullstack work. Last two — leading on architecture.
          </span>
        </div>
        <div className="about-body reveal">
          {t.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
      <div className="values">
        {t.about.values.map((v, i) => (
          <div key={i} className="reveal">
            <div className="value-k">— {String(i + 1).padStart(2, '0')}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--ink)', marginTop: 4, marginBottom: 12 }}>{v.k}</div>
            <div className="value-v">{v.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stack({ t }: { t: CVData }) {
  return (
    <section className="s" id="stack">
      <div className="s-head">
        <span className="s-num">02</span>
        <span className="s-kicker">{t.stack.kicker}</span>
        <h2 className="s-title reveal">{t.stack.heading}</h2>
      </div>
      <div className="stack-grid">
        {t.stack.groups.map((g, i) => (
          <div key={i} className="stack-card reveal">
            <span className="stack-num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{g.name.split(' ')[0]}</h3>
            <div className="sub">{g.name}</div>
            <div className="stack-items">
              {g.items.map((it, j) => <div key={j} className="stack-pill">{it}</div>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Marquee() {
  const line = MARQUEE_TOKENS.join('  ✦  ');
  return (
    <div className="marquee">
      <div className="marquee-track">
        <span>{line}</span><span>{line}</span><span>{line}</span>
      </div>
    </div>
  );
}

function Experience({ t }: { t: CVData }) {
  return (
    <section className="s" id="experience">
      <div className="s-head">
        <span className="s-num">03</span>
        <span className="s-kicker">{t.experience.kicker}</span>
        <h2 className="s-title reveal">{t.experience.heading}</h2>
      </div>
      <div>
        {t.experience.items.map((e, i) => {
          const isNow = e.period.includes('Present') || e.period.includes('настоящее');
          return (
            <div key={i} className="exp-item reveal">
              <div className="exp-period">
                {e.period}
                {isNow && <div className="now">{t.ui.now}</div>}
              </div>
              <div className="exp-main">
                <h3>{e.company}</h3>
                <div className="exp-role">{e.role}</div>
                <div className="exp-note">{e.note}</div>
                <ul className="exp-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
              <div className="exp-side">
                {e.stack.map((s, j) => <span key={j} className="tag">{s}</span>)}
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
    <section className="s" id="projects">
      <div className="s-head">
        <span className="s-num">04</span>
        <span className="s-kicker">{t.projects.kicker}</span>
        <h2 className="s-title reveal">{t.projects.heading}</h2>
      </div>
      <div className="proj-list">
        {t.projects.items.map((p, i) => (
          <div key={i} className="proj-row reveal">
            <span className="proj-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <div className="proj-name">{p.name}</div>
              <div className="proj-role">{p.role}</div>
              {p.installs && <span className="proj-badge">{p.installs}</span>}
              {p.links && p.links.length > 0 && (
                <div className="proj-links">
                  {p.links.map((l, j) => (
                    <a key={j} href={l.href} target="_blank" rel="noopener noreferrer">↗ {l.label}</a>
                  ))}
                </div>
              )}
            </div>
            <div className="proj-desc">{p.desc}</div>
            <div className="proj-tags">
              {p.tags.map((tg, j) => <span key={j} className="proj-tag">{tg}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education({ t }: { t: CVData }) {
  return (
    <section className="s" id="education">
      <div className="s-head">
        <span className="s-num">05</span>
        <span className="s-kicker">{t.education.kicker}</span>
        <h2 className="s-title reveal">{t.education.heading}</h2>
      </div>
      <div className="edu-grid">
        <div className="reveal">
          {t.education.items.map((e, i) => (
            <div key={i} className="edu-card">
              <div className="edu-school">{e.school}</div>
              <div className="edu-degree">{e.degree}</div>
              <div className="edu-period">{e.period}</div>
            </div>
          ))}
        </div>
        <ul className="edu-extras reveal">
          {t.education.extras.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      </div>
    </section>
  );
}

function Contact({ t }: { t: CVData }) {
  const [copied, setCopied] = useState<number | null>(null);
  const onCopy = (key: number, val: string | null) => {
    if (!val) return;
    const txt = val.replace(/^mailto:|^https?:\/\//, '');
    navigator.clipboard?.writeText(txt);
    setCopied(key);
    setTimeout(() => setCopied(null), 1600);
  };
  return (
    <section className="contact reveal" id="contact">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginBottom: 48 }}>
        <span className="s-num">06</span>
        <span className="s-kicker">{t.contact.kicker}</span>
      </div>
      <h2 className="contact-title">
        {t.contact.heading}<em>.</em>
      </h2>
      <div className="contact-grid">
        <p className="contact-blurb">{t.contact.blurb}</p>
        <div className="channels">
          {t.contact.channels.map((c, i) => (
            <a
              key={i}
              className="channel"
              href={c.href ?? '#'}
              onClick={(e) => { if (!c.href) { e.preventDefault(); onCopy(i, c.value); } }}
            >
              <span className="channel-label">{c.label}</span>
              <span className="channel-value">{c.value}</span>
              <span className={'channel-action' + (copied === i ? ' copied' : '')}>
                {copied === i ? '✓ Copied' : c.href ? '→' : 'Copy'}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Foot({ t }: { t: CVData }) {
  return (
    <div className="foot">
      <span>© {new Date().getFullYear()} {t.meta.name}</span>
      <span>Set in Instrument Serif & Geist · Hand-coded.</span>
      <span>{t.meta.location} · {t.meta.handle}</span>
    </div>
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
  const [theme, setTheme] = useState<Theme>(() => readTheme('light'));
  const t = CV_DATA[lang];

  useCursor();
  useReveal();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('cv_lang', lang);
    localStorage.setItem('cv_theme', theme);
  }, [lang, theme]);

  return (
    <>
      <TopBar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t} />
      <Hero t={t} />
      <About t={t} />
      <Stack t={t} />
      <Marquee />
      <Experience t={t} />
      <Projects t={t} />
      <Education t={t} />
      <Contact t={t} />
      <Foot t={t} />
    </>
  );
}
