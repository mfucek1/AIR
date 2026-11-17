import { ArrowUpDown, Briefcase, ChevronDown, CircleDot, Columns3, SlidersHorizontal } from 'lucide-react';
import account from '../../assets/people/account.jpg';
import ribarLogo from '../../assets/logos/ribar-analytics.svg';
import vrataLogo from '../../assets/logos/vrata-systems.svg';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Button } from '../../components/Button/Button';
import { CandidateCard, type CandidateCardProps } from '../../components/CandidateCard/CandidateCard';
import { CommandSearch } from '../../components/CommandSearch/CommandSearch';
import { Link } from '../../components/Link/Link';
import { NavItem } from '../../components/NavItem/NavItem';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { Select } from '../../components/Select/Select';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { TopBar } from '../../components/TopBar/TopBar';
import { TrialCard } from '../../components/TrialCard/TrialCard';
import './CandidatesPage.css';

// Figma: 🔄 Refresh 2026, "After · Candidates" (9128:6474). People and companies are fictional.

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

const candidates: CandidateCardProps[] = [
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

const footer = (
  <>
    <Link variant="neutral" size="s" href="#privacy">
      Privacy
    </Link>
    <span aria-hidden="true">·</span>
    <Link variant="neutral" size="s" href="#terms">
      Terms
    </Link>
    <span aria-hidden="true">·</span>
    <span>© 2026 MF</span>
  </>
);

const trialCard = <TrialCard daysLeft={9} visual="illustration" description="Keep AI match running on your 13 candidates." />;

const breadcrumbs = <Breadcrumbs current="Candidates" />;
const search = <CommandSearch />;
const signedIn = { name: 'Petra Novak', src: account };

/** The Top bar as the Candidates page has it: a top-level page, so only its own name in the path. */
export function CandidatesTopBar() {
  return <TopBar breadcrumbs={breadcrumbs} search={search} account={signedIn} unread />;
}

const filters = (
  <>
    <Select size="s" label="Status" hideLabel leadingIcon={CircleDot} options={[{ value: 'all', label: 'All statuses' }, { value: 'active', label: 'Active' }]} />
    <Select size="s" label="Job" hideLabel leadingIcon={Briefcase} options={[{ value: 'all', label: 'All jobs' }, { value: 'fd', label: 'Frontend Developer' }]} />
    <Select size="s" label="Stage" hideLabel leadingIcon={Columns3} options={[{ value: 'all', label: 'All stages' }, { value: 'screening', label: 'Screening' }]} />
    <Button variant="ghost" size="s" leadingIcon={SlidersHorizontal}>
      More filters
    </Button>
  </>
);

const sort = (
  <Button variant="ghost" size="s" leadingIcon={ArrowUpDown} trailingIcon={ChevronDown}>
    Best match
  </Button>
);

/**
 * Template: the Candidates page, every candidate across jobs, built only from organisms:
 * Sidebar, Top bar, Page header and a Candidate card (List) per person.
 */
export function CandidatesPage() {
  return (
    <div className="air-candidates-page">
      <Sidebar logoHref="#dashboard" trialCard={trialCard} footer={footer}>
        <NavItem label="Dashboard" icon="layout-dashboard" href="#dashboard" />
        <NavItem label="Jobs" icon="briefcase" href="#jobs" />
        <NavItem label="Candidates" icon="users" href="#candidates" count={13} active />
        <NavItem label="Talent Bank" icon="archive" href="#talent-bank" />
        <NavItem label="Chat" icon="message-square" href="#chat" count={4} />
        <NavItem label="Settings" icon="settings" href="#settings" />
      </Sidebar>
      <div className="air-candidates-page__content">
        <CandidatesTopBar />
        <PageHeader title="Candidates" count={13} filters={filters} sort={sort} actions={<Button>Add candidate</Button>} />
        <main className="air-candidates-page__list">
          <h2 className="air-visually-hidden">All candidates</h2>
          {candidates.map((c) => <CandidateCard key={c.name} {...c} />)}
        </main>
      </div>
    </div>
  );
}
