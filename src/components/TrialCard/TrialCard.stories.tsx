import type { Meta, StoryObj } from '@storybook/react-vite';
import { StateGrid } from '../../stories/StateGrid';
import { TrialCard } from './TrialCard';

const keep = 'Keep AI match running on your 13 candidates.';
const paused = 'AI match is paused for your 13 candidates.';

const meta = {
  title: 'Components/Navigation/Trial card',
  component: TrialCard,
  args: { daysLeft: 9, visual: 'hi-fi', description: keep, onUpgrade: () => {} },
  argTypes: {
    visual: { control: 'inline-radio', options: ['lo-fi', 'hi-fi', 'illustration'] },
    daysLeft: { control: { type: 'range', min: 0, max: 14 } },
    onUpgrade: { control: false },
  },
} satisfies Meta<typeof TrialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const inSidebar: Story['decorators'] = [
  (Story) => (
    <div style={{ width: 240, padding: 'var(--air-space-12)', background: 'var(--air-chrome-bg)' }}>
      <Story />
    </div>
  ),
];

/** Drag Days left: the bar turns amber at 3 or fewer, and the card says the trial has ended at 0. */
export const Playground: Story = { decorators: inSidebar };

export const Ending: Story = { args: { daysLeft: 3 }, decorators: inSidebar };

export const Ended: Story = { args: { daysLeft: 0, description: paused }, decorators: inSidebar };

const visuals = [
  { label: 'Lo-fi icon', value: 'lo-fi' },
  { label: 'Hi-fi icon', value: 'hi-fi' },
  { label: 'Illustration', value: 'illustration' },
] as const;

const states = [
  { label: 'Active', daysLeft: 9, description: keep },
  { label: 'Ending', daysLeft: 3, description: keep },
  { label: 'Ended', daysLeft: 0, description: paused },
];

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <StateGrid
      align="top"
      columns={visuals.map((v) => v.label)}
      rows={states.map((s) => ({
        label: s.label,
        cells: visuals.map((v) => (
          <div key={v.value} style={{ width: 240, padding: 'var(--air-space-12)', background: 'var(--air-chrome-bg)' }}>
            <TrialCard visual={v.value} daysLeft={s.daysLeft} description={s.description} />
          </div>
        )),
      }))}
    />
  ),
};
