import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Feedback/Skeleton',
  component: Skeleton,
  args: { type: 'text' },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Skeleton type="text" />
      <Skeleton type="title" />
      <Skeleton type="circle" />
      <Skeleton type="block" />
    </div>
  ),
};

/** A candidate card while it loads. The region carries aria-busy; the shapes are hidden from screen readers. */
export const CandidateCard: Story = {
  name: 'Candidate card loading',
  render: () => (
    <div
      aria-busy="true"
      aria-label="Loading candidate"
      role="group"
      style={{ display: 'grid', gap: 12, width: 280, padding: 16, border: '1px solid var(--air-border-subtle)', borderRadius: 'var(--air-radius-md)', background: 'var(--air-bg-surface)' }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Skeleton type="circle" />
        <div style={{ display: 'grid', gap: 8 }}>
          <Skeleton type="title" width={140} />
          <Skeleton type="text" width={100} />
        </div>
      </div>
      <Skeleton type="text" width="100%" />
      <Skeleton type="text" width="80%" />
    </div>
  ),
};
