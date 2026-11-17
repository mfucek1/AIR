import type { Meta, StoryObj } from '@storybook/react-vite';
import vrataLogo from '../../assets/logos/vrata-systems.svg';
import { CandidateCard } from './CandidateCard';

const meta = {
  title: 'Components/AIR/Candidate card',
  component: CandidateCard,
  args: {
    type: 'board',
    name: 'Ana Horvat',
    href: '#',
    match: 'partial',
    skills: ['React', 'TypeScript', 'CSS', 'Storybook', 'GraphQL', 'Figma'],
    appliedOn: '17/05/2026',
    expectedSalary: '€58,000',
    timeInStage: '4 days',
  },
  argTypes: { stagePath: { control: false }, onDecline: { control: false }, onAdvance: { control: false }, onLinkedIn: { control: false }, onEmail: { control: false }, onPhone: { control: false } },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof CandidateCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The name is the link; it covers the card. Names in the stories are fictional. */
export const Board: Story = {};

export const List: Story = {
  args: {
    type: 'list',
    role: { label: 'Senior Frontend Developer', href: '#' },
    rating: 4.29,
    summary: 'Six years of React; built a component library used by four teams. Looking for a lead role.',
    stagePath: {
      steps: [
        { label: 'Applied', state: 'done' },
        { label: 'Screening', state: 'done' },
        { label: 'Interview', state: 'current', time: '4 days' },
        { label: 'Tech task', state: 'upcoming' },
        { label: 'Offer sent', state: 'upcoming' },
      ],
    },
    onDecline: () => {},
    onAdvance: () => {},
    advanceLabel: 'Move to Tech task',
    recommendation: { label: 'No' },
    currentEmployer: 'Vrata Systems',
    noticePeriod: '1 month',
    managementSkills: ['Team management - 6 line reports'],
    industries: ['Consultancy', 'Retail', 'Telecoms'],
    latestExperience: { title: 'Frontend Developer at Vrata Systems', period: 'April 2023 – Present (2 months)', company: 'Vrata Systems', logo: vrataLogo },
    rightToWork: 'No sorry, I need sponsorship',
    alsoAppliedFor: [
      { label: 'Senior Frontend Engineer', href: '#', date: '14/05/2023' },
      { label: 'Product Manager', href: '#', date: '04/01/2023' },
    ],
    documents: [
      { label: 'Cover Letter.doc', href: '#cover-letter' },
      { label: 'CV.pdf', href: '#cv' },
    ],
    onLinkedIn: () => {},
    onEmail: () => {},
    onPhone: () => {},
  },
};
