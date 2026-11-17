import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Components/Feedback/Empty state',
  component: EmptyState,
  args: {
    illustration: 'noCandidates',
    title: 'No candidates match',
    description: 'Remove a filter, or clear them all.',
    action: { label: 'Clear filters', onClick: () => {} },
  },
  argTypes: { action: { control: false } },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Illustrations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <EmptyState illustration="noCandidates" title="No candidates match" description="Remove a filter, or clear them all." action={{ label: 'Clear filters', onClick: () => {} }} />
      <EmptyState illustration="noSelection" title="Pick a candidate" description="Their profile opens here." />
      <EmptyState illustration="noRecordings" title="No answers yet" description="Invited candidates have 5 days to record." action={{ label: 'Send a reminder', onClick: () => {} }} />
    </div>
  ),
};
