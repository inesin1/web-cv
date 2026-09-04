import type { IconKey } from './icons'

export type Lang = 'en' | 'ru'

export type CVLanguage = { name: string; level: string }

export type CVMeta = {
  name: string
  handle: string
  title: string
  subtitle: string
  location: string
  citizenship: string
  availability: string
  experience: string
  languages: CVLanguage[]
  cv: string
}

export type CVHero = {
  intro: string
  cta: string
  ctaSecondary: string
  status: string
}

export type CVAbout = {
  heading: string
  kicker: string
  paragraphs: string[]
}

export type CVStackGroup = { name: string; items: string[] }
export type CVStack = {
  heading: string
  kicker: string
  groups: CVStackGroup[]
}

export type CVLink = { label: string; href: string }

export type CVJobGroup = { title: string; bullets: string[] }

export type CVJob = {
  company: string
  role: string
  period: string
  note: string
  bullets: string[]
  groups?: CVJobGroup[]
  stack: string[]
  links?: CVLink[]
}

export type CVProject = {
  name: string
  role: string
  desc: string
  tags: string[]
  links?: CVLink[]
}

export type CVEducationItem = {
  school: string
  degree: string
  period: string
}

export type CVChannel = {
  label: string
  value: string
  href: string | null
  icon: IconKey
}

export type CVData = {
  meta: CVMeta
  nav: {
    about: string
    stack: string
    experience: string
    projects: string
    education: string
    contact: string
  }
  hero: CVHero
  about: CVAbout
  stack: CVStack
  experience: { heading: string; kicker: string; items: CVJob[] }
  projects: { heading: string; kicker: string; items: CVProject[] }
  education: {
    heading: string
    kicker: string
    items: CVEducationItem[]
    extras: string[]
  }
  contact: {
    heading: string
    kicker: string
    blurb: string
    channels: CVChannel[]
  }
  ui: {
    now: string
  }
}

