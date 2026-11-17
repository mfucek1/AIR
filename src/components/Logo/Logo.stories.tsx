import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta = {
  title: 'Components/Navigation/Logo',
  component: Logo,
  args: { tone: 'on-chrome' },
  argTypes: { tone: { control: 'inline-radio', options: ['on-chrome', 'on-surface'] } },
  decorators: [
    (Story, { args }) => (
      <div style={{ padding: 'var(--air-space-24)', background: args.tone === 'on-chrome' ? 'var(--air-chrome-bg)' : 'var(--air-bg-surface)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

/** On chrome: the Sidebar and the dark top bar. */
export const OnChrome: Story = { name: 'On chrome' };

/** On surface: light pages and emails. */
export const OnSurface: Story = { name: 'On surface', args: { tone: 'on-surface' } };
