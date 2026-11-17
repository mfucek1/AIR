import type { Meta, StoryObj } from '@storybook/react-vite';
import account from '../../assets/people/account.jpg';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { CommandSearch } from '../CommandSearch/CommandSearch';
import { TopBar } from './TopBar';

const meta = {
  title: 'Components/Navigation/Top bar',
  component: TopBar,
  args: {
    breadcrumbs: (
      <Breadcrumbs
        items={[
          { label: 'Jobs', href: '#jobs' },
          { label: 'Senior Frontend Developer', href: '#jobs/senior-frontend-developer' },
        ]}
        current="Mate Plate"
      />
    ),
    search: <CommandSearch />,
    account: { name: 'Petra Novak', src: account },
    unread: true,
  },
  argTypes: { breadcrumbs: { control: false }, search: { control: false } },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A candidate page: the path back to the job, search, help, notifications with an unread dot and the account photo. */
export const Page: Story = {};

/** A top-level page shows only its own name. */
export const TopLevel: Story = {
  name: 'Top level',
  args: { breadcrumbs: <Breadcrumbs current="Candidates" />, unread: false },
};
