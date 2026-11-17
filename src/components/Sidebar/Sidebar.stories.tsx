import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '../Link/Link';
import { NavItem } from '../NavItem/NavItem';
import { TrialCard } from '../TrialCard/TrialCard';
import { Sidebar } from './Sidebar';

const items = (
  <>
    <NavItem label="Dashboard" icon="layout-dashboard" href="#dashboard" active />
    <NavItem label="Jobs" icon="briefcase" href="#jobs" />
    <NavItem label="Candidates" icon="users" href="#candidates" count={13} />
    <NavItem label="Talent Bank" icon="archive" href="#talent-bank" />
    <NavItem label="Chat" icon="message-square" href="#chat" count={4} />
    <NavItem label="Settings" icon="settings" href="#settings" />
  </>
);

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

const meta = {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  args: {
    children: items,
    collapsed: false,
    logoHref: '#dashboard',
    trialCard: <TrialCard daysLeft={3} description="Keep AI match running on your 13 candidates." />,
    footer,
  },
  argTypes: { children: { control: false }, trialCard: { control: false }, footer: { control: false } },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', minHeight: 640 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 240 px: logo, the six destinations, the trial card and the footer. */
export const Expanded: Story = {};

/** 64 px, icons only. Hover or focus an icon to see its label. */
export const Collapsed: Story = { args: { collapsed: true } };
