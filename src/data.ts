import type { IconKey } from './icons';

export type Lang = 'en' | 'ru';

export type CVMeta = {
  name: string;
  handle: string;
  title: string;
  subtitle: string;
  location: string;
  availability: string;
  salary: string;
  experience: string;
  english: string;
};

export type CVHero = {
  tagline: string;
  intro: string;
  cta: string;
  ctaSecondary: string;
  status: string;
  currentFocus: string;
};

export type CVAbout = {
  heading: string;
  kicker: string;
  paragraphs: string[];
  values: { k: string; v: string }[];
};

export type CVStackGroup = { name: string; items: string[] };
export type CVStack = { heading: string; kicker: string; groups: CVStackGroup[] };

export type CVJob = {
  company: string;
  role: string;
  period: string;
  note: string;
  bullets: string[];
  stack: string[];
};

export type CVProjectLink = { label: string; href: string };

export type CVProject = {
  name: string;
  role: string;
  desc: string;
  tags: string[];
  installs?: string;
  links?: CVProjectLink[];
};

export type CVEducationItem = {
  school: string;
  degree: string;
  period: string;
};

export type CVChannel = {
  label: string;
  value: string;
  href: string | null;
  icon: IconKey;
};

export type CVData = {
  locale: 'EN' | 'RU';
  meta: CVMeta;
  nav: {
    about: string;
    stack: string;
    experience: string;
    projects: string;
    education: string;
    contact: string;
  };
  hero: CVHero;
  about: CVAbout;
  stack: CVStack;
  experience: { heading: string; kicker: string; items: CVJob[] };
  projects: { heading: string; kicker: string; items: CVProject[] };
  education: { heading: string; kicker: string; items: CVEducationItem[]; extras: string[] };
  contact: { heading: string; kicker: string; blurb: string; channels: CVChannel[] };
  ui: {
    lang: string;
    theme_light: string;
    theme_dark: string;
    scrollHint: string;
    yearsLabel: string;
    sectionLabel: (n: number) => string;
    now: string;
  };
};

