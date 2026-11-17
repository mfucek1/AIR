import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { StateGrid } from '../../stories/StateGrid';
import { CommandSearch, type CommandSearchProps } from './CommandSearch';

const meta = {
  title: 'Components/Navigation/Command search',
  component: CommandSearch,
  args: { placeholder: 'Search candidates and jobs', shortcut: true },
  argTypes: { onOpen: { control: false } },
} satisfies Meta<typeof CommandSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

function CountingDemo(args: CommandSearchProps) {
  const [opens, setOpens] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--air-space-12)', width: '100%' }}>
      <CommandSearch {...args} onOpen={() => setOpens((n) => n + 1)} />
      <p style={{ margin: 0, font: 'var(--air-font-body-s)', color: 'var(--air-text-secondary)' }} aria-live="polite">
        Opened {opens} {opens === 1 ? 'time' : 'times'}
      </p>
    </div>
  );
}

/** Click it or press ⌘K / Ctrl+K. The command palette itself isn't built yet, so this story counts the opens. */
export const Playground: Story = {
  render: (args) => <CountingDemo {...args} />,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', width: 320, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

const states = [
  { label: 'Default', className: '' },
  { label: 'Hover', className: 'is-hover' },
  { label: 'Focus', className: 'is-focus' },
];

export const AllStates: Story = {
  name: 'All states',
  parameters: { pseudo: { hover: ['.is-hover .air-command-search'], focusVisible: ['.is-focus .air-command-search'] } },
  render: () => (
    <StateGrid
      columns={states.map((s) => s.label)}
      rows={[
        {
          label: 'Command search',
          cells: states.map((s) => (
            <div key={s.label} className={s.className} style={{ display: 'flex', width: 320 }}>
              <CommandSearch />
            </div>
          )),
        },
      ]}
    />
  ),
};
