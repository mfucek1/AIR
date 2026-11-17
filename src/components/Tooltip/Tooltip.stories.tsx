import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Feedback/Tooltip',
  component: Tooltip,
  args: { content: 'Moves to Interview', placement: 'top', children: <Button variant="secondary">Advance</Button> },
  argTypes: { children: { control: false } },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover the button, or Tab to it. Escape closes the tooltip. */
export const Playground: Story = {};

/** The four placements, held open. */
export const Placements: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, max-content)', gap: '64px 160px', padding: '48px 96px' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Tooltip key={p} content={`Placement ${p}`} placement={p} open>
          <Button variant="secondary" size="s">
            {p[0].toUpperCase() + p.slice(1)}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};
