import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { StateGrid } from '../../stories/StateGrid';
import { NavItem } from './NavItem';

const chrome = (children: ReactNode, width?: number) => (
  <div style={{ display: width ? 'block' : 'inline-block', width, padding: 'var(--air-space-8)', background: 'var(--air-chrome-bg)' }}>{children}</div>
);

const meta = {
  title: 'Components/Navigation/Nav item',
  component: NavItem,
  args: { label: 'Candidates', icon: 'users', href: '#candidates', count: 13, active: false, collapsed: false },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { decorators: [(Story) => chrome(<Story />, 232)] };

/** The current page: petrol fill, a 3 px bar on the left and a light petrol icon. */
export const Active: Story = {
  args: { label: 'Dashboard', icon: 'layout-dashboard', href: '#dashboard', count: undefined, active: true },
  decorators: [(Story) => chrome(<Story />, 232)],
};

/** Icon only, for the collapsed Sidebar. Hover or focus it to see the label in a tooltip. */
export const Collapsed: Story = {
  args: { collapsed: true },
  decorators: [(Story) => <div style={{ paddingRight: 120 }}>{chrome(<Story />)}</div>],
};

const states = [
  { label: 'Default', className: '' },
  { label: 'Hover', className: 'is-hover' },
  { label: 'Focus', className: 'is-focus' },
  { label: 'Active', className: '', active: true },
];

export const AllStates: Story = {
  name: 'All states',
  parameters: { pseudo: { hover: ['.is-hover .air-nav-item'], focusVisible: ['.is-focus .air-nav-item'] } },
  render: () => (
    <StateGrid
      columns={states.map((s) => s.label)}
      rows={[
        {
          label: 'Expanded',
          cells: states.map((s) => (
            <div key={s.label} className={s.className}>
              {chrome(<NavItem label="Today" icon="layout-dashboard" href="#today" active={s.active} />, 232)}
            </div>
          )),
        },
        {
          label: 'With counter',
          cells: states.map((s) => (
            <div key={s.label} className={s.className}>
              {chrome(<NavItem label="Chat" icon="message-square" href="#chat" count={4} active={s.active} />, 232)}
            </div>
          )),
        },
        {
          label: 'Collapsed',
          cells: states.map((s) => (
            <div key={s.label} className={s.className}>
              {chrome(<NavItem label="Today" icon="layout-dashboard" href="#today" active={s.active} collapsed />)}
            </div>
          )),
        },
      ]}
    />
  ),
};
