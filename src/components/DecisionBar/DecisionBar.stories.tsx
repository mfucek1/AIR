import type { Meta, StoryObj } from '@storybook/react-vite';
import { DecisionBar } from './DecisionBar';

const meta = {
  title: 'Components/AIR/Decision bar',
  component: DecisionBar,
  args: { nextStage: 'Tech task', onAdvance: () => {}, onReject: () => {} },
  argTypes: { onAdvance: { control: false }, onReject: { control: false } },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DecisionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
