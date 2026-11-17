// The candidates on the Candidates page (Figma: 🔄 Refresh 2026, "After · Candidates"). The
// Figma to code page shows the first one as its Candidate card (List) step. Fictional people.
import ribarLogo from '../../assets/logos/ribar-analytics.svg';
import vrataLogo from '../../assets/logos/vrata-systems.svg';
import type { CandidateCardProps } from '../../components/CandidateCard/CandidateCard';

const noop = () => {};

const skills = ['SQL', 'Python', 'R', 'Tableau', 'Angular', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Node.js', 'GraphQL', 'REST', 'Jest', 'Cypress', 'Storybook', 'Figma', 'Git', 'Docker', 'AWS', 'Webpack', 'Vite', 'Redux', 'Next.js', 'Vue', 'Svelte', 'Tailwind', 'D3', 'Accessibility', 'Performance', 'i18n', 'Agile', 'Scrum', 'Mentoring'];

const steps = (current: number, time: string): NonNullable<CandidateCardProps['stagePath']>['steps'] =>
  [['Applied'], ['Screening', true], ['Interview'], ['Tech task', true], ['Culture fit'], ['Offer sent']].map(([label, document], i) => ({
    label: label as string,
    document: Boolean(document) && i <= current,
    state: i < current ? 'done' : i === current ? 'current' : 'upcoming',
    time: i === current ? time : undefined,
  }));

const shared = {
  type: 'list',
  role: { label: 'Frontend Developer', href: '#jobs/frontend-developer' },
  appliedOn: '17/05/2023',
  expectedSalary: '$50.000',
  noticePeriod: '1 month',
  skills,
  managementSkills: ['Team management - 6 line reports'],
  industries: ['Consultancy', 'Retail', 'Telecoms'],
  rightToWork: 'No sorry, I need sponsorship',
  alsoAppliedFor: [
    { label: 'Senior Frontend Engineer', href: '#jobs/senior-frontend-engineer', date: '14/05/2023' },
    { label: 'Product Manager', href: '#jobs/product-manager', date: '04/01/2023' },
  ],
  documents: [
    { label: 'Cover Letter.doc', href: '#cover-letter' },
    { label: 'CV.pdf', href: '#cv' },
  ],
  onDecline: noop,
  onAdvance: noop,
  onLinkedIn: noop,
  onEmail: noop,
  onPhone: noop,
} satisfies Partial<CandidateCardProps>;

/** Mate Plate and an anonymised candidate, as on the Figma screen */
export const candidates: CandidateCardProps[] = [
  {
    ...shared,
    name: 'Mate Plate',
    href: '#candidates/mate-plate',
    rating: 4.29,
    advanceLabel: 'Next step',
    stagePath: { steps: steps(3, '4 days') },
    summary:
      'With six years of experience, Mate is an accomplished Frontend Developer specializing in crafting seamless user interfaces. They excel in HTML, CSS, and JavaScript, with expertise in popular frameworks like React and Angular. Their collaborative nature, problem-solving skills, and passion for staying up-to-date with the latest industry trends make them a valuable asset to any development team.',
    recommendation: { label: 'Yes', tone: 'success' },
    currentEmployer: 'Vrata Systems',
    latestExperience: { title: 'Frontend Developer at Vrata Systems', period: 'April 2023 – Present (2 months)', company: 'Vrata Systems', logo: vrataLogo },
  },
  {
    ...shared,
    name: 'Candidate #2417',
    href: '#candidates/2417',
    anonymous: true,
    match: 'strong',
    matchCount: '7/8',
    advanceLabel: 'Approve',
    stagePath: { steps: steps(0, '2 days') },
    summary:
      'With five years of experience, this candidate is an accomplished Frontend Developer specializing in crafting seamless user interfaces. They excel in HTML, CSS, and JavaScript, with expertise in popular frameworks like React and Angular.',
    recommendation: { label: 'Yes' },
    currentEmployer: 'Ribar Analytics',
    latestExperience: { title: 'Frontend Developer at Ribar Analytics', period: 'April 2023 – Present (2 months)', company: 'Ribar Analytics', logo: ribarLogo },
  },
];
