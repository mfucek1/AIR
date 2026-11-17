import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';

const noop = () => {};

const meta = {
  title: 'Components/Feedback/Toast',
  component: Toast,
  args: {
    tone: 'success',
    title: 'Ana Horvat moved to Interview',
    description: 'The hiring team got an email.',
    inverse: false,
    layout: 'card',
    onClose: noop,
    action: { label: 'Undo', onClick: noop },
  },
  argTypes: { action: { control: false }, onClose: { control: false } },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const examples = [
  { tone: 'info', title: 'Sync in progress', description: 'New applications appear in a minute.' },
  { tone: 'success', title: '3 candidates moved', description: 'They’re in Screening now.' },
  { tone: 'warning', title: 'Interview not confirmed', description: 'Mia hasn’t replied yet.' },
  { tone: 'danger', title: 'Email not sent', description: 'Check the address and try again.' },
  { tone: 'ai', title: 'Summary ready', description: 'Read it before you share it.' },
] as const;

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {examples.map((e) => (
        <Toast key={e.tone} {...e} onClose={noop} />
      ))}
    </div>
  ),
};

/** Inverse uses the Dark theme tokens, for more contrast on light pages. */
export const Inverse: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {examples.map((e) => (
        <Toast key={e.tone} {...e} inverse onClose={noop} />
      ))}
    </div>
  ),
};

export const Bar: Story = {
  parameters: { layout: 'padded' },
  args: { layout: 'bar' },
};
