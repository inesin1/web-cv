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

export type CVJobGroup = { title: string; bullets: string[] };

export type CVJob = {
  company: string;
  role: string;
  period: string;
  note: string;
  bullets: string[];
  groups?: CVJobGroup[];
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
      title: 'Backend Engineer',
      subtitle: 'TypeScript · Node.js · NestJS · Vue.js',
      location: 'Batumi, Georgia',
      availability: 'Open to remote · relocation',
      salary: '$2,500 - $3,500 / month',
      experience: '3+ years',
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
      intro: 'Designing APIs, data models, queues, caching, and deployment; responsible for the service at every stage, from architecture to production.',
      cta: 'Get in touch',
      ctaSecondary: 'Download CV',
      status: 'Open to Middle+ / Senior Backend or Tech Lead roles',
      currentFocus: 'Currently sharpening system design & infra: NestJS, Postgres, queues, observability.',
    },
    about: {
      heading: 'About',
      kicker: 'Profile',
      paragraphs: [
        'Backend Engineer with 3+ years of commercial experience in TypeScript, Node.js, NestJS, and Vue 3. I own services end to end: API design, data model, queues, caching, and deployment.',
        'I designed and shipped three production systems integrated into amoCRM for a major retail and q-commerce client: a duplicate-control pipeline handling ~600 requests per minute on average (peaks up to 2,000) and an in-CRM time tracker used by around 3,000 concurrent internal users.',
        'Domain expertise in CRM integrations and marketplace widgets for amoCRM / Kommo. Experienced in conducting code reviews and mentoring; I was offered an internal Tech Lead role and chose to stay hands-on at the time.',
        'Looking for a Middle+ / Senior Backend or Tech Lead role with real ownership over architecture and technical decisions.',
      ],
      values: [
        { k: 'End-to-end ownership', v: 'API, data, queues, deploy' },
        { k: 'High-load systems', v: 'Up to 2,000 req/min' },
        { k: 'Technical leadership', v: 'Mentoring, reviews, design' },
      ],
    },
    stack: {
      heading: 'Tech stack',
      kicker: 'What I work with',
      groups: [
        {
          name: 'Languages',
          items: ['TypeScript', 'JavaScript', 'SQL'],
        },
        {
          name: 'Backend',
          items: ['Node.js', 'NestJS', 'REST APIs', 'JWT', 'OAuth', 'WebSockets'],
        },
        {
          name: 'Frontend',
          items: ['Vue 3', 'Vue Router', 'Pinia', 'Reusable UI components'],
        },
        {
          name: 'Databases',
          items: ['PostgreSQL', 'Redis', 'MySQL', 'MariaDB', 'MS SQL'],
        },
        {
          name: 'ORM',
          items: ['Prisma', 'TypeORM', 'Drizzle', 'Raw SQL'],
        },
        {
          name: 'Messaging',
          items: ['BullMQ', 'RabbitMQ', 'Redis Pub/Sub'],
        },
        {
          name: 'DevOps',
          items: ['Docker', 'docker-compose', 'Kubernetes (basic)', 'GitLab CI/CD', 'VPS administration', 'Vercel', 'Railway'],
        },
        {
          name: 'Observability & testing',
          items: ['Grafana', 'Loki', 'Prometheus', 'Jest'],
        },
        {
          name: 'Integrations',
          items: ['amoCRM / Kommo', 'Asana', 'Google APIs', 'HH.ru', 'Avito', 'SuperJob', 'Naimix', 'Telegram Bot API'],
        },
      ],
    },
    experience: {
      heading: 'Experience',
      kicker: "Where I've worked",
      items: [
        {
          company: 'Rocket.red',
          role: 'Backend Engineer (Fullstack)',
          period: 'Jan 2024 - Present',
          note: 'Remote · major retail / q-commerce client on amoCRM',
          bullets: [
            'Designed, built, and shipped three production systems under high-value enterprise contracts for a major retail & q-commerce client, integrated into amoCRM; currently own development, architecture, and performance for all three.',
          ],
          groups: [
            {
              title: 'System 1 · Duplicate detection & lead-merging engine',
              bullets: [
                "Built a configurable lead-merging pipeline that replaced a marketplace solution catching ~70% of duplicates, adding source-aware merging logic tailored to the client's sales channels; successful-merge rate reached ~97% over a recent month.",
                'Production traffic averages ~600 req/min with peaks up to 2,000; designed around tight amoCRM API rate limits using BullMQ queues and Redis caching, with structured logging for traceability.',
              ],
            },
            {
              title: 'System 2 · Timeslot management & native time tracker',
              bullets: [
                'Shipped a timeslot platform with a time tracker embedded directly in the amoCRM UI (no browser extension): 500-700 daily users, ~3,000 concurrent at peak, 500-700 timeslots per day, 250-300 req/min during working hours.',
                'Built a data model for regions, groups, and roles with two-way role sync from amoCRM, plus analytics over worked hours, processed leads, and slot utilization.',
              ],
            },
            {
              title: 'System 3 · Job-posting orchestration across HH, Avito & SuperJob',
              bullets: [
                "Auto-publishes and updates job postings on HH.ru, Avito, and SuperJob from hiring-demand signals in the client's internal system, with automatic salary-rate calculation and per-platform templating; core logic covered with Jest unit tests.",
              ],
            },
            {
              title: 'Additional projects, widgets & ownership',
              bullets: [
                'Built a bidirectional amoCRM to Naimix integration and the Webhooks widget from scratch; contributed fixes to the Payments and Deal Copy widgets; combined marketplace footprint exceeds 100,000 installs.',
                'Run code reviews and mentor a junior developer; offered an internal Tech Lead role and chose to stay hands-on. Containerize with Docker/Kubernetes, maintain GitLab CI/CD and Grafana/Loki/Prometheus, and own incident triage.',
              ],
            },
          ],
          stack: ['TypeScript', 'NestJS', 'Node.js', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker', 'amoCRM'],
        },
        {
          company: 'Zlatoust City Hospital',
          role: 'Software Developer / IT Specialist',
          period: 'Dec 2022 - Dec 2023',
          note: 'Zlatoust, Russia',
          bullets: [
            'Designed and built an internal Service Desk system from scratch (Vue.js, NestJS, MySQL, JWT auth) as the sole developer; deployed it across 7 municipal institutions as standalone installations.',
            'Initiated and prototyped an internal electronic document management system to automate cross-department workflows.',
            'Administered core medical and accounting systems (BARS MIS, BARS FOMS, 1C: Kamin) and digital-signature workflows (Kontur, Treasury EDS); supported 200+ workstations and Windows/Linux servers.',
          ],
          stack: ['Vue.js', 'NestJS', 'MySQL', 'JWT'],
        },
      ],
    },
    projects: {
      heading: 'Personal projects',
      kicker: 'Outside of work',
      items: [
        {
          name: 'CodeKids.cc',
          role: 'Co-Founder & Tech Lead',
          desc: 'Online programming school for kids that I co-founded and have run as a side business for 4+ years, coordinating a small team of teachers and day-to-day operations. Sole developer of the production platform: parent, student, and teacher dashboards, scheduling with reschedule and cancellation flows, balance accounting, teacher payout requests, and a Telegram bot for notifications.',
          tags: ['NestJS', 'Vue 3', 'PostgreSQL', 'Redis', 'Telegram Bot API'],
          links: [{ label: 'codekids.cc', href: 'https://codekids.cc' }],
        },
        {
          name: 'ServiceDesk',
          role: 'Author',
          desc: 'Ticketing & helpdesk system built from scratch: my college graduation project, later adopted across municipal medical institutions in Zlatoust. Component architecture, state management, REST integration.',
          tags: ['Vue 3', 'NestJS', 'MySQL', 'REST'],
          links: [
            { label: 'Client', href: 'https://github.com/inesin1/ServiceDesk-Client-Vue' },
            { label: 'Backend', href: 'https://github.com/inesin1/ServiceDesk-Backend' },
          ],
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
          period: 'Diploma with honors · Sep 2019 - Jun 2023',
        },
      ],
      extras: [
        'Graduation project: a Service Desk system later adopted by medical institutions across the city.',
        'Placed in regional programming competitions (WorldSkills, professional skills championships).',
        'Coursework: software development, systems analysis, database design, technical documentation, higher mathematics.',
      ],
    },
    contact: {
      heading: "Let's talk",
      kicker: 'Contact',
      blurb: 'Open to Middle+ / Senior Backend or Tech Lead roles. Best reached on Telegram.',
      channels: [
        { label: 'Email', value: 'artyom@nesin.dev', href: 'mailto:artyom@nesin.dev', icon: 'email' },
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
      title: 'Backend Engineer',
      subtitle: 'TypeScript · Node.js · NestJS · Vue.js',
      location: 'Батуми, Грузия',
      availability: 'Удалёнка · готов к релокации',
      salary: '$2 500 - $3 500 / месяц',
      experience: '3+ года',
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
      intro: 'Проектирую API, модель данных, очереди, кэширование и деплой; отвечаю за сервис на всех этапах, от проектирования до прода.',
      cta: 'Связаться',
      ctaSecondary: 'Скачать CV',
      status: 'Открыт к ролям Middle+ / Senior Backend или Tech Lead',
      currentFocus: 'Сейчас углубляюсь в системный дизайн и инфру: NestJS, Postgres, очереди, обсервабельность.',
    },
    about: {
      heading: 'О себе',
      kicker: 'Профиль',
      paragraphs: [
        'Backend-разработчик с 3+ годами коммерческого опыта на TypeScript, Node.js, NestJS и Vue 3. Веду сервис от первого коммита до прода: API-дизайн, модель данных, очереди, кэширование, деплой.',
        'Спроектировал и вывел в прод три системы внутри amoCRM для крупного ритейл/q-commerce клиента: пайплайн контроля дубликатов с нагрузкой ~600 запросов в минуту (пики до 2 000) и нативный тайм-трекер, которым пользуются около 3 000 одновременных пользователей.',
        'Доменная экспертиза в CRM-интеграциях и виджетах маркетплейса amoCRM / Kommo. Есть опыт код-ревью и менторинга; получал предложение перейти в Tech Lead внутри компании, на тот момент решил остаться в инженерной роли.',
        'Ищу позицию Middle+ / Senior Backend или Tech Lead с реальной ответственностью за дизайн систем и технические решения.',
      ],
      values: [
        { k: 'End-to-end ответственность', v: 'API, данные, очереди, деплой' },
        { k: 'Высоконагруженные системы', v: 'До 2 000 запросов/мин' },
        { k: 'Техническое лидерство', v: 'Менторинг, ревью, дизайн' },
      ],
    },
    stack: {
      heading: 'Стек',
      kicker: 'С чем работаю',
      groups: [
        {
          name: 'Языки',
          items: ['TypeScript', 'JavaScript', 'SQL'],
        },
        {
          name: 'Backend',
          items: ['Node.js', 'NestJS', 'REST API', 'JWT', 'OAuth', 'WebSockets'],
        },
        {
          name: 'Frontend',
          items: ['Vue 3', 'Vue Router', 'Pinia', 'Переиспользуемые UI-компоненты'],
        },
        {
          name: 'Базы данных',
          items: ['PostgreSQL', 'Redis', 'MySQL', 'MariaDB', 'MS SQL'],
        },
        {
          name: 'ORM',
          items: ['Prisma', 'TypeORM', 'Drizzle', 'Чистый SQL'],
        },
        {
          name: 'Очереди и брокеры',
          items: ['BullMQ', 'RabbitMQ', 'Redis Pub/Sub'],
        },
        {
          name: 'DevOps',
          items: ['Docker', 'docker-compose', 'Kubernetes (базовый)', 'GitLab CI/CD', 'Администрирование VPS', 'Vercel', 'Railway'],
        },
        {
          name: 'Мониторинг и тесты',
          items: ['Grafana', 'Loki', 'Prometheus', 'Jest'],
        },
        {
          name: 'Интеграции',
          items: ['amoCRM / Kommo', 'Asana', 'Google API', 'HH.ru', 'Avito', 'SuperJob', 'Naimix', 'Telegram Bot API'],
        },
      ],
    },
    experience: {
      heading: 'Опыт',
      kicker: 'Где работал',
      items: [
        {
          company: 'Rocket.red',
          role: 'Backend-разработчик (Fullstack)',
          period: 'Январь 2024 - настоящее время',
          note: 'Удалённо · крупный ритейл/q-commerce клиент на amoCRM',
          bullets: [
            'Спроектировал, разработал и вывел в прод три продакшен-системы в рамках крупных enterprise-контрактов для ритейл/q-commerce клиента, интегрированных в amoCRM; отвечаю за развитие, архитектуру и производительность всех трёх.',
          ],
          groups: [
            {
              title: 'Система 1 · Контроль дубликатов и склейка лидов',
              bullets: [
                'Построил конфигурируемый пайплайн склейки лидов, заменивший маркетплейс-решение (ловило ~70% дублей), с логикой склейки по источнику и каналу продаж; процент успешных склеек за месяц достиг ~97%.',
                'Продакшен-нагрузка ~600 запросов/мин, пики до 2 000; спроектировано под жёсткие rate-лимиты amoCRM API на очередях BullMQ и кэше Redis, со структурированным логированием.',
              ],
            },
            {
              title: 'Система 2 · Таймслоты и нативный тайм-трекер',
              bullets: [
                'Выпустил платформу таймслотов с тайм-трекером прямо в UI amoCRM (без браузерного расширения): 500-700 пользователей в сутки, до 3 000 одновременно в пик, 500-700 таймслотов в день, 250-300 запросов/мин в рабочее время.',
                'Построил модель регионов, групп и ролей с двусторонней синхронизацией ролей из amoCRM и аналитику по времени, обработанным лидам и заполняемости слотов.',
              ],
            },
            {
              title: 'Система 3 · Публикация вакансий на HH, Avito и SuperJob',
              bullets: [
                'Сервис автоматически публикует и обновляет вакансии на HH.ru, Avito и SuperJob по сигналам потребности в найме из внутренней системы клиента, с авторасчётом ставок и шаблонами под площадку; основная логика покрыта юнит-тестами на Jest.',
              ],
            },
            {
              title: 'Дополнительные проекты, виджеты, ответственность',
              bullets: [
                'С нуля написал двустороннюю интеграцию amoCRM с Naimix и виджет «Вебхуки»; делал багфиксы в виджетах «Платежи» и «Копирование сделки»; суммарный footprint в маркетплейсе превышает 100 000 установок.',
                'Веду код-ревью и менторю junior-разработчика; получал предложение стать Tech Lead, решил остаться в инженерной роли. Контейнеризую в Docker/Kubernetes, поддерживаю GitLab CI/CD и Grafana/Loki/Prometheus, отвечаю за разбор инцидентов.',
              ],
            },
          ],
          stack: ['TypeScript', 'NestJS', 'Node.js', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker', 'amoCRM'],
        },
        {
          company: 'Городская больница г. Златоуст',
          role: 'Разработчик / IT-специалист',
          period: 'Декабрь 2022 - Декабрь 2023',
          note: 'Златоуст, Россия',
          bullets: [
            'С нуля спроектировал и построил внутреннюю систему Service Desk (Vue.js, NestJS, MySQL, JWT-авторизация) как единственный разработчик; развернул её в 7 муниципальных учреждениях отдельными инсталляциями.',
            'Инициировал и спрототипировал внутреннюю систему электронного документооборота для автоматизации межведомственных процессов.',
            'Администрировал ключевые медицинские и учётные системы (БАРС МИС, БАРС ФОМС, 1С: Камин) и работу с электронными подписями (Контур, Казначейство); поддерживал 200+ рабочих станций, серверы Windows/Linux и сеть здания на 7 этажах.',
          ],
          stack: ['Vue.js', 'NestJS', 'MySQL', 'JWT'],
        },
      ],
    },
    projects: {
      heading: 'Личные проекты',
      kicker: 'Помимо работы',
      items: [
        {
          name: 'CodeKids.cc',
          role: 'Сооснователь и Tech Lead',
          desc: 'Онлайн-школа программирования для детей. Сооснователь и операционный руководитель, веду как сайд-бизнес уже 4+ года: координирую небольшую команду преподавателей и операционку. Единственный разработчик продакшен-платформы: кабинеты родителей, учеников и преподавателей, расписание с переносами и отменами, учёт балансов, заявки на выплаты преподавателям, Telegram-бот.',
          tags: ['NestJS', 'Vue 3', 'PostgreSQL', 'Redis', 'Telegram Bot API'],
          links: [{ label: 'codekids.cc', href: 'https://codekids.cc' }],
        },
        {
          name: 'ServiceDesk',
          role: 'Автор',
          desc: 'Система тикетинга и helpdesk, написанная с нуля: мой дипломный проект, позже внедрённый в муниципальных медицинских учреждениях Златоуста. Архитектура компонентов, управление состоянием, REST-интеграция.',
          tags: ['Vue 3', 'NestJS', 'MySQL', 'REST'],
          links: [
            { label: 'Client', href: 'https://github.com/inesin1/ServiceDesk-Client-Vue' },
            { label: 'Backend', href: 'https://github.com/inesin1/ServiceDesk-Backend' },
          ],
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
          period: 'Красный диплом · сентябрь 2019 - июнь 2023',
        },
      ],
      extras: [
        'Дипломный проект: система Service Desk, позже внедрённая в медицинских учреждениях города.',
        'Призовые места в региональных олимпиадах по программированию (WorldSkills, профессиональное мастерство).',
        'Основные дисциплины: разработка ПО, системный анализ, проектирование баз данных, техническая документация, высшая математика.',
      ],
    },
    contact: {
      heading: 'На связи',
      kicker: 'Контакты',
      blurb: 'Открыт к ролям Middle+ / Senior Backend или Tech Lead. Удобнее всего писать в Telegram.',
      channels: [
        { label: 'Email', value: 'artyom@nesin.dev', href: 'mailto:artyom@nesin.dev', icon: 'email' },
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
