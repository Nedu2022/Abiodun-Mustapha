const WHATSAPP = 'https://api.whatsapp.com/send?phone=2348148560609'

// Booking & speaking invitations route to the official website.
const BOOKING_FORM = 'https://abiodunmustapha11.wixsite.com/abiodunmustapha'

export const site = {
  first: 'Abiodun',
  last: 'Mustapha',
  name: 'Dr. Abiodun Mustapha',
  email: 'abiodunmustapha11@gmail.com',
  whatsapp: WHATSAPP,
  bookingForm: BOOKING_FORM,
  ctaLabel: 'Book a Session',
  ctaHref: BOOKING_FORM,
}

export const nav = [
  { label: 'Story', href: '#story' },
  { label: 'Book', href: '#book' },
  { label: 'Work', href: '#services' },
  { label: 'Podcast', href: '#podcast' },
  { label: 'Speaking', href: '#speaking' },
  { label: 'Events', href: '#events' },
]

export const hero = {
  eyebrow: 'Personal Development · Faith · Purpose',
  name: 'Dr. Abiodun Mustapha',
  roles: 'Personal Development Expert. Educator. Author. Speaker.',
  mission:
    'I help everyday people discover their purpose, build real discipline, and grow into the fullness of who they were created to be.',
  blurb:
    'Today I teach, write, and speak to people who are ready to stop existing and start truly living. Everything I hand you, I lived through first.',
  image: '/images/portrait-suit.jpg',
  primary: { label: 'Book a Session', href: BOOKING_FORM },
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
    'That one decision carried me off those streets and into classrooms, lecture halls, and eventually the lives of people I never imagined I would reach. My story was never really about me. It is what happens when an ordinary person refuses to quit on themselves.',
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
    'Thirty lessons on the myths I believed, the mistakes I made, and the miracles that found me anyway, drawn straight from a life rebuilt from nothing. It is the book I wish someone had handed me at twenty.',
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

export const services = {
  eyebrow: 'Work With Me',
  title: 'Ways we can',
  accent: 'work together',
  intro:
    'When you are ready to go further than the free downloads, these are the doors. Pick the one that meets you where you stand, and let us get to work.',
  items: [
    {
      tag: 'Masterclass',
      title: 'Purpose Mastery Masterclass',
      price: '₦10,000',
      meta: 'Self-paced',
      desc: 'The exact framework for naming the assignment your life was built for, then mastering it.',
    },
    {
      tag: 'Coaching',
      title: 'One-on-One Coaching',
      price: '₦50,000',
      meta: '90-minute session',
      desc: 'A private, strategic session on where you are stuck and where you are headed. We name the next move and how you make it.',
    },
    {
      tag: 'Speaking',
      title: 'Speaking Engagement',
      price: '₦80,000',
      meta: '60-minute session',
      desc: 'Bring me to your event to send your audience home with fire in their belly and a plan in their hand.',
    },
  ],
  cta: { label: 'Reserve Your Spot', href: BOOKING_FORM },
}

export const podcast = {
  eyebrow: 'Watch & Listen',
  title: 'Growth Secrets,',
  accent: 'in your ears',
  body: 'Every episode is an unfiltered, unscripted sit-down. The questions people are too polite to ask, answered without the gloss. Pull up a seat and listen in.',
  primary: { label: 'Listen to the Podcast', href: 'https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy8yOGM1MDMwMC9wb2RjYXN0L3Jzcw' },
  secondary: { label: 'Watch on YouTube', href: 'https://www.youtube.com/channel/UC4KuhzkY8SNEbEUD78LBo6w' },
}

export const speaking = {
  eyebrow: 'Speaking & Training',
  title: 'Invite me to your',
  accent: 'next event',
  body: 'I stand in front of churches, schools, companies, and conferences and leave the room different than I found it. Give me your audience and I will give them a moment they carry home.',
  topics: [
    'Purpose & Clarity',
    'Personal Development',
    'Discipline & Habits',
    'Faith & Work',
    'Leadership',
    'Productizing Knowledge',
  ],
  cta: { label: 'Book Me for Your Event', href: BOOKING_FORM },
}

export const events = {
  eyebrow: 'Stages & Events',
  title: 'The rooms I now get',
  accent: 'invited into',
  intro:
    'From TEDx to national congresses, campuses, and boardrooms, I have been handed microphones I once only dreamed of holding. Where you are today does not define where you will end. These stages are my proof.',
  featured: {
    tag: 'TEDx Speaker',
    name: 'TEDx',
    x: 'x',
    line: 'Ideas worth spreading',
    desc: 'I stood on the TEDx stage and told the truth: an ordinary boy from Oshodi can build a life of purpose. The same principles that turned my story around are the ones I came to share.',
    image: '/images/speaking-tedx.jpg',
  },
  list: [
    {
      title: 'The Light Congress',
      role: 'Keynote Speaker',
      note: 'Purpose & personal transformation',
      image: '/images/event-lightcongress.jpg',
    },
    {
      title: 'Future Forward Conference',
      role: 'Guest Speaker',
      note: 'Thinking bigger than your environment',
      image: '/images/speaking-futureforward.jpg',
    },
    {
      title: 'The Advance',
      role: 'Facilitator',
      note: 'Discipline, habits & becoming',
      image: '/images/speaking-advance.jpg',
    },
    {
      title: 'Leadership Confab',
      role: 'Panelist & Speaker',
      note: 'Faith, work & leadership',
      image: '/images/speaking-confab.jpg',
    },
  ],
  stats: [
    { value: '2,000+', label: 'People trained' },
    { value: '45+', label: 'Leaders coached' },
    { value: 'GIZ', label: 'Certified trainer & coach' },
  ],
  cta: { label: 'Invite me to speak', href: BOOKING_FORM },
}

export const community = {
  eyebrow: 'Community',
  title: 'Grow with',
  accent: 'Growth Hub Africa',
  body: 'A family of people who refuse to do life alone. Daily encouragement, practical wisdom, and the kind of accountability that actually moves you forward.',
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
