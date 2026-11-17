import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarDays, FileText, ListChecks, MessageSquare } from 'lucide-react';
import { StateGrid } from '../../stories/StateGrid';
import { Tabs } from './Tabs';

const panel = (text: string) => <p style={{ margin: 0, font: 'var(--air-font-body-m)', color: 'var(--air-text-secondary)' }}>{text}</p>;

const meta = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  args: {
    label: 'Candidate sections',
    items: [
      { value: 'overview', label: 'Overview', icon: FileText, panel: panel('Summary, contact details and the CV.') },
      { value: 'evidence', label: 'Evidence', icon: ListChecks, count: 6, panel: panel('Each criterion with the lines of the CV that support it.') },
      { value: 'interviews', label: 'Interviews', icon: CalendarDays, count: 2, panel: panel('Scheduled and past interviews, with notes.') },
      { value: 'messages', label: 'Messages', icon: MessageSquare, panel: panel('Emails to and from the candidate.') },
    ],
  },
  argTypes: { items: { control: false } },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click a tab, or Tab into the row and use the arrow keys, Home and End. */
export const Playground: Story = {};

export const TextOnly: Story = {
  name: 'Text only',
  args: {
    label: 'Job sections',
    items: [
      { value: 'pipeline', label: 'Pipeline', count: 48 },
      { value: 'details', label: 'Job details' },
      { value: 'criteria', label: 'Criteria' },
      { value: 'team', label: 'Hiring team' },
    ],
  },
};

const states = [
  { label: 'Default', className: '' },
  { label: 'Hover', className: 'is-hover' },
  { label: 'Focus', className: 'is-focus' },
  { label: 'Selected', className: '', selected: true },
];

export const AllStates: Story = {
  name: 'All states',
  parameters: { pseudo: { hover: ['.is-hover .air-tab'], focusVisible: ['.is-focus .air-tab'] } },
  render: () => (
    <StateGrid
      columns={states.map((s) => s.label)}
      rows={[
        {
          label: 'Tab',
          cells: states.map((s) => (
            <div key={s.label} className={s.className}>
              <Tabs
                label={s.label}
                defaultValue={s.selected ? 'evidence' : 'none'}
                items={[{ value: 'evidence', label: 'Evidence', icon: ListChecks, count: 6 }]}
              />
            </div>
          )),
        },
      ]}
    />
  ),
};
