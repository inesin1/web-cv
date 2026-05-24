import { type ComponentType, type ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CV_DATA, type CVData, type Lang } from '@/data';

type Theme = 'light' | 'dark';
type FileId = 'readme' | 'about' | 'stack' | 'experience' | 'projects' | 'education' | 'contact';

type FileMeta = {
  id: FileId;
  name: string;
  ext: string;
  icon: string;
  lines: number;
  component: ComponentType<{ t: CVData }>;
};

type TabCtxValue = { open: (id: FileId) => void; close: (id: FileId) => void };

const TabCtx = createContext<TabCtxValue>({ open: () => {}, close: () => {} });

const COMMIT_HASHES = ['9f3a2c1', 'b71e404', '2d8c5fa'];

const ASCII = `
  ┌─────────────┐
  │  ▓ ░ ░ ░ ▓  │
  │  ░ ▓ ░ ▓ ░  │
  │  ░ ░ ▓ ░ ░  │
  │  ░ ▓ ░ ▓ ░  │
  │  ▓ ░ ░ ░ ▓  │
  └─────────────┘
   < / > = AN
`;

function useCrosshair() {
  useEffect(() => {
    const x = document.getElementById('chx');
    const y = document.getElementById('chy');
    if (!x || !y) return;
    const onMove = (e: MouseEvent) => {
      x.style.transform = `translateY(${e.clientY}px)`;
      y.style.transform = `translateX(${e.clientX}px)`;
    };
    const onLeave = () => { x.style.opacity = '0'; y.style.opacity = '0'; };
    const onEnter = () => { x.style.opacity = '.5'; y.style.opacity = '.5'; };
    window.addEventListener('mousemove', onMove);
    document.body.addEventListener('mouseleave', onLeave);
    document.body.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.body.removeEventListener('mouseleave', onLeave);
      document.body.removeEventListener('mouseenter', onEnter);
    };
  }, []);
}

function useReveal(dep: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll('.tab-content .reveal:not(.in)');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    );
    els.forEach((el) => io.observe(el));
    const fallback = setTimeout(() => {
      document.querySelectorAll('.tab-content .reveal:not(.in)').forEach((el) => el.classList.add('in'));
    }, 800);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [dep]);
}

function useTypewriter(text: string, speed = 32, startDelay = 200): string {
  const [out, setOut] = useState('');
  useEffect(() => {
    setOut('');
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const startT = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => { clearTimeout(startT); if (interval) clearInterval(interval); };
  }, [text, speed, startDelay]);
  return out;
}

type TitleBarProps = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  activeFile: FileMeta | undefined;
};

function TitleBar({ lang, setLang, theme, setTheme, activeFile }: TitleBarProps) {
  return (
    <div className="titlebar">
      <div className="tb-dots"><span className="r"></span><span className="y"></span><span className="g"></span></div>
      <div className="tb-title">
        <span className="path">nesin@cv</span><span className="seg">:</span>
        <span className="path">~/resume.{lang}</span>
        <span className="seg">$ </span>
        <span style={{ color: 'var(--ink-2)' }}>{activeFile ? `cat ${activeFile.name}.${activeFile.ext}` : 'ls -la'}</span>
      </div>
      <div className="tb-ctrls">
        <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} title=":lang en">EN</button>
        <button className={lang === 'ru' ? 'on' : ''} onClick={() => setLang('ru')} title=":lang ru">RU</button>
        <span style={{ width: 6 }}></span>
        <button className={theme === 'dark' ? 'on' : ''} onClick={() => setTheme('dark')} title=":set theme=dark">●</button>
        <button className={theme === 'light' ? 'on' : ''} onClick={() => setTheme('light')} title=":set theme=light">○</button>
      </div>
    </div>
  );
}

type SidebarProps = {
  t: CVData;
  files: FileMeta[];
  openTabs: FileId[];
  activeId: FileId | null;
  onOpen: (id: FileId) => void;
};