export const CV_DATA: Record<Lang, CVData> = {
  en: {
    locale: 'EN',
    meta: {
      name: 'Artyom Nesin',
      handle: '@inesin1',
      title: 'Backend-Focused Fullstack Developer',
      subtitle: 'TypeScript · Node.js · NestJS · Vue.js',
      location: 'Batumi, Georgia',
      availability: 'Open to remote · relocation',
      salary: '$2,500 – $3,500 / month',
      experience: '5 years',
      english: 'B1',
    },
    nav: {
      about: 'About',
      stack: 'Stack',
      experience: 'Experience',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact',
    },
    hero: {
      tagline: 'I build reliable backends and ship features end-to-end.',
      intro: 'Designing APIs, implementing business logic, building integrations, and shaping system architecture — without unnecessary complexity.',
      cta: 'Get in touch',
      ctaSecondary: 'Download CV',
      status: 'Available for new projects',
      currentFocus: 'Currently sharpening system design & infra — NestJS, Postgres, queues, observability.',
    },
    about: {
      heading: 'About',
      kicker: 'Profile',
      paragraphs: [
        'Fullstack developer with strong backend expertise in TypeScript, Node.js, and NestJS, focused on building reliable, scalable, and maintainable web applications.',
        'My core strength is backend development: designing APIs, implementing business logic, building integrations, and shaping system architecture. At the same time, I work confidently on the frontend with Vue.js and can deliver features end-to-end, from concept to production.',
        'In recent roles, I have contributed to enterprise integrations, internal automation platforms, SaaS products, and high-load commercial systems. My experience includes building products from scratch, supporting public-facing solutions with 100,000+ installs, and delivering tailored solutions for enterprise clients.',
        'I care about clean architecture, pragmatic engineering, and software that solves real business problems.',
      ],
      values: [
        { k: 'Clean architecture', v: 'Pragmatic, not academic' },
        { k: 'End-to-end ownership', v: 'Concept to production' },
        { k: 'Technical leadership', v: 'Mentoring, reviews, design' },
      ],
    },
    stack: {
      heading: 'Tech stack',
      kicker: 'What I work with',
      groups: [
        {
          name: 'Backend (core)',
          items: ['TypeScript', 'Node.js', 'NestJS', 'REST APIs', 'SQL', 'Redis', 'RabbitMQ', 'Docker'],
        },
        {
          name: 'Frontend',
          items: ['Vue 3 · Composition API', 'TypeScript', 'SCSS / CSS3', 'Vite', 'React (additional)', 'Next.js'],
        },
        {
          name: 'Architecture & tooling',
          items: ['System design', 'OAuth / Keycloak', 'Design systems', 'Code review', 'Git', 'Webpack / PostCSS'],
        },
        {
          name: 'AI tooling',
          items: ['Claude Code', 'Codex', 'Prompt engineering', 'Production-grade validation'],
        },
      ],
    },
    experience: {
      heading: 'Experience',
      kicker: "Where I've worked",
      items: [
        {
          company: 'Rocket.red',
          role: 'Frontend / Fullstack Developer',
          period: 'Jan 2024 — Present',
          note: 'Junior → Senior within the company',
          bullets: [
            'Built SPAs and internal services for Enterprise clients',
            'Designed core modules and contributed to system architecture',
            'Delivered 2 high-load Enterprise projects ($30k+ budget each)',
            'Maintained and extended custom interfaces and modules inside AmoCRM',
            'Mentored junior developers; led code review culture',
          ],
          stack: ['TypeScript', 'Vue.js', 'Node.js', 'Vite', 'Docker', 'RabbitMQ', 'Redis'],
        },
        {
          company: 'Freelance & personal projects',
          role: 'Frontend / Fullstack Developer',
          period: 'Sep 2021 — Dec 2023',
          note: 'Web apps, SPAs, admin panels',
          bullets: [
            'Built web applications and landing pages for businesses',
            'Designed and implemented admin interfaces and SPAs',
            'Delivered API integrations and responsive layouts',
          ],
          stack: ['TypeScript', 'Vue.js', 'Node.js', 'NestJS', 'SCSS'],
        },
        {
          company: 'CodeKids',
          role: 'Founder & Programming Instructor',
          period: 'Aug 2021 — Present',
          note: 'Programming school for kids',
          bullets: [
            'Founded and grew a programming school from scratch',
            'Designed educational programs and managed a team of instructors',
            'Built a custom CRM system for the school (Vue + Node.js)',
          ],
          stack: ['Vue.js', 'Node.js', 'Operations', 'Leadership'],
        },
      ],
    },
    projects: {
      heading: 'Selected projects',
      kicker: 'Recent work',
      items: [
        {
          name: 'ServiceDesk',
          role: 'SPA Lead',
          desc: 'Ticketing & helpdesk SPA. Designed component architecture, state management, REST integration.',
          tags: ['Vue 3', 'TypeScript', 'REST'],
          links: [
            { label: 'Client', href: 'https://github.com/inesin1/ServiceDesk-Client-Vue' },
            { label: 'Backend', href: 'https://github.com/inesin1/ServiceDesk-Backend' },
          ],
        },
        {
          name: 'pkm-balans.ru',
          role: 'Fullstack',
          desc: 'Commercial public-facing site. Layout, integrations, admin tooling.',
          tags: ['Vue', 'Node.js'],
          links: [{ label: 'pkm-balans.ru', href: 'https://pkm-balans.ru' }],
        },
        {
          name: 'imperiya.tvoe.taxi',
          role: 'Fullstack',
          desc: 'Taxi-aggregator portal: driver onboarding, dispatch flows, billing.',
          tags: ['Vue', 'NestJS'],
          links: [{ label: 'imperiya.tvoe.taxi', href: 'https://imperiya.tvoe.taxi' }],
        },
        {
          name: 'CodeKids Platform',
          role: 'Architect & Author',
          desc: 'Custom platform for a programming school: students, schedules, payments, instructor workflows.',
          tags: ['Vue', 'Node.js', 'NestJS', 'PostgreSQL'],
        },
      ],
    },
    education: {
      heading: 'Education',
      kicker: 'Background',
      items: [
        {
          school: 'Zlatoust Industrial College, P.P. Anosov',
          degree: 'Information Systems & Programming',
          period: 'Vocational degree, with honors',
        },
      ],
      extras: [
        'Coursework: web development, C#, databases, software architecture, low-level programming',
        'Taught lab sessions for junior students',
        'Worked part-time at the college IT center',
      ],
    },
    contact: {
      heading: "Let's talk",
      kicker: 'Contact',
      blurb: 'Open to backend-leaning fullstack roles and freelance projects. Best reached on Telegram.',
      channels: [
        { label: 'Email', value: 'artem.nesin@gmail.com', href: 'mailto:artem.nesin@gmail.com', icon: 'email' },
        { label: 'Telegram', value: '@kurtr2d', href: 'https://t.me/kurtr2d', icon: 'telegram' },
        { label: 'GitHub', value: 'github.com/inesin1', href: 'https://github.com/inesin1', icon: 'github' },
        { label: 'LinkedIn', value: 'linkedin.com/in/inesin', href: 'https://www.linkedin.com/in/inesin/', icon: 'linkedin' },
        { label: 'Book a call', value: 'calendly.com/artem-nesin', href: 'https://calendly.com/artem-nesin', icon: 'calendar' },
        { label: 'Location', value: 'Batumi, Georgia', href: null, icon: 'location' },
      ],
    },
    ui: {
      lang: 'RU',
      theme_light: 'Light',
      theme_dark: 'Dark',
      scrollHint: 'Scroll',
      yearsLabel: 'yrs commercial',
      sectionLabel: (n) => `§ ${n}`,
      now: 'Now',
    },
  },

  ru: {
    locale: 'RU',
    meta: {
      name: 'Артём Несин',
      handle: '@inesin1',
      title: 'Fullstack-разработчик с фокусом на backend',
      subtitle: 'TypeScript · Node.js · NestJS · Vue.js',
      location: 'Батуми, Грузия',
      availability: 'Удалёнка · готов к релокации',
      salary: '$2 500 – $3 500 / месяц',
      experience: '5 лет',
      english: 'B1',
    },
    nav: {
      about: 'О себе',
      stack: 'Стек',
      experience: 'Опыт',
      projects: 'Проекты',
      education: 'Образование',
      contact: 'Контакты',
    },
    hero: {
      tagline: 'Делаю надёжный backend и довожу фичи до прода.',
      intro: 'Проектирую API, реализую бизнес-логику, собираю интеграции и формирую архитектуру системы — без лишней сложности.',
      cta: 'Связаться',
      ctaSecondary: 'Скачать CV',
      status: 'Открыт к новым проектам',
      currentFocus: 'Сейчас углубляюсь в системный дизайн и инфру — NestJS, Postgres, очереди, обсервабельность.',
    },
    about: {
      heading: 'О себе',
      kicker: 'Профиль',
      paragraphs: [
        'Fullstack-разработчик с сильной backend-экспертизой в TypeScript, Node.js и NestJS. Делаю надёжные, масштабируемые и поддерживаемые веб-приложения.',
        'Моя сильная сторона — backend: проектирование API, бизнес-логика, интеграции и архитектура систем. Параллельно уверенно работаю на фронтенде с Vue.js и закрываю фичу целиком — от идеи до прода.',
        'В последних ролях участвовал в enterprise-интеграциях, внутренних платформах автоматизации, SaaS-продуктах и высоконагруженных коммерческих системах. Запускал продукты с нуля, поддерживал публичные решения c 100 000+ установок, делал кастомные решения для enterprise-клиентов.',
        'Ценю чистую архитектуру, прагматичную инженерию и софт, который решает реальные бизнес-задачи.',
      ],
      values: [
        { k: 'Чистая архитектура', v: 'Прагматично, без академизма' },
        { k: 'End-to-end ответственность', v: 'От идеи до прода' },
        { k: 'Техническое лидерство', v: 'Менторинг, ревью, дизайн' },
      ],
    },
    stack: {
      heading: 'Стек',
      kicker: 'С чем работаю',
      groups: [
        {
          name: 'Backend (ядро)',
          items: ['TypeScript', 'Node.js', 'NestJS', 'REST API', 'SQL', 'Redis', 'RabbitMQ', 'Docker'],
        },
        {
          name: 'Frontend',
          items: ['Vue 3 · Composition API', 'TypeScript', 'SCSS / CSS3', 'Vite', 'React (доп.)', 'Next.js'],
        },
        {
          name: 'Архитектура и тулинг',
          items: ['System design', 'OAuth / Keycloak', 'Design-системы', 'Code review', 'Git', 'Webpack / PostCSS'],
        },
        {
          name: 'AI-инструменты',
          items: ['Claude Code', 'Codex', 'Prompt-инженеринг', 'Валидация под прод'],
        },
      ],
    },
    experience: {
      heading: 'Опыт',
      kicker: 'Где работал',
      items: [
        {
          company: 'Rocket.red',
          role: 'Frontend / Fullstack-разработчик',
          period: 'Январь 2024 — настоящее время',
          note: 'Карьерный рост Junior → Senior внутри компании',
          bullets: [
            'Разработка SPA и внутренних сервисов для Enterprise-клиентов',
            'Проектирование ключевых модулей и участие в архитектуре системы',
            'Сдал 2 высоконагруженных Enterprise-проекта (бюджет $30k+ каждый)',
            'Поддерживал и расширял кастомные интерфейсы и модули внутри AmoCRM',
            'Менторил junior-разработчиков, выстроил культуру code review',
          ],
          stack: ['TypeScript', 'Vue.js', 'Node.js', 'Vite', 'Docker', 'RabbitMQ', 'Redis'],
        },
        {
          company: 'Фриланс и личные проекты',
          role: 'Frontend / Fullstack-разработчик',
          period: 'Сентябрь 2021 — Декабрь 2023',
          note: 'Веб-приложения, SPA, админ-панели',
          bullets: [
            'Веб-приложения и лендинги под бизнес-задачи',
            'Проектирование и реализация админ-интерфейсов и SPA',
            'API-интеграции и адаптивная вёрстка',
          ],
          stack: ['TypeScript', 'Vue.js', 'Node.js', 'NestJS', 'SCSS'],
        },
        {
          company: 'CodeKids',
          role: 'Основатель и преподаватель',
          period: 'Август 2021 — настоящее время',
          note: 'Школа программирования для детей',
          bullets: [
            'Основал и развил школу программирования с нуля',
            'Разработал учебные программы, управлял командой преподавателей',
            'Собрал кастомную CRM для школы (Vue + Node.js)',
          ],
          stack: ['Vue.js', 'Node.js', 'Operations', 'Leadership'],
        },
      ],
    },
    projects: {
      heading: 'Избранные проекты',
      kicker: 'Недавние работы',
      items: [
        {
          name: 'ServiceDesk',
          role: 'SPA Lead',
          desc: 'SPA для тикетинга и helpdesk. Архитектура компонентов, управление состоянием, REST-интеграция.',
          tags: ['Vue 3', 'TypeScript', 'REST'],
          links: [
            { label: 'Client', href: 'https://github.com/inesin1/ServiceDesk-Client-Vue' },
            { label: 'Backend', href: 'https://github.com/inesin1/ServiceDesk-Backend' },
          ],
        },
        {
          name: 'pkm-balans.ru',
          role: 'Fullstack',
          desc: 'Коммерческий публичный сайт. Вёрстка, интеграции, админ-инструменты.',
          tags: ['Vue', 'Node.js'],
          links: [{ label: 'pkm-balans.ru', href: 'https://pkm-balans.ru' }],
        },
        {
          name: 'imperiya.tvoe.taxi',
          role: 'Fullstack',
          desc: 'Портал такси-агрегатора: онбординг водителей, диспетчеризация, биллинг.',
          tags: ['Vue', 'NestJS'],
          links: [{ label: 'imperiya.tvoe.taxi', href: 'https://imperiya.tvoe.taxi' }],
        },
        {
          name: 'CodeKids Platform',
          role: 'Архитектор и автор',
          desc: 'Кастомная платформа для школы программирования: ученики, расписания, оплаты, процессы преподавателей.',
          tags: ['Vue', 'Node.js', 'NestJS', 'PostgreSQL'],
        },
      ],
    },
    education: {
      heading: 'Образование',
      kicker: 'Бэкграунд',
      items: [
        {
          school: 'Златоустовский индустриальный колледж им. П. П. Аносова',
          degree: 'Информационные системы и программирование',
          period: 'Среднее профессиональное, с отличием',
        },
      ],
      extras: [
        'Изучал: веб-разработку, C#, базы данных, программную архитектуру, низкоуровневое программирование',
        'Преподавал практики для студентов младших курсов',
        'Подрабатывал в информационно-вычислительном центре колледжа (ИВЦ)',
      ],
    },
    contact: {
      heading: 'На связи',
      kicker: 'Контакты',
      blurb: 'Открыт к backend-ориентированным fullstack-ролям и фриланс-проектам. Удобнее всего писать в Telegram.',
      channels: [
        { label: 'Email', value: 'artem.nesin@gmail.com', href: 'mailto:artem.nesin@gmail.com', icon: 'email' },
        { label: 'Telegram', value: '@kurtr2d', href: 'https://t.me/kurtr2d', icon: 'telegram' },
        { label: 'GitHub', value: 'github.com/inesin1', href: 'https://github.com/inesin1', icon: 'github' },
        { label: 'LinkedIn', value: 'linkedin.com/in/inesin', href: 'https://www.linkedin.com/in/inesin/', icon: 'linkedin' },
        { label: 'Созвон', value: 'calendly.com/artem-nesin', href: 'https://calendly.com/artem-nesin', icon: 'calendar' },
        { label: 'Локация', value: 'Батуми, Грузия', href: null, icon: 'location' },
      ],
    },
    ui: {
      lang: 'EN',
      theme_light: 'Свет',
      theme_dark: 'Тьма',
      scrollHint: 'Скролл',
      yearsLabel: 'лет в коммерции',
      sectionLabel: (n) => `§ ${n}`,
      now: 'Сейчас',
    },
  },
};
