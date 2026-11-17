import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconDuotone } from './IconDuotone';
import { iconDuotoneNames } from './icons';

const meta = {
  title: 'Components/Navigation/Icon duotone',
  component: IconDuotone,
  args: { name: 'layout-dashboard' },
  argTypes: { name: { control: 'select', options: iconDuotoneNames } },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--air-space-16)', background: 'var(--air-chrome-bg)', color: 'var(--air-chrome-text)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IconDuotone>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The icon takes the text colour around it; the tone is the same colour at 40%. */
export const Playground: Story = {};

/** The six side menu icons. */
export const AllIcons: Story = {
  name: 'All icons',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--air-space-24)' }}>
      {iconDuotoneNames.map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--air-space-8)', font: 'var(--air-font-caption)' }}>
          <IconDuotone name={name} />
          {name}
        </div>
      ))}
    </div>
  ),
};
