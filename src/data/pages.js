// Content for the four "Who is TOP?" sub-pages.
// Sourced from the campaign fliers and humanized for the web.

// ─────────────────────────────────────────────────────────────────────────
// Canonical candidate facts — single source of truth.
// ─────────────────────────────────────────────────────────────────────────
export const CANDIDATE = {
  name: 'Oluwadolapo Popoola',
  shortName: 'TOP',
  faculty: 'Medicine',
  level: '400 Level',
  school: 'LAUTECH Ogbomoso',
  association: 'LAUMSA',
  cohort: 'Class of 2026',
  program: 'Medicine & Surgery (MBBS)',
  summary: 'Medicine · 400 Level · LAUTECH Ogbomoso',
};

// ─────────────────────────────────────────────────────────────────────────
// Bio page — External Leadership & Volunteer
// ─────────────────────────────────────────────────────────────────────────
export const BIO_LEADERSHIP = [
  { role: 'Founder & Creative Director', org: 'Creativerse Brand & Media Consult', dates: 'Aug 2025 — Present' },
  { role: 'The Ambassador', org: 'The Assembly', dates: 'Nov 2025 — Present' },
  { role: 'Marketing Strategist', org: 'Kinora Restaurant', dates: 'Jan 2026 — Present' },
  { role: 'LAUTECH Campus Ambassador', org: 'CountryWise', dates: 'Nov 2021 — Present' },
];

export const BIO_VOLUNTEER = [
  { role: 'Organizing Team', org: 'ExhibitMosho ’26 — The First Ever Art Exhibition in Ogbomoso', dates: 'Feb 2026' },
  { role: 'United Nations Millennium Fellow', org: 'Theme: Education — a tool for eradicating poverty', dates: '2022' },
  { role: 'Member / Media', org: 'LAUMSA SC on Sexual & Reproductive Health + HIV/AIDS', dates: '2023 — 2024' },
  { role: 'Member / Graphic Designer', org: 'LAUMSA SC on Medical Education', dates: '2022' },
  { role: 'Graphic Designer', org: 'Hack Medical School', dates: '2022' },
];

