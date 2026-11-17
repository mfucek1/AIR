import type { Meta, StoryObj } from '@storybook/react-vite';
import { AIBlock } from './AIBlock';

const meta = {
  title: 'Components/AIR/AI block',
  component: AIBlock,
  args: {
    title: 'AI summary',
    meta: 'From 6 cited criteria',
    loading: false,
    onFeedback: () => {},
    children: (
      <p>
        Meets 4 of 6 must-haves. The strongest evidence is six years of React and a component library used by four teams. Team lead and the
        right to work aren’t in the CV; ask about both in the screening call.
      </p>
    ),
  },
  argTypes: { children: { control: false }, onFeedback: { control: false } },
  decorators: [(Story) => <div style={{ maxWidth: 632 }}>{Story()}</div>],
} satisfies Meta<typeof AIBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Thumbs up or down toggle; the choice is sent with onFeedback. */
export const Default: Story = {};

export const Loading: Story = { args: { loading: true } };
