import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';

const meta = {
  title: 'Components/Feedback/Progress',
  component: Progress,
  args: { value: 50, label: 'Analysing 12 CVs', valueText: '6 of 12', tone: 'brand', hideLabel: false },
  argTypes: { value: { control: { type: 'range', min: 0, max: 100, step: 1 } } },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Tones and the Figma values: 0, 25, 50, 75 and 100. */
export const TonesAndValues: Story = {
  name: 'Tones and values',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 240px)', gap: 24 }}>
      {(['brand', 'ai', 'success', 'danger'] as const).flatMap((tone) =>
        [0, 25, 50, 75, 100].map((v) => <Progress key={tone + v} tone={tone} value={v} label={{ brand: 'Brand', ai: 'AI', success: 'Success', danger: 'Danger' }[tone]} />),
      )}
    </div>
  ),
};