// ─────────────────────────────────────────────────────────────────────────
// Stages page — Event Exposure, grouped by the kind of room
// ─────────────────────────────────────────────────────────────────────────
export const STAGES = [
  {
    label: 'Conventions & summits',
    sub: 'Where the medical students gather.',
    items: [
      { title: 'NiMSA SW Convention — TheBowenExperience ’21', dates: '2021' },
      { title: 'NiMSA SW Convention — TheAbuadExperience ’22', dates: '2022' },
      { title: 'FAMSA Convention', dates: '2022' },
      { title: 'The Global Leadership Summit', dates: '2023' },
    ],
  },
  {
    label: 'TedX & DevFest',
    sub: 'Big stages, big ideas.',
    items: [
      { title: 'TedXLautech 1.0 — UpHurn', dates: '2022' },
      { title: 'TedXLautech 2.0 — The Nexus', dates: '2023' },
      { title: 'GDG DevFest', dates: '2022, 2023, 2024, 2025' },
    ],
  },
  {
    label: 'Career & skill rooms',
    sub: 'Workshops that actually teach.',
    items: [
      { title: 'LinkedIn Local Ogbomoso 1.0 — The Career Compass', dates: '2022' },
      { title: 'LinkedIn Local Ogbomoso 2.0 — The Future of Work', dates: '2023' },
      { title: 'Workplace Immersion Program (2-week intensive)', dates: '2023' },
      { title: 'ODEs by Ennovate Lab', dates: '2023' },
      { title: 'Protocols of The Palace', dates: '2024' },
      { title: 'Speak Like A Don', dates: '2024' },
      { title: 'Hangout With JD', dates: '2024' },
    ],
  },
  {
    label: 'Invited rooms',
    sub: 'Special invitations.',
    items: [
      { title: 'The Coronation of the Soun of Ogbomoso', dates: '2022' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Honors page — Scholarships, awards, nominations, certificates
// ─────────────────────────────────────────────────────────────────────────
export const HONORS_SCHOLARSHIPS = [
  {
    title: 'Federal Scholarship Board',
    body: 'FSB Undergraduate Scholarship',
    dates: '2022 — 2026',
  },
  {
    title: 'Future Academy Africa',
    body: 'NFT & Blockchain Development',
    dates: 'Jun — Aug 2022',
  },
  {
    title: 'Tech Scholarship · SQI College of ICT',
    body: 'UI/UX Design',
    dates: 'Jun — Aug 2022',
  },
];

export const HONORS_AWARDS = [
  { title: 'Most Sociable (Male)', venue: 'LAUMSA Health Week ’24' },
  { title: 'Best Dressed of the Year (Male)', venue: 'LAUMSA Health Week ’24' },
  { title: 'Most Valuable Person', venue: 'Preclinical Outstanding Medical Awards ’23' },
  { title: 'Best Dressed of the Year (Male)', venue: 'LAUMSA Health Week ’23' },
];

export const HONORS_NOMINATIONS = [
  { title: 'Most Versatile', venue: 'LAUMSA Health Week ’24', count: 1 },
  { title: 'Most Influential · Best Governor · Political Icon', venue: 'Preclinical Outstanding Medical Awards ’23', count: 4 },
  { title: 'Emerging Leader · Most Influential · Best Governor · Most Expensive', venue: 'Preclinical Outstanding Medical Awards ’21', count: 4 },
];

export const HONORS_CERTIFICATES = [
  'LAUMSA Central Executive Council — Financial Secretary',
  'LAUMSA CEC — Assistant General Secretary',
  'POMA ’21 Central Planning Committee',
  'POMA ’23 Central Planning Committee',
  'FAMSA Convention Planning Committee',
  'United Nations Millennium Fellowship ’22',
  'LAUMSA PR Team — Membership Certificate',
  '9COME’ — Membership Certificate',
];

// ─────────────────────────────────────────────────────────────────────────
// Roots page — Internal LAUMSA leadership
// ─────────────────────────────────────────────────────────────────────────
export const ROOTS_POSITIONS = [
  {
    role: 'Class Governor — Anatomy',
    body: 'Class 25',
    dates: 'May 2021 — Nov 2023',
  },
  {
    role: 'Class Governor — Community Medicine & Psychiatry',
    body: 'MB;BS Class 25',
    dates: 'Nov 2023 — Present',
  },
  {
    role: 'Assistant General Secretary',
    body: 'LAUMSA Central Executive Council',
    dates: 'Apr 2023 — Apr 2024',
  },
  {
    role: 'Financial Secretary',
    body: 'LAUMSA Central Executive Council',
    dates: 'Nov 2021 — Apr 2023',
  },
  {
    role: 'Team Lead — The Team (Office of the AGS)',
    body: 'Led the first ever Upskill Workshop with FABAMSA. Organized LAUMSA Talks.',
    dates: 'Nov 2021 — Apr 2023',
  },
  {
    role: 'PR Team Member',
    body: 'LAUMSA PR Team',
    dates: 'Nov 2021 — Apr 2023',
  },
];

export const ROOTS_COMMITTEES = [
  { role: 'Member', body: 'Social Committee', dates: '2020 — 2021' },
  { role: 'Member', body: 'LAUMSA Caretaker Committee' },
  { role: 'Member', body: 'LAUMSA Academic Committee', dates: '2020 — 2021' },
  { role: 'Member', body: 'LAUMSA Caretaker Committee' },
  { role: 'Member', body: 'LAUMSA Social Committee', dates: '2021 — 2023', extra: 'Office of the Social Director' },
  { role: 'Member', body: 'FAMSA Extended Local Organizing Committee', dates: '2022' },
  { role: 'Member', body: 'Central Planning Committee — POMA ’21' },
  { role: 'Asst. Head', body: 'Event Planning Subcommittee — POMA ’23', dates: 'Jul 2023' },
  { role: 'Graphic Designer', body: 'Award Committee — POMA ’23', dates: 'Jul 2023' },
  { role: 'Head of M&P Subcommittee', body: 'LAUMSA Health Week ’24', dates: 'Apr 2024' },
];
