const WHATSAPP = 'https://api.whatsapp.com/send?phone=2348148560609'

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
  { label: 'About', href: '/about' },
  { label: 'Story', href: '#story' },
  { label: 'Book', href: '#book' },
  { label: 'Work', href: '#services' },
  { label: 'Podcast', href: '#podcast' },
  { label: 'Speaking', href: '#speaking' },
  { label: 'Events', href: '#events' },
  { label: 'FAQ', href: '#faq' },
]

export const hero = {
  eyebrow: 'Thought Leader and Global Speaker',
  name: 'Dr. Abiodun Mustapha',
  roles: 'Personal Development Expert. Educator. Author',
  mission:
    'I help everyday people discover their purpose, build real discipline, and grow into the fullness of who they were created to be.',
  blurb:
    'Today I teach, write, and speak to people who are ready to stop existing and start living. Everything I hand you, I lived through first.',
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

export const about = {
  eyebrow: 'About',
  title: 'Background &',
  accent: 'Credentials',
  image: '/images/portrait-gesture.jpg',
  body: [
    'Dr. Abiodun Mustapha is a Thought Leader, Tech Consultant, and Educator, and the Founder of Growth Hub Africa, a community of strategic career leaders and business experts. He was trained and certified as a Business Trainer and Coach by the German Development Corporation (GIZ) in 2018, and currently coordinates the advocacy and operations at the Institute of Digital Humanities and Technologies at Anchor University, Lagos.',
    'He is the Host of Growth School, a weekly webinar on the systems of personal, career, and business development, and Host of the podcast Growth Secrets w/ Abiodun Mustapha, on which he convenes professionals from various spheres of life. He is also the Founder of Growth Hub Africa and GrowthSpec Technologies Ltd.',
    'He has trained over 2,000 professionals and coached over 45 professionals and business owners to date. In 2025, he served as Consulting Facilitator for the Eko Digital Skills Initiative and the Job Creation Initiative, both under the Lagos State Ministry of Tertiary Education, programmes aimed at building digital and career readiness capacity among young people and undergraduates across Lagos State.',
    'His work centres on a consistent framework guiding professionals and businesses through a process of purpose, productivity, and profitability, delivered through speaking engagements, structured training, personal coaching, and writing.',
    'His published works, including Mind Shift and 30 Lessons Life Taught Me Before 30, among others, explore these themes and have been credited with driving remarkable shifts in mindset among readers. He also has research work in peer reviewed journals, book chapters, and conference proceedings.',
    'His voice and work have featured across numerous platforms, including the Young Professional Forum in Ketu, Oshodi, Agege, and Isheri Idimu, The Prophetic Woman, Dear Potential, Sweet FM, Splash FM, KMC TV, Edufrica, the Prevarsity Conference, and the NACOS Conference, among others.',
  ],
  credentials: [
    'Certified Business Trainer and Coach, GIZ (2018)',
    'Member, Nigeria Computer Society',
    'Member, Association for Computing Machinery',
    'Chartered Member, Computer Professionals of Nigeria',
    'Charter Member, Association of Cybersecurity Practitioners',
    'Charter Member, Association of Ranking Professionals',
  ],
}

export const story = {
  eyebrow: 'My Story',
  title: 'From Oshodi',
  accent: 'to Global Impact',
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
      meta: 'Self-paced',
      desc: 'The exact framework for naming the assignment your life was built for, then mastering it.',
    },
    {
      tag: 'Coaching',
      title: 'One-on-One Coaching',
      meta: '90-minute session',
      desc: 'A private, strategic session on where you are stuck and where you are headed. We name the next move and how you make it.',
    },
    {
      tag: 'Speaking',
      title: 'Speaking Engagement',
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
  body: 'I stand in front of professionals, schools, companies, and conferences and leave the room different than I found it. Give me your audience and I will give them a moment they carry home.',
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
      title: ' China IECC Workshop',
      role: 'Speaker',
      note: 'Purpose & personal transformation',
      image: '/images/event-lightcongress.jpg',
    },
    {
      title: 'TEDx',
      role: 'Organizer',
      note: 'Thinking bigger than your environment',
      image: '/images/speaking-futureforward.jpg',
    },
    {
      title: 'SHI Conference',
      role: 'Speaker',
      note: 'Discipline, habits & becoming',
      image: '/images/speaking-advance.jpg',
    },
    {
      title: 'Leadership Confab',
      role: 'Team Lead',
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
  intro: 'A closer look at the talks, sessions, and conversations, in motion.',

  videos: [
    { id: '9eHFbWvEtLY', title: 'Introduction to Microsoft Excel' },
    { id: 'HpqIiLnEUwk', title: 'Opportunities with AI in the New Decade (AI Summit)' },
    { id: 'JrMzdVGTpJg', title: 'AI Summit 2026: Beyond Human Thinking' },
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

export const faq = {
  eyebrow: 'Questions',
  title: 'The things people',
  accent: 'always ask',
  intro:
    'Before we ever get on a call, these are the questions that show up in my inbox most. Here are the honest answers.',
  items: [
    {
      q: 'Who is Dr. Abiodun Mustapha?',
      a: 'I am a personal development expert, educator, author and speaker based in Lagos, Nigeria. I am the founder of Growth Hub Africa and GrowthSpec Technologies Ltd, a GIZ-certified business trainer and coach, and the author of 30 Lessons Life Taught Me Before 30. I grew up on the streets of Oshodi and now teach professionals how to move through purpose, productivity and profitability.',
    },
    {
      q: 'How do I book Abiodun Mustapha to speak at my event?',
      a: 'Send the invitation through the booking page on this site, or reach me on WhatsApp or by email. Tell me the date, the audience and what you want them to walk away with, and I will come back to you personally with availability and a plan for the session.',
    },
    {
      q: 'What topics does he speak on?',
      a: 'Purpose and clarity, personal development, discipline and habits, faith and work, leadership, and productizing your knowledge. I speak to churches, schools, companies and conferences, and I shape every talk around the room I am walking into.',
    },
    {
      q: 'Does he offer one-on-one coaching?',
      a: 'Yes. I run private 90-minute coaching sessions on where you are stuck and where you are headed, alongside the self-paced Purpose Mastery Masterclass. I have coached over 45 professionals and business owners and trained more than 2,000 people to date.',
    },
    {
      q: 'What books has Abiodun Mustapha written?',
      a: 'My published works include 30 Lessons Life Taught Me Before 30: The Myths, Mistakes and Miracles, and Mind Shift. 30 Lessons is available on Amazon and through my Selar bookstore, and I also give away a free purpose ebook to anyone starting out.',
    },
    {
      q: 'Where can I listen to the Growth Secrets podcast?',
      a: 'Growth Secrets w/ Abiodun Mustapha is on Google Podcasts and every major podcast app through the Anchor feed, and the video episodes are on my YouTube channel. Each one is an unscripted sit-down with a professional worth learning from.',
    },
    {
      q: 'What is Growth Hub Africa?',
      a: 'Growth Hub Africa is the community I founded for strategic career leaders and business experts. It runs on Telegram, and it is where the daily encouragement, practical wisdom and accountability live. Joining is free.',
    },
    {
      q: 'Where is Dr. Abiodun Mustapha based?',
      a: 'I am based in Lagos, Nigeria, where I coordinate advocacy and operations at the Institute of Digital Humanities and Technologies at Anchor University. I speak and train both across Nigeria and internationally, including virtual sessions.',
    },
  ],
}
