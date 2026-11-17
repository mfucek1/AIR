import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rating } from './Rating';

const meta = {
  title: 'Components/Data display/Rating',
  component: Rating,
  args: { value: 4.29, decimals: 2, showValue: true },
  argTypes: { value: { control: { type: 'range', min: 0, max: 5, step: 0.01 } } },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Whole stars, plus the number: 4.29 shows four. */
export const Playground: Story = {};

export const Values: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8 }}>
      {[0, 1.5, 2.8, 3, 4.29, 5].map((v) => (
        <Rating key={v} value={v} decimals={2} />
      ))}
    </div>
  ),
};
