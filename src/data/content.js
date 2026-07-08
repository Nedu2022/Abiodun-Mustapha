const WHATSAPP = 'https://api.whatsapp.com/send?phone=2348148560609'
const WHATSAPP_BOOK =
  'https://api.whatsapp.com/send?phone=2348148560609&text=Hello%20Abiodun,%20I%20would%20like%20to%20book%20you%20for%20a%20speaking%20or%20training%20engagement.'

export const site = {
  first: 'Abiodun',
  last: 'Mustapha',
  name: 'Dr. Abiodun Mustapha',
  email: 'abiodunmustapha11@gmail.com',
  whatsapp: WHATSAPP,
  ctaLabel: 'Book a Session',
  ctaHref: WHATSAPP_BOOK,
}

export const nav = [
  { label: 'Story', href: '#story' },
  { label: 'Book', href: '#book' },
  { label: 'Resources', href: '#resources' },
  { label: 'Podcast', href: '#podcast' },
  { label: 'Speaking', href: '#speaking' },
]

export const hero = {
  eyebrow: 'Personal Development · Faith · Purpose',
  name: 'Dr. Abiodun Mustapha',
  roles: 'Personal Development Expert. Educator. Author. Speaker.',
  mission:
    'I help everyday people discover their purpose, build real discipline, and grow into the fullness of who they were created to be.',
  blurb:
    'From the streets of Oshodi to a life of learning and impact, my journey is proof that where you begin does not decide where you finish. I teach the very same principles that turned my own life around.',
  image: '/images/portrait-suit.jpg',
  primary: { label: 'Book a Session', href: WHATSAPP_BOOK },
  secondary: { label: 'Get a Free Ebook', href: 'http://bit.ly/freepurposebook' },
}

export const credentials = [
  'Author of “30 Lessons Life Taught Me Before 30”',
  'Host of the Growth Secrets Podcast',
  'Founder of Growth Hub Africa',
  'From Oshodi to the pursuit of a PhD',
]

export const story = {
  eyebrow: 'My Story',
  title: 'From Oshodi',
  accent: 'to purpose',
  image: '/images/portrait-bw.jpg',
  body: [
    'I did not grow up with much. The streets of Oshodi were loud, crowded, and unforgiving, and for a long time they were the whole of my world.',
    'But somewhere along the way I made a decision. I chose to keep learning, to keep believing, and to keep showing up even when nothing around me looked like the future I was praying for.',
    'That decision carried me from those streets into classrooms, onto stages, and into the lives of thousands of people I now get to teach. My story is not really about me. It is proof of what becomes possible when an ordinary person refuses to give up on their purpose.',
  ],
  link: {
    label: 'Read the full story',
    href: 'https://medium.com/@abiodunmustapha11/from-the-streets-of-oshodi-to-academic-scholarship-the-inspiring-story-of-a-young-boy-bf5d35c147a8',
  },
}

export const book = {
  eyebrow: 'The Book',
  title: '30 Lessons Life Taught Me',
  accent: 'Before 30',
  cover: '/images/book-30.jpg',
  subtitle: 'The Myths, Mistakes and Miracles',
  foreword: 'Foreword by Dr. Femi Awoyomi, Chairman, African Young Brains',
  description:
    'Thirty honest lessons on purpose, discipline, money, faith, and becoming, drawn straight from a life that was rebuilt from the ground up. It is the book I wish someone had handed me at twenty.',
  primary: { label: 'Get it on Amazon', href: 'https://www.amazon.com/dp/B088QT8B9W' },
  secondary: { label: 'Visit my bookstore', href: 'https://selar.co/m/AbiodunMustapha' },
}

export const resources = {
  eyebrow: 'Free Resources',
  title: 'Start growing',
  accent: 'today',
  intro:
    'Free tools I put together to help you find clarity and move forward. Take what you need, no strings attached.',
  items: [
    {
      tag: 'Free Ebook',
      title: 'Finding Purpose With Clarity, Faster',
      desc: 'A short, practical guide to discovering what you are truly here to do.',
      href: 'http://bit.ly/freepurposebook',
    },
    {
      tag: 'Free Challenge',
      title: '3-Day Purpose Challenge',
      desc: 'Three days, three simple steps to get unstuck. Join the challenge on Telegram.',
      href: 'http://t.me/purposechallenge',
    },
    {
      tag: 'Free Ebook',
      title: 'Breaking The Boundary Called Localization',
      desc: 'On thinking bigger than your environment and building a life without limits.',
      href: 'https://sendfox.com/lp/1we5r0',
    },
    {
      tag: 'Ebook',
      title: 'How to Productize Your Knowledge and Make Consistent Cash',
      desc: 'Turn what you already know into a product people are happy to pay for.',
      href: 'http://bit.ly/ProductizingYourKnowledge',
    },
  ],
}

export const podcast = {
  eyebrow: 'Watch & Listen',
  title: 'Growth Secrets,',
  accent: 'in your ears',
  body: 'Every episode is a candid conversation about purpose, personal growth, faith, and the real work of becoming better. Tune in on your favourite platform.',
  primary: { label: 'Listen to the Podcast', href: 'https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy8yOGM1MDMwMC9wb2RjYXN0L3Jzcw' },
  secondary: { label: 'Watch on YouTube', href: 'https://www.youtube.com/channel/UC4KuhzkY8SNEbEUD78LBo6w' },
}

export const speaking = {
  eyebrow: 'Speaking & Training',
  title: 'Invite me to your',
  accent: 'next event',
  body: 'I speak and train on purpose, personal development, and growth for churches, schools, companies, and conferences. Let us create something your audience will remember.',
  topics: [
    'Purpose & Clarity',
    'Personal Development',
    'Discipline & Habits',
    'Faith & Work',
    'Leadership',
    'Productizing Knowledge',
  ],
  cta: { label: 'Book Me for Your Event', href: WHATSAPP_BOOK },
}

export const community = {
  eyebrow: 'Community',
  title: 'Grow with',
  accent: 'Growth Hub Africa',
  body: 'A growing family of people who are serious about becoming better. Daily encouragement, practical lessons, and honest conversation, all in one place.',
  cta: { label: 'Join on Telegram', href: 'https://t.me/growthhubafrica' },
}

export const gallery = {
  eyebrow: 'In Motion',
  title: 'Moments &',
  accent: 'work',
  images: [
    '/images/speaking-tedx.jpg',
    '/images/speaking-white.jpg',
    '/images/speaking-regalia.jpg',
    '/images/speaking-convocation.jpg',
    '/images/speaking-agbada.jpg',
    '/images/speaking-confab.jpg',
    '/images/speaking-podium.jpg',
    '/images/speaking-futureforward.jpg',
    '/images/event-panel.jpg',
    '/images/speaking-mic.jpg',
    '/images/event-lightcongress.jpg',
    '/images/speaking-advance.jpg',
  ],
}

export const socials = [
  { id: 'instagram', label: 'Instagram', icon: 'instagram', url: 'https://instagram.com/iamabiodunmustapha' },
  { id: 'youtube', label: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com/channel/UC4KuhzkY8SNEbEUD78LBo6w' },
  { id: 'telegram', label: 'Telegram', icon: 'telegram', url: 'https://t.me/growthhubafrica' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'whatsapp', url: WHATSAPP },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/abiodunmustapha/' },
  { id: 'medium', label: 'Medium', icon: 'medium', url: 'https://medium.com/@abiodunmustapha11' },
  { id: 'email', label: 'Email', icon: 'email', url: 'mailto:abiodunmustapha11@gmail.com' },
]
