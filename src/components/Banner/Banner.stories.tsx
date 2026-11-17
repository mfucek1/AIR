import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './Banner';

const noop = () => {};

const meta = {
  title: 'Components/Feedback/Banner',
  component: Banner,
  args: {
    tone: 'warning',
    emphasis: 'subtle',
    layout: 'default',
    title: 'Your trial ends in 3 days',
    description: 'Choose a plan to keep your jobs and candidates.',
    primaryAction: { label: 'Choose a plan', onClick: noop },
    secondaryAction: { label: 'Remind me later', onClick: noop },
    onDismiss: noop,
  },
  argTypes: { primaryAction: { control: false }, secondaryAction: { control: false }, onDismiss: { control: false } },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

const narrow = [(Story: () => React.ReactNode) => <div style={{ width: 640, maxWidth: '100%' }}>{Story()}</div>];

export const Playground: Story = { decorators: narrow };

const tones = ['neutral', 'info', 'success', 'warning', 'danger', 'ai'] as const;
const copy = {
  neutral: 'Imported from Greenhouse',
  info: 'Two interviewers haven’t left feedback',
  success: 'Job published on 4 boards',
  warning: 'Your trial ends in 3 days',
  danger: 'Calendar sync stopped',
  ai: 'AI summary ready to review',
};

/** Every tone at the three emphases. */
export const TonesAndEmphasis: Story = {
  name: 'Tones and emphasis',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 16 }}>
      {(['subtle', 'medium', 'strong'] as const).flatMap((emphasis) =>
        tones.map((tone) => (
          <Banner
            key={tone + emphasis}
            tone={tone}
            emphasis={emphasis}
            title={copy[tone]}
            description={`${emphasis[0].toUpperCase() + emphasis.slice(1)} emphasis.`}
            primaryAction={{ label: 'Review', onClick: noop }}
            secondaryAction={{ label: 'Later', onClick: noop }}
            onDismiss={noop}
          />
        )),
      )}
    </div>
  ),
};

export const Compact: Story = {
  decorators: narrow,
  args: { layout: 'compact', tone: 'ai', title: 'AI summary ready to review', secondaryAction: undefined, primaryAction: { label: 'Review', onClick: noop } },
};
