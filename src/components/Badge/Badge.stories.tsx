import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, BadgeIcon, type BadgeTone } from './Badge';

const tones: BadgeTone[] = ['neutral', 'info', 'success', 'warning', 'danger', 'ai'];
const sample: Record<BadgeTone, string> = {
  neutral: 'Draft',
  info: 'Screening',
  success: 'Hired',
  warning: 'Needs visa',
  danger: 'Declined',
  ai: 'AI filled',
};

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Screening', tone: 'info', size: 's', inverse: false, showIcon: false },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {[false, true].map((inverse) => (
        <div key={String(inverse)} style={{ display: 'flex', gap: 8 }}>
          {tones.map((tone) => (
            <Badge key={tone} {...args} tone={tone} inverse={inverse} showIcon>
              {sample[tone]}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Badge {...args} size="s" showIcon>Small</Badge>
      <Badge {...args} size="m" showIcon>Medium</Badge>
    </div>
  ),
};

/** Icon-only badges need a label for screen readers; it also shows as a tooltip. */
export const IconOnly: Story = {
  name: 'Icon only',
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['s', 'm'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 8 }}>
          {tones.map((tone) => (
            <BadgeIcon key={tone} tone={tone} size={size} label={sample[tone]} />
          ))}
        </div>
      ))}
    </div>
  ),
};
