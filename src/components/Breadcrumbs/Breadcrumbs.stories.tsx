import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  args: {
    items: [
      { label: 'Jobs', href: '#jobs' },
      { label: 'Senior Frontend Developer', href: '#jobs/senior-frontend-developer' },
    ],
    current: 'Mate Plate',
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A candidate inside a job: two links, then the current page. */
export const Playground: Story = {};

export const OneLevel: Story = { name: 'One level', args: { items: [{ label: 'Jobs', href: '#jobs' }], current: 'Senior Frontend Developer' } };

/** Top-level pages show only the current page. */
export const TopLevel: Story = { name: 'Top level', args: { items: [], current: 'Candidates' } };
