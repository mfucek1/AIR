import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '../Button/Button';
import { PathStep, StagePath, type StepState } from './StagePath';

const stages = ['Applied', 'Screening', 'Interview', 'Tech task', 'Culture fit', 'Offer sent'];

const meta = {
  title: 'Components/AIR/Stage path',
  component: StagePath,
  args: {
    status: 'in-progress',
    steps: [
      { label: 'Applied', state: 'done' },
      { label: 'Screening', state: 'done', document: true },
      { label: 'Interview', state: 'done' },
      { label: 'Tech task', state: 'current', time: '4 days' },
      { label: 'Culture fit', state: 'upcoming' },
      { label: 'Offer sent', state: 'upcoming' },
    ],
    action: (
      <Button variant="secondary" size="s" leadingIcon={ArrowRightLeft}>
        Move to stage
      </Button>
    ),
  },
  argTypes: { steps: { control: false }, action: { control: false } },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof StagePath>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = { name: 'In progress' };

/** Closed states stay at the stage where the candidate left; later stages are Not reached. */
export const Outcomes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <StagePath status="hired" outcomeDate="12 May" steps={stages.map((s, i) => ({ label: s, state: i === 5 ? 'hired' : 'done' }))} />
      <StagePath
        status="rejected"
        outcomeDate="3 May"
        steps={stages.map((s, i) => ({ label: s, state: i < 2 ? 'done' : i === 2 ? 'rejected' : 'not-reached' }))}
      />
      <StagePath
        status="withdrawn"
        outcomeDate="8 May"
        steps={stages.map((s, i) => ({ label: s, state: i < 3 ? 'done' : i === 3 ? 'withdrawn' : 'not-reached' }))}
      />
    </div>
  ),
};

const states: StepState[] = ['done', 'current', 'upcoming', 'skipped', 'rejected', 'withdrawn', 'hired', 'not-reached'];

/** Every step state, as Start and as Chevron. */
export const StepStates: Story = {
  name: 'Step states',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['start', 'chevron'] as const).map((shape) => (
        <ol key={shape} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, margin: 0, padding: 0, listStyle: 'none' }}>
          {states.map((s) => (
            <PathStep key={s} shape={shape} state={s} label={s === 'not-reached' ? 'Not reached' : s[0].toUpperCase() + s.slice(1)} time={s === 'current' ? '4 days' : undefined} />
          ))}
        </ol>
      ))}
    </div>
  ),
};
