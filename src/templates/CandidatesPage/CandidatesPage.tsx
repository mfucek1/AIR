import { ArrowUpDown, Briefcase, ChevronDown, CircleDot, Columns3, SlidersHorizontal } from 'lucide-react';
import account from '../../assets/people/account.jpg';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Button } from '../../components/Button/Button';
import { CandidateCard } from '../../components/CandidateCard/CandidateCard';
import { CommandSearch } from '../../components/CommandSearch/CommandSearch';
import { Link } from '../../components/Link/Link';
import { NavItem } from '../../components/NavItem/NavItem';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { Select } from '../../components/Select/Select';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { TopBar } from '../../components/TopBar/TopBar';
import { TrialCard } from '../../components/TrialCard/TrialCard';
import { candidates } from './candidates';
import './CandidatesPage.css';

// Figma: 🔄 Refresh 2026, "After · Candidates" (9128:6474). People and companies are fictional.

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
