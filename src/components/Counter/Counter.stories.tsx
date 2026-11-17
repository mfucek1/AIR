import type { Meta, StoryObj } from '@storybook/react-vite';
import { Counter } from './Counter';

const meta = {
  title: 'Components/Data display/Counter',
  component: Counter,
  args: { count: 12, tone: 'neutral' },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center', font: 'var(--air-font-body-m-strong)' }}>
        Applied <Counter count={24} />
      </span>
      <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center', font: 'var(--air-font-body-m-strong)' }}>
        Unread <Counter count={3} tone="brand" />
      </span>
      <span
        style={{
          display: 'inline-flex',
          gap: 8,
          alignItems: 'center',
          padding: '8px 12px',
          background: 'var(--air-chrome-bg)',
          color: 'var(--air-chrome-text-active)',
          font: 'var(--air-font-body-m-strong)',
        }}
      >
        Inbox <Counter count={7} tone="chrome" />
      </span>
    </div>
  ),
};