function Sidebar({ t, files, openTabs, activeId, onOpen }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sb-section">EXPLORER</div>
      <div style={{ padding: '0 16px 8px', fontSize: 11, color: 'var(--ink-3)' }}>
        ▾ <span style={{ color: 'var(--ink)' }}>resume.{t.locale.toLowerCase()}/</span>
      </div>
      {files.map((f) => {
        const isActive = activeId === f.id;
        const isOpen = openTabs.includes(f.id);
        return (
          <div
            key={f.id}
            className={'sb-item' + (isActive ? ' active' : '') + (isOpen ? ' open-dot' : '')}
            onClick={() => onOpen(f.id)}
            title={isOpen ? 'Open tab' : 'Open file'}
          >
            <span className="ic">{f.icon}</span>
            <span className="name">{f.name}</span><span className="ext">.{f.ext}</span>
          </div>
        );
      })}
      <div className="sb-section">META</div>
      <div className="sb-meta">
        <div><strong>{t.meta.name}</strong></div>
        <div>{t.meta.title}</div>
        <div style={{ marginTop: 10, color: 'var(--ink-2)' }}>{t.meta.location}</div>
        <div style={{ color: 'var(--ink-2)' }}>{t.meta.experience} · EN {t.meta.english}</div>
        <div style={{ marginTop: 10, padding: '6px 10px', background: 'color-mix(in srgb, var(--green) 15%, transparent)', color: 'var(--green)', borderRadius: 3, display: 'inline-block', fontSize: 10 }}>
          ● {t.hero.status}
        </div>
      </div>
    </aside>
  );
}

type TabStripProps = {
  files: FileMeta[];
  openTabs: FileId[];
  activeId: FileId | null;
  onActivate: (id: FileId) => void;
  onClose: (id: FileId) => void;
};

function TabStrip({ files, openTabs, activeId, onActivate, onClose }: TabStripProps) {
  return (
    <div className="tabstrip">
      {openTabs.map((id) => {
        const f = files.find((x) => x.id === id);
        if (!f) return null;
        const active = id === activeId;
        return (
          <div
            key={id}
            className={'tab' + (active ? ' active' : '')}
            onClick={() => onActivate(id)}
            onMouseDown={(e) => { if (e.button === 1) { e.preventDefault(); onClose(id); } }}
          >
            <span className="tic">{f.icon}</span>
            <span className="tname">{f.name}.{f.ext}</span>
            <span className="tclose" onClick={(e) => { e.stopPropagation(); onClose(id); }} title="Close (or middle-click)">×</span>
          </div>
        );
      })}
      <div className="tabstrip-pad"></div>
    </div>
  );
}

function Breadcrumb({ file, t }: { file: FileMeta | undefined; t: CVData }) {
  if (!file) return null;
  return (
    <div className="breadcrumb">
      <span>resume.{t.locale.toLowerCase()}</span>
      <span className="sep">›</span>
      <span className="crumb-active">{file.name}.{file.ext}</span>
      <span style={{ marginLeft: 'auto', opacity: .6 }}>{file.lines} lines</span>
    </div>
  );
}

function Readme({ t }: { t: CVData }) {
  const { open } = useContext(TabCtx);
  const typedCmd = useTypewriter(`whoami --lang=${t.locale.toLowerCase()} --verbose`, 28, 100);
  return (
    <div className="hero" id="readme">
      <pre className="ascii-art">{ASCII}</pre>
      <div className="hero-cmd">
        <span className="p">~/profile</span> <span style={{ color: 'var(--ink-3)' }}>$</span>
        <span className="c">{typedCmd}<span className="caret"></span></span>
      </div>
      <div className="reveal in">
        <div className="hero-name">
          {t.meta.name}<span className="tag" style={{ fontSize: 18, marginLeft: 14 }}>{t.meta.handle}</span>
        </div>
        <div className="hero-title">
          <span className="key">role</span>: {t.meta.title} <span style={{ color: 'var(--ink-3)' }}>—</span> <span style={{ color: 'var(--ink-2)' }}>{t.meta.subtitle}</span>
        </div>
      </div>

      <div className="hero-grid reveal in">
        <div>
          <div className="hero-label">≫ TAGLINE</div>
          <div className="hero-tag">{t.hero.tagline}</div>
          <div className="hero-intro" style={{ marginTop: 14 }}>{t.hero.intro}</div>
        </div>
        <div>
          <div className="hero-label">≫ META</div>
          <dl className="hero-meta-grid" style={{ marginTop: 0 }}>
            <dt>location</dt><dd>{t.meta.location}</dd>
            <dt>availability</dt><dd>{t.meta.availability}</dd>
            <dt>salary</dt><dd>{t.meta.salary}</dd>
            <dt>experience</dt><dd>{t.meta.experience}</dd>
            <dt>english</dt><dd>{t.meta.english}</dd>
          </dl>
        </div>
      </div>

      <div className="hero-cta reveal in">
        <button className="btn" onClick={() => open('contact')}>
          <span className="ic">→</span> {t.hero.cta}
        </button>
        <button className="btn ghost" onClick={() => window.print()}>
          <span className="ic">↓</span> {t.hero.ctaSecondary}.pdf
        </button>
        <a href="https://github.com/inesin1" target="_blank" rel="noopener noreferrer" className="btn ghost">
          <span className="ic">◐</span> github.com/inesin1
        </a>
      </div>
    </div>
  );
}

