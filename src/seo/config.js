
export const SITE_URL = 'https://abiodunmustapha.com'

export const DEFAULT_OG_IMAGE = {
  path: '/images/portrait-suit.jpg',
  width: 1728,
  height: 2160,
  alt: 'Dr. Abiodun Mustapha, personal development expert, author and speaker',
}

export const person = {
  name: 'Dr. Abiodun Mustapha',
  alternateNames: ['Abiodun Mustapha', 'Dr Abiodun Mustapha'],
  honorificPrefix: 'Dr.',
  givenName: 'Abiodun',
  familyName: 'Mustapha',
  jobTitle: 'Personal Development Expert, Educator, Author and Speaker',
  email: 'abiodunmustapha11@gmail.com',
  telephone: '+2348148560609',
  image: '/images/portrait-suit.jpg',
  city: 'Lagos',
  country: 'NG',
  countryName: 'Nigeria',
  // Only claims that appear verbatim in the site copy. Nothing invented.
  knowsAbout: [
    'Personal development',
    'Purpose and clarity',
    'Discipline and habits',
    'Leadership development',
    'Career coaching',
    'Business training',
    'Productizing knowledge',
    'Digital skills training',
    'Faith and work',
  ],
  sameAs: [
    'https://www.linkedin.com/in/abiodunmustapha/',
    'https://instagram.com/iamabiodunmustapha',
    'https://www.youtube.com/channel/UC4KuhzkY8SNEbEUD78LBo6w',
    'https://medium.com/@abiodunmustapha11',
    'https://t.me/growthhubafrica',
    'https://linktr.ee/abiodunmustapha',
    'https://selar.co/m/AbiodunMustapha',
    'https://www.amazon.com/dp/B088QT8B9W',
    'https://abiodunmustapha11.wixsite.com/abiodunmustapha',
  ],
  credentials: [
    'Certified Business Trainer and Coach, German Development Corporation (GIZ), 2018',
    'Chartered Member, Computer Professionals of Nigeria',
    'Member, Nigeria Computer Society',
    'Member, Association for Computing Machinery',
    'Charter Member, Association of Cybersecurity Practitioners',
    'Charter Member, Association of Ranking Professionals',
  ],
}

export const organization = {
  name: 'Growth Hub Africa',
  legalName: 'GrowthSpec Technologies Ltd.',
  description:
    'A community of strategic career leaders and business experts, founded by Dr. Abiodun Mustapha.',
  url: 'https://t.me/growthhubafrica',
}

export const book = {
  name: '30 Lessons Life Taught Me Before 30',
  alternativeHeadline: 'The Myths, Mistakes and Miracles',
  image: '/images/book-30.jpg',
  description:
    'Thirty lessons on the myths, mistakes and miracles behind a life rebuilt from nothing, by Dr. Abiodun Mustapha.',
  amazon: 'https://www.amazon.com/dp/B088QT8B9W',
  store: 'https://selar.co/m/AbiodunMustapha',
  inLanguage: 'en',
}

export const podcast = {
  name: 'Growth Secrets w/ Abiodun Mustapha',
  description:
    'Unfiltered, unscripted conversations with professionals on purpose, productivity and profitability, hosted by Dr. Abiodun Mustapha.',
  feed: 'https://anchor.fm/s/28c50300/podcast/rss',
  url: 'https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy8yOGM1MDMwMC9wb2RjYXN0L3Jzcw',
  youtube: 'https://www.youtube.com/channel/UC4KuhzkY8SNEbEUD78LBo6w',
}

// Per-route <head> copy. Titles stay under ~60 chars and descriptions under
// ~155 so Google renders them whole instead of truncating with an ellipsis.
export const pages = {
  home: {
    path: '/',
    title: 'Dr. Abiodun Mustapha | Personal Development Expert & Speaker',
    description:
      'Dr. Abiodun Mustapha is a personal development expert, educator, author and speaker in Lagos, Nigeria. Book him to speak, train your team, or coach you one on one.',
    image: '/images/portrait-suit.jpg',
  },
  about: {
    path: '/about',
    title: 'About Dr. Abiodun Mustapha | Bio, Credentials & Speaker Profile',
    description:
      'The full biography of Dr. Abiodun Mustapha: GIZ-certified trainer, founder of Growth Hub Africa, TEDx speaker, and author who has trained over 2,000 professionals.',
    image: '/images/portrait-gesture.jpg',
  },
}

export const absolute = (path = '/') =>
  path.startsWith('http') ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