export const CV_DATA: Record<Lang, CVData> = {
  en: {
    meta: {
      name: 'Artyom Nesin',
      handle: '@inesin1',
      title: 'Fullstack Engineer',
      subtitle: 'Backend-heavy · TypeScript · Node.js · NestJS · Vue 3',
      location: 'Almaty, Kazakhstan',
      citizenship: 'Kazakhstan',
      availability: 'Remote · open to relocation',
      experience: '4+ years',
      languages: [
        { name: 'Russian', level: 'native' },
        { name: 'English', level: 'B2' },
        { name: 'Kazakh', level: 'A1' },
        { name: 'German', level: 'A1' },
      ],
      cv: '/Artyom_Nesin_CV_EN.pdf',
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
      intro:
        'I take projects from the first commit to production: API design, data modelling, queues, caching, deployment and incident response.',
      cta: 'Get in touch',
      ctaSecondary: 'Download CV',
      status: 'Open to Senior Fullstack / Backend roles',
    },
    about: {
      heading: 'About',
      kicker: 'Profile',
      paragraphs: [
        'Fullstack engineer with four years of commercial experience in TypeScript, Node.js, NestJS and Vue 3, with the weight on the backend. I designed and shipped three production systems for a large retail / q-commerce client, including a lead deduplication pipeline running at around 600 requests per minute with peaks near 2,000, and a shift-scheduling platform with a time tracker embedded directly into a third-party SaaS interface.',
        'My strongest area is working against rate-limited third-party APIs: queues, idempotency, caching, retries. I also run code reviews and mentor inside the team.',
        'Looking for a Senior Fullstack or Backend Engineer role with ownership of system design and technical direction.',
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
          items: [
            'Node.js',
            'NestJS',
            'REST APIs',
            'WebSockets',
            'JWT',
            'OAuth',
          ],
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
          name: 'ORMs',
          items: ['Prisma', 'TypeORM', 'Drizzle', 'Raw SQL'],
        },
        {
          name: 'Queues and messaging',
          items: ['BullMQ', 'RabbitMQ', 'Redis Pub/Sub'],
        },
        {
          name: 'Infrastructure',
          items: [
            'Docker',
            'docker-compose',
            'Kubernetes (basic)',
            'GitLab CI/CD',
            'VPS administration',
            'Vercel',
            'Railway',
          ],
        },
        {
          name: 'Observability and testing',
          items: ['Grafana', 'Loki', 'Prometheus', 'Jest'],
        },
        {
          name: 'Integrations',
          items: [
            'amoCRM / Kommo',
            'Asana',
            'Google APIs',
            'HH.ru',
            'Avito',
            'SuperJob',
            'Naimix',
            'Telegram Bot API',
          ],
        },
        {
          name: 'Also worked with',
          items: ['Kotlin', 'Ktor'],
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
          note: 'Remote',
          bullets: [
            'Designed, built and shipped three production systems under enterprise contracts for a large retail / q-commerce client. All three sit on top of a third-party SaaS CRM (amoCRM) and treat its API as an external system; I work fullstack with a backend focus and now own the roadmap, architecture and performance of all three.',
          ],
          groups: [
            {
              title: 'System 1 · Lead deduplication and merging',
              bullets: [
                'Built a configurable merge pipeline that replaced an off-the-shelf marketplace app catching roughly 70% of duplicates. Added business exceptions and merge rules that account for lead source and sales channel; the measured merge success rate rose to about 97% over a month.',
                'Runs at around 600 requests per minute on average, peaking near 2,000. Designed around the strict API rate limits of the CRM with BullMQ queues and Redis caching, plus structured logging for tracing.',
              ],
            },
            {
              title:
                'System 2 · Shift scheduling platform and embedded time tracker',
              bullets: [
                'Designed and shipped a scheduling platform with a time tracker embedded directly into the interface of the CRM, with no browser extension. Used by 500-700 people a day out of roughly 3,000 connected users; it handles 500-700 shifts a day, and the tracker sustains 250-300 requests per minute during working hours.',
                'Built the region, group and role model with two-way role sync from the CRM, plus analytics on hours worked, leads handled and slot fill rate.',
              ],
            },
            {
              title:
                'System 3 · Automated job posting across HH.ru, Avito and SuperJob',
              bullets: [
                'Designed and built a service that publishes and updates job ads on three hiring platforms based on staffing signals from the internal system of the client, with automatic rate calculation and per-platform templates. Core logic covered with unit tests in Jest.',
              ],
            },
            {
              title: 'Additional work and ownership',
              bullets: [
                'Built a two-way integration between the CRM and Naimix, a contractor management platform: its own backend, its own database, and webhook handling on both sides. Still maintaining and extending it.',
                'Maintain and extend an integration between the CRM and the internal HR system of the client, originally written by another engineer: bug fixes, new features, deal and contact sync logic.',
                'Wrote the Webhooks marketplace app from scratch, then moved to the custom integrations team. Fixed bugs in Payments, the flagship app at Rocket.red that pulls payments, per-deal costs and revenue forecasts into a single deal card, and in Deal Copy with Templates. These apps have over 100,000 installs between them.',
                'Run code reviews and mentor a junior developer; was offered a Tech Lead position internally. Containerise services with Docker and run them on Kubernetes, maintain GitLab CI/CD pipelines and log aggregation on Grafana, Loki and Prometheus, and own incident response and technical documentation.',
              ],
            },
          ],
          stack: [
            'TypeScript',
            'NestJS',
            'Node.js',
            'PostgreSQL',
            'Redis',
            'BullMQ',
            'Docker',
            'Kubernetes',
            'amoCRM',
          ],
        },
        {
          company: 'CodeKids.cc',
          role: 'Co-founder & Tech Lead',
          period: 'Aug 2021 - Present',
          note: 'Side business · online coding school for children',
          bullets: [
            'Co-founder and operations lead for five years: I coordinate a small team of teachers and run the operational side of the school.',
            'Sole developer of the production platform: separate portals for parents, students and teachers, a schedule with rescheduling and cancellations, balance tracking, teacher payout requests, and a Telegram bot. Full ownership of architecture, deployment and business logic.',
          ],
          stack: [
            'NestJS',
            'Vue 3',
            'PostgreSQL',
            'Redis',
            'Telegram Bot API',
            'Vercel',
            'Railway',
          ],
          links: [{ label: 'codekids.cc', href: 'https://codekids.cc' }],
        },
        {
          company: 'Zlatoust City Hospital',
          role: 'Developer / IT Specialist',
          period: 'Dec 2022 - Dec 2023',
          note: 'Zlatoust, Russia',
          bullets: [
            'As the only developer, designed and built an internal service desk system from scratch (Vue.js, Kotlin/Ktor, MySQL, JWT auth), then rolled it out myself as separate installations across seven municipal institutions in the city and district. Also initiated and prototyped an internal document management system.',
            'Administered core medical and accounting systems (BARS MIS, BARS FOMS, 1C: Kamin), worked with digital signatures (Kontur, Treasury), and maintained the hospital IT infrastructure: 200+ workstations, Windows and Linux servers, and the building network across seven floors.',
          ],
          stack: ['Vue.js', 'Kotlin', 'Ktor', 'MySQL', 'JWT'],
        },
      ],
    },
    projects: {
      heading: 'Projects',
      kicker: 'Public code',
      items: [
        {
          name: 'ServiceDesk',
          role: 'Author',
          desc: 'Ticketing and helpdesk system written from scratch as my college final project, later deployed across municipal medical institutions in Zlatoust. Both repositories are public: the Vue client and the Kotlin/Ktor backend.',
          tags: ['Vue.js', 'Kotlin/Ktor', 'MySQL', 'REST'],
          links: [
            {
              label: 'Client',
              href: 'https://github.com/inesin1/ServiceDesk-Client-Vue',
            },
            {
              label: 'Backend',
              href: 'https://github.com/inesin1/ServiceDesk-Backend',
            },
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
          period: 'Graduated with distinction · Sep 2019 - Jun 2023',
        },
      ],
      extras: [
        'Final project: the service desk system later deployed across the medical institutions of the city.',
        'Placed in regional programming competitions (WorldSkills and professional skills olympiads).',
        'Core coursework: software development, systems analysis, database design, technical documentation, advanced mathematics.',
      ],
    },
    contact: {
      heading: "Let's talk",
      kicker: 'Contact',
      blurb:
        'Open to Senior Fullstack or Backend Engineer roles. Best reached on Telegram.',
      channels: [
        {
          label: 'Email',
          value: 'artyom@nesin.dev',
          href: 'mailto:artyom@nesin.dev',
          icon: 'email',
        },
        {
          label: 'Telegram',
          value: '@kurtr2d',
          href: 'https://t.me/kurtr2d',
          icon: 'telegram',
        },
        {
          label: 'GitHub',
          value: 'github.com/inesin1',
          href: 'https://github.com/inesin1',
          icon: 'github',
        },
        {
          label: 'LinkedIn',
          value: 'linkedin.com/in/inesin',
          href: 'https://www.linkedin.com/in/inesin/',
          icon: 'linkedin',
        },
        {
          label: 'Book a call',
          value: 'calendly.com/artem-nesin',
          href: 'https://calendly.com/artem-nesin',
          icon: 'calendar',
        },
        {
          label: 'Location',
          value: 'Almaty, Kazakhstan',
          href: null,
          icon: 'location',
        },
      ],
    },
    ui: {
      now: 'Now',
    },
  },

  ru: {
    meta: {
      name: 'Артём Несин',
      handle: '@inesin1',
      title: 'Fullstack-разработчик',
      subtitle: 'Уклон в backend · TypeScript · Node.js · NestJS · Vue 3',
      location: 'Алматы, Казахстан',
      citizenship: 'Казахстан',
      availability: 'Удалённо · готов к релокации',
      experience: '4+ года',
      languages: [
        { name: 'Русский', level: 'родной' },
        { name: 'Английский', level: 'B2' },
        { name: 'Казахский', level: 'A1' },
        { name: 'Немецкий', level: 'A1' },
      ],
      cv: '/Artyom_Nesin_CV_RU.pdf',
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
      intro:
        'Веду проект от первого коммита до прода: API-дизайн, модель данных, очереди, кэширование, деплой, разбор инцидентов.',
      cta: 'Связаться',
      ctaSecondary: 'Скачать CV',
      status: 'Открыт к ролям Senior Fullstack / Backend',
    },
    about: {
      heading: 'О себе',
      kicker: 'Профиль',
      paragraphs: [
        'Fullstack-разработчик с 4 годами коммерческого опыта на TypeScript, Node.js, NestJS и Vue 3, с упором в backend. Спроектировал и вывел в прод три системы для крупного ритейл/q-commerce клиента, включая пайплайн контроля дубликатов лидов под нагрузкой около 600 запросов в минуту (пики до 2 000) и платформу управления таймслотами с тайм-трекером, встроенным прямо в интерфейс сторонней SaaS-CRM.',
        'Отдельная сильная сторона — работа с внешними API под жёсткими rate-лимитами: очереди, идемпотентность, кэш, ретраи. Веду код-ревью и менторинг в команде.',
        'Ищу позицию Senior Fullstack или Backend-разработчика с ответственностью за дизайн систем и техническую часть продукта.',
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
          items: ['Node.js', 'NestJS', 'REST API', 'WebSockets', 'JWT', 'OAuth'],
        },
        {
          name: 'Frontend',
          items: [
            'Vue 3',
            'Vue Router',
            'Pinia',
            'Переиспользуемые UI-компоненты',
          ],
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
          items: [
            'Docker',
            'docker-compose',
            'Kubernetes (базовый)',
            'GitLab CI/CD',
            'Администрирование VPS',
            'Vercel',
            'Railway',
          ],
        },
        {
          name: 'Мониторинг и тесты',
          items: ['Grafana', 'Loki', 'Prometheus', 'Jest'],
        },
        {
          name: 'Интеграции',
          items: [
            'amoCRM / Kommo',
            'Asana',
            'Google API',
            'HH.ru',
            'Avito',
            'SuperJob',
            'Naimix',
            'Telegram Bot API',
          ],
        },
        {
          name: 'Также работал с',
          items: ['Kotlin', 'Ktor'],
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
          note: 'Удалённо',
          bullets: [
            'Спроектировал, разработал и вывел в прод три продакшен-системы в рамках enterprise-контрактов для крупного российского ритейл/q-commerce клиента. Все три построены поверх сторонней SaaS-CRM (amoCRM) и работают с её API как с внешней системой. Работал fullstack с упором на backend; сейчас отвечаю за развитие, архитектуру и производительность всех трёх.',
          ],
          groups: [
            {
              title: 'Система 1 · Контроль дубликатов и объединение лидов',
              bullets: [
                'Построил конфигурируемый пайплайн склейки лидов, заменивший маркетплейс-решение, которое ловило около 70 % дублей. Добавил бизнес-исключения и логику склейки с учётом источника лида и канала продаж — замеренный процент успешных склеек за месяц вырос примерно до 97 %.',
                'Продакшен-нагрузка — в среднем 600 запросов в минуту с пиками до 2 000. Спроектировал под жёсткие rate-лимиты внешнего API: очереди BullMQ, кэширование в Redis, структурированное логирование для трассировки.',
              ],
            },
            {
              title:
                'Система 2 · Платформа управления таймслотами и тайм-трекер',
              bullets: [
                'Спроектировал и выпустил платформу управления таймслотами с тайм-трекером, встроенным прямо в интерфейс внешней CRM (без браузерного расширения). Ей пользуются 500-700 сотрудников в сутки, всего к системе подключено около 3 000 пользователей; обрабатывается 500-700 таймслотов в сутки, тайм-трекер держит 250-300 запросов в минуту в рабочее время.',
                'Построил модель регионов, групп и ролей с двусторонней синхронизацией ролей пользователей из внешней CRM, плюс аналитику по отработанному времени, обработанным лидам и заполняемости слотов.',
              ],
            },
            {
              title:
                'Система 3 · Автоматизация публикации вакансий (HH, Avito, SuperJob)',
              bullets: [
                'Спроектировал и реализовал сервис, который автоматически публикует и обновляет вакансии на HH.ru, Avito и SuperJob по сигналам о потребности в найме из внутренней системы клиента — с автоматическим расчётом ставок и шаблонами под каждую площадку. Основная логика покрыта юнит-тестами на Jest.',
              ],
            },
            {
              title: 'Дополнительные проекты, виджеты и зона ответственности',
              bullets: [
                'Построил двустороннюю интеграцию CRM с внешней платформой для работы с самозанятыми (Naimix) для того же клиента: собственный бэкенд с базой данных и обработкой вебхуков с обеих сторон; поддерживаю и развиваю.',
                'Поддерживаю и расширяю интеграцию между CRM и внутренней HR-системой клиента, изначально написанную другим инженером: багфиксы, новые фичи, логика синхронизации сделок и контактов.',
                'С нуля написал виджет «Вебхуки», затем перешёл в команду кастомных интеграций. Делал багфиксы во флагманском виджете «Платежи» (сводит все платежи, затраты по сделкам и прогноз выручки в карточке сделки) и в «Копировании сделки с шаблонами». Суммарный footprint этих виджетов в маркетплейсе платформы — более 100 000 установок.',
                'Веду код-ревью и менторинг младшего разработчика; получал предложение перейти на позицию Tech Lead внутри компании. Контейнеризую сервисы в Docker и запускаю в Kubernetes, поддерживаю пайплайны GitLab CI/CD и агрегацию логов на Grafana / Loki / Prometheus, отвечаю за разбор инцидентов и техническую документацию.',
              ],
            },
          ],
          stack: [
            'TypeScript',
            'NestJS',
            'Node.js',
            'PostgreSQL',
            'Redis',
            'BullMQ',
            'Docker',
            'Kubernetes',
            'amoCRM',
          ],
        },
        {
          company: 'CodeKids.cc',
          role: 'Сооснователь и Tech Lead',
          period: 'Август 2021 - настоящее время',
          note: 'Сайд-проект · онлайн-школа программирования для детей',
          bullets: [
            'Сооснователь и операционный руководитель школы уже 5 лет: координирую небольшую команду преподавателей, веду операционную часть.',
            'Единственный разработчик продакшен-платформы: личные кабинеты родителей, учеников и преподавателей, расписание с переносами и отменами, учёт балансов, заявки на выплаты преподавателям, Telegram-бот. Полная ответственность за архитектуру, деплой и бизнес-логику.',
          ],
          stack: [
            'NestJS',
            'Vue 3',
            'PostgreSQL',
            'Redis',
            'Telegram Bot API',
            'Vercel',
            'Railway',
          ],
          links: [{ label: 'codekids.cc', href: 'https://codekids.cc' }],
        },
        {
          company: 'Городская больница г. Златоуст',
          role: 'Разработчик / IT-специалист',
          period: 'Декабрь 2022 - декабрь 2023',
          note: 'Златоуст, Россия',
          bullets: [
            'Как единственный разработчик спроектировал и построил с нуля внутреннюю систему Service Desk (Vue.js, Kotlin/Ktor, MySQL, JWT-авторизация), затем самостоятельно развернул её отдельными инсталляциями в 7 муниципальных учреждениях города и округа. Инициировал и спрототипировал внутреннюю систему электронного документооборота.',
            'Администрировал ключевые медицинские и учётные системы (БАРС МИС, БАРС ФОМС, 1С: Камин), работал с электронными подписями (Контур, Казначейство), поддерживал IT-инфраструктуру больницы: 200+ рабочих станций, серверы Windows и Linux, сеть здания на 7 этажей.',
          ],
          stack: ['Vue.js', 'Kotlin', 'Ktor', 'MySQL', 'JWT'],
        },
      ],
    },
    projects: {
      heading: 'Проекты',
      kicker: 'Публичный код',
      items: [
        {
          name: 'ServiceDesk',
          role: 'Автор',
          desc: 'Система тикетинга и helpdesk, написанная с нуля как дипломный проект, позже внедрённая в муниципальных медицинских учреждениях Златоуста. Оба репозитория открыты: клиент на Vue и бэкенд на Kotlin/Ktor.',
          tags: ['Vue.js', 'Kotlin/Ktor', 'MySQL', 'REST'],
          links: [
            {
              label: 'Client',
              href: 'https://github.com/inesin1/ServiceDesk-Client-Vue',
            },
            {
              label: 'Backend',
              href: 'https://github.com/inesin1/ServiceDesk-Backend',
            },
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
        'Дипломный проект — та же система Service Desk, что позже была внедрена в медицинских учреждениях города.',
        'Призовые места в региональных олимпиадах по программированию (WorldSkills, профессиональное мастерство).',
        'Основные дисциплины: разработка ПО, системный анализ, проектирование баз данных, техническая документация, высшая математика.',
      ],
    },
    contact: {
      heading: 'На связи',
      kicker: 'Контакты',
      blurb:
        'Открыт к ролям Senior Fullstack или Backend-разработчика. Удобнее всего писать в Telegram.',
      channels: [
        {
          label: 'Email',
          value: 'artyom@nesin.dev',
          href: 'mailto:artyom@nesin.dev',
          icon: 'email',
        },
        {
          label: 'Telegram',
          value: '@kurtr2d',
          href: 'https://t.me/kurtr2d',
          icon: 'telegram',
        },
        {
          label: 'GitHub',
          value: 'github.com/inesin1',
          href: 'https://github.com/inesin1',
          icon: 'github',
        },
        {
          label: 'LinkedIn',
          value: 'linkedin.com/in/inesin',
          href: 'https://www.linkedin.com/in/inesin/',
          icon: 'linkedin',
        },
        {
          label: 'Созвон',
          value: 'calendly.com/artem-nesin',
          href: 'https://calendly.com/artem-nesin',
          icon: 'calendar',
        },
        {
          label: 'Локация',
          value: 'Алматы, Казахстан',
          href: null,
          icon: 'location',
        },
      ],
    },
    ui: {
      now: 'Сейчас',
    },
  },
}