type SecHeadProps = {
  num: number;
  hash: string;
  kicker: string;
  title: string;
  sub?: ReactNode;
};

function SecHead({ num, hash, kicker, title, sub }: SecHeadProps) {
  return (
    <>
      <div className="sec-anchor">
        <span style={{ color: 'var(--ink-3)' }}>{String(num).padStart(2, '0')}</span>
        <span className="hash">#</span>
        <span>{hash}.md</span>
        <span style={{ color: 'var(--ink-3)', marginLeft: 'auto' }}>{kicker}</span>
      </div>
      <h2 className="sec-h">
        <span className="prompt">›</span>
        {title}
      </h2>
      {sub && <div className="sec-sub">{sub}</div>}
    </>
  );
}

function About({ t }: { t: CVData }) {
  return (
    <div className="sec" id="about">
      <SecHead num={1} hash="about" kicker={t.about.kicker} title={t.about.heading} sub={<>↳ <span className="arrow">extract</span> profile_summary;</>} />
      <div className="about-grid">
        {t.about.paragraphs.map((p, i) => (
          <p key={i} className={i === t.about.paragraphs.length - 1 ? 'about-comment' : 'about-p'}>
            {p}
          </p>
        ))}
      </div>
      <div className="values-row">
        {t.about.values.map((v, i) => (
          <div key={i} className="value-cell">
            <div className="k">/* {String(i + 1).padStart(2, '0')} */</div>
            <div className="v">{v.k}</div>
            <div className="v-sub">→ {v.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stack({ t }: { t: CVData }) {
  return (
    <div className="sec" id="stack">
      <SecHead num={2} hash="stack" kicker={t.stack.kicker} title={t.stack.heading} sub={<>↳ <span className="arrow">load</span> stack.json</>} />
      <div className="stack-json">
        <span className="br">{'{'}</span><br />
        {t.stack.groups.map((g, i) => (
          <details key={i} open={true}>
            <summary>
              <span className="k indent" style={{ display: 'inline-block', paddingLeft: 24 }}>"{g.name}"</span>
              <span className="br">: [</span>
              <span className="c" style={{ marginLeft: 8 }}>// {g.items.length} items</span>
            </summary>
            <div className="indent" style={{ paddingLeft: 48 }}>
              {g.items.map((it, j) => <span key={j} className="item">{it}</span>)}
            </div>
            <span className="indent" style={{ paddingLeft: 24 }}><span className="br">]{i < t.stack.groups.length - 1 ? ',' : ''}</span></span>
          </details>
        ))}
        <span className="br">{'}'}</span>
      </div>
    </div>
  );
}

function Experience({ t }: { t: CVData }) {
  return (
    <div className="sec" id="experience">
      <SecHead num={3} hash="experience" kicker={t.experience.kicker} title={t.experience.heading} sub={<>↳ <span className="arrow">git</span> log --oneline --decorate</>} />
      <div className="git-log">
        {t.experience.items.map((e, i) => {
          const isNow = e.period.includes('Present') || e.period.includes('настоящее');
          const hash = COMMIT_HASHES[i] ?? 'a' + i.toString(16).padStart(6, '0');
          return (
            <div key={i} className={'commit' + (isNow ? ' now' : '')}>
              <div className="commit-rail"><div className="commit-dot"></div></div>
              <div>
                <div className="commit-head">
                  <span className="commit-hash">{hash}</span>
                  <span className="commit-company">{e.company}</span>
                  <span className="commit-role">— {e.role}</span>
                  <span className="commit-period">
                    {e.period}
                    {isNow && <span className="now-tag">HEAD</span>}
                  </span>
                </div>
                <div className="commit-note">// {e.note}</div>
                <ul className="commit-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="commit-stack">
                  {e.stack.map((s, j) => <span key={j}>{s}</span>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Projects({ t }: { t: CVData }) {
  return (
    <div className="sec" id="projects">
      <SecHead num={4} hash="projects" kicker={t.projects.kicker} title={t.projects.heading} sub={<>↳ <span className="arrow">grep</span> -i "production" ./projects/*</>} />
      <table className="ptable">
        <thead>
          <tr><th style={{ width: 60 }}>#</th><th>name</th><th>description</th><th>stack</th></tr>
        </thead>
        <tbody>
          {t.projects.items.map((p, i) => (
            <tr key={i}>
              <td style={{ color: 'var(--ink-3)' }}>{String(i + 1).padStart(2, '0')}</td>
              <td>
                <div className="p-name"><span className="arrow">▸</span>{p.name}</div>
                <div className="p-role">{p.role}</div>
                {p.installs && <span className="p-badge">{p.installs}</span>}
                {p.links && p.links.length > 0 && (
                  <div className="p-links">
                    {p.links.map((l, j) => (
                      <a key={j} href={l.href} target="_blank" rel="noopener noreferrer">↗ {l.label}</a>
                    ))}
                  </div>
                )}
              </td>
              <td className="p-desc">{p.desc}</td>
              <td><div className="p-tags">{p.tags.map((tg, j) => <span key={j}>{tg}</span>)}</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Education({ t }: { t: CVData }) {
  return (
    <div className="sec" id="education">
      <SecHead num={5} hash="education" kicker={t.education.kicker} title={t.education.heading} sub={<>↳ <span className="arrow">cat</span> education.md</>} />
      {t.education.items.map((e, i) => (
        <div key={i} className="edu-card">
          <div className="edu-school">{e.school}</div>
          <div className="edu-degree">{e.degree}</div>
          <div className="edu-period">{e.period}</div>
        </div>
      ))}
      <ul className="edu-extras">
        {t.education.extras.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
    </div>
  );
}

function Contact({ t }: { t: CVData }) {
  const [copied, setCopied] = useState<number | null>(null);
  return (
    <div className="sec" id="contact">
      <SecHead num={6} hash="contact" kicker={t.contact.kicker} title={t.contact.heading} sub={<>↳ <span className="arrow">echo</span> "ping me" &gt;&gt; inbox.log</>} />
      <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 22, maxWidth: 720 }}>{t.contact.blurb}</p>
      <div className="chan-grid">
        {t.contact.channels.map((c, i) => (
          <a
            key={i}
            className="chan"
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
            <div>
              <div className="l">{c.label}</div>
              <div className="v">{c.value}</div>
            </div>
            <div className={'a' + (copied === i ? ' ok' : '')}>
              {copied === i ? '✓ copied' : c.href ? (c.href.startsWith('mailto') ? '↗ send' : '↗ open') : '⎘ copy'}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

type WelcomeProps = { files: FileMeta[]; t: CVData; onOpen: (id: FileId) => void };

function Welcome({ files, t, onOpen }: WelcomeProps) {
  const isEn = t.locale === 'EN';
  return (
    <div className="welcome">
      <h3>{isEn ? 'No file open' : 'Нет открытых файлов'}</h3>
      <div className="sub">{isEn ? 'Open a file from the explorer on the left, or pick one below.' : 'Откройте файл из проводника слева, или выберите ниже.'}</div>
      <div className="recent">{isEn ? 'FILES' : 'ФАЙЛЫ'}</div>
      <div className="recent-list">
        {files.map((f) => (
          <div key={f.id} className="recent-item" onClick={() => onOpen(f.id)}>
            <span className="ic">{f.icon}</span>
            <span>{f.name}.{f.ext}</span>
            <span style={{ marginLeft: 'auto', color: 'var(--ink-3)', fontSize: 11 }}>open ↵</span>
          </div>
        ))}
      </div>
      <div className="kbd-row">
        <kbd>⌘1–7</kbd><span>{isEn ? 'switch tabs' : 'переключить вкладки'}</span>
        <kbd>⌘W</kbd><span>{isEn ? 'close current tab' : 'закрыть вкладку'}</span>
        <kbd>⌘E</kbd><span>{isEn ? 'toggle EN / RU' : 'переключить EN / RU'}</span>
      </div>
    </div>
  );
}

type StatusBarProps = {
  t: CVData;
  activeFile: FileMeta | undefined;
  lang: Lang;
  theme: Theme;
  openCount: number;
};

function StatusBar({ t, activeFile, lang, theme, openCount }: StatusBarProps) {
  const fmt = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="statusbar">
      <div className="sb-pill mode">● {activeFile ? activeFile.id.toUpperCase() : 'IDLE'}</div>
      <div className="sb-pill"><span className="key">lang:</span> {lang.toUpperCase()}</div>
      <div className="sb-pill"><span className="key">theme:</span> {theme}</div>
      <div className="sb-pill"><span className="key">tabs:</span> {openCount}</div>
      <div className="sb-pill"><span className="key">utf-8</span></div>
      <div className="sb-pill"><span className="key">git:</span> main ✓</div>
      <div className="sb-spacer"></div>
      <div className="sb-pill"><span className="key">{t.meta.location}</span></div>
      <div className="sb-pill"><span className="key">{time}</span></div>
    </div>
  );
}

const FILES: FileMeta[] = [
  { id: 'readme', name: 'README', ext: 'md', icon: '★', lines: 18, component: Readme },
  { id: 'about', name: 'about', ext: 'md', icon: '○', lines: 42, component: About },
  { id: 'stack', name: 'stack', ext: 'json', icon: '◇', lines: 28, component: Stack },
  { id: 'experience', name: 'experience', ext: 'log', icon: '◆', lines: 87, component: Experience },
  { id: 'projects', name: 'projects', ext: 'csv', icon: '◈', lines: 24, component: Projects },
  { id: 'education', name: 'education', ext: 'md', icon: '◯', lines: 12, component: Education },
  { id: 'contact', name: 'contact', ext: 'sh', icon: '✦', lines: 9, component: Contact },
];

const FILE_ID_SET: ReadonlySet<string> = new Set(FILES.map((f) => f.id));

function isFileId(s: string | null): s is FileId {
  return s !== null && FILE_ID_SET.has(s);
}

function readLang(): Lang {
  const v = localStorage.getItem('cv_lang');
  return v === 'ru' || v === 'en' ? v : 'en';
}

function readTheme(fallback: Theme): Theme {
  const v = localStorage.getItem('cv_theme_t');
  return v === 'light' || v === 'dark' ? v : fallback;
}

export function App() {
  const [lang, setLang] = useState<Lang>(readLang);
  const [theme, setTheme] = useState<Theme>(() => readTheme('dark'));
  const t = CV_DATA[lang];

  const [openTabs, setOpenTabs] = useState<FileId[]>(() => {
    const saved = localStorage.getItem('cv_tabs');
    if (saved) {
      try {
        const a: unknown = JSON.parse(saved);
        if (Array.isArray(a) && a.length) return a.filter(isFileId);
      } catch { /* ignore */ }
    }
    return ['readme'];
  });
  const [activeId, setActiveId] = useState<FileId | null>(() => {
    const saved = localStorage.getItem('cv_active');
    return isFileId(saved) ? saved : 'readme';
  });

  useCrosshair();
  useReveal(activeId);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('cv_lang', lang);
    localStorage.setItem('cv_theme_t', theme);
    localStorage.setItem('cv_tabs', JSON.stringify(openTabs));
    localStorage.setItem('cv_active', activeId ?? '');
  }, [lang, theme, openTabs, activeId]);

  const scrollToTab = () => {
    requestAnimationFrame(() => {
      document.getElementById('editor-area')?.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const openFile = useCallback((id: FileId) => {
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveId(id);
    scrollToTab();
  }, []);

  const closeTab = useCallback((id: FileId) => {
    setOpenTabs((prev) => {
      const idx = prev.indexOf(id);
      if (idx === -1) return prev;
      const next = prev.filter((x) => x !== id);
      if (activeId === id) {
        const fallback = next[idx] ?? next[idx - 1] ?? null;
        setActiveId(fallback);
      }
      return next;
    });
  }, [activeId]);

  const activateTab = useCallback((id: FileId) => {
    setActiveId(id);
    scrollToTab();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      if (e.key >= '1' && e.key <= '9') {
        const idx = parseInt(e.key, 10) - 1;
        if (idx < FILES.length) { e.preventDefault(); openFile(FILES[idx].id); }
      } else if (e.key.toLowerCase() === 'w') {
        if (activeId) { e.preventDefault(); closeTab(activeId); }
      } else if (e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setLang((l) => (l === 'en' ? 'ru' : 'en'));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openFile, closeTab, activeId]);

  const activeFile = FILES.find((f) => f.id === activeId);
  const ActiveComponent = activeFile?.component;

  const ctxValue = useMemo<TabCtxValue>(() => ({ open: openFile, close: closeTab }), [openFile, closeTab]);

  return (
    <TabCtx.Provider value={ctxValue}>
      <div className="shell">
        <TitleBar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} activeFile={activeFile} />
        <div className="body">
          <Sidebar t={t} files={FILES} openTabs={openTabs} activeId={activeId} onOpen={openFile} />
          <div className="editor-col">
            <TabStrip files={FILES} openTabs={openTabs} activeId={activeId} onActivate={activateTab} onClose={closeTab} />
            <Breadcrumb file={activeFile} t={t} />
            <div className="editor-area" id="editor-area">
              {ActiveComponent ? (
                <div className="tab-content" key={activeId + '-' + lang}>
                  <ActiveComponent t={t} />
                </div>
              ) : (
                <Welcome files={FILES} t={t} onOpen={openFile} />
              )}
            </div>
          </div>
        </div>
        <StatusBar t={t} activeFile={activeFile} lang={lang} theme={theme} openCount={openTabs.length} />
      </div>
    </TabCtx.Provider>
  );
}
