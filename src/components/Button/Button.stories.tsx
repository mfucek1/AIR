import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronDown, Plus, Trash2, UserPlus } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'Components/Actions/Button',
  component: Button,
  args: { children: 'Add candidate', variant: 'primary', tone: 'default', size: 'm', disabled: false },
  argTypes: {
    leadingIcon: { control: false },
    trailingIcon: { control: false },
    type: { control: 'inline-radio', options: ['button', 'submit', 'reset'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Types: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="subtle">Subtle</Button>
      <Button {...args} variant="ghost">Ghost</Button>
    </div>
  ),
};

export const Danger: Story = {
  args: { tone: 'danger' },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Button {...args} variant="primary" leadingIcon={Trash2}>Delete job</Button>
      <Button {...args} variant="secondary">Decline</Button>
      <Button {...args} variant="subtle">Withdraw</Button>
      <Button {...args} variant="ghost">Remove</Button>
    </div>
  ),
};

export const SizesAndIcons: Story = {
  name: 'Sizes and icons',
  render: (args) => (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <Button {...args} leadingIcon={UserPlus}>Add candidate</Button>
        <Button {...args} variant="secondary" trailingIcon={ChevronDown}>Export</Button>
        <Button {...args} variant="subtle" leadingIcon={Plus}>New job</Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <Button {...args} size="s" leadingIcon={UserPlus}>Add candidate</Button>
        <Button {...args} size="s" variant="secondary" trailingIcon={ChevronDown}>Export</Button>
        <Button {...args} size="s" variant="subtle" leadingIcon={Plus}>New job</Button>
      </div>
    </div>
  ),
};

const variants = ['primary', 'secondary', 'subtle', 'ghost'] as const;
const states = [
  { label: 'Default', className: '' },
  { label: 'Hover', className: 'is-hover' },
  { label: 'Pressed', className: 'is-pressed' },
  { label: 'Focus', className: 'is-focus' },
  { label: 'Disabled', className: '', disabled: true },
];

/** Every type, tone and state, the same grid as the Figma component set. */
export const AllStates: Story = {
  name: 'All states',
  parameters: {
    layout: 'padded',
    pseudo: { hover: ['.is-hover'], active: ['.is-pressed'], focusVisible: ['.is-focus'] },
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 32 }}>
      {(['default', 'danger'] as const).map((tone) => (
        <table key={tone} style={{ borderCollapse: 'separate', borderSpacing: '24px 12px', margin: '-12px -24px' }}>
          <thead>
            <tr>
              <th style={{ font: 'var(--air-font-caption)', color: 'var(--air-text-muted)', textAlign: 'left' }}>
                {tone === 'danger' ? 'Danger tone' : 'Default tone'}
              </th>
              {states.map((s) => (
                <th key={s.label} style={{ font: 'var(--air-font-caption)', color: 'var(--air-text-muted)', textAlign: 'left' }}>{s.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variants.map((variant) => (
              <tr key={variant}>
                <td style={{ font: 'var(--air-font-body-s)', color: 'var(--air-text-secondary)', textTransform: 'capitalize' }}>{variant}</td>
                {states.map((s) => (
                  <td key={s.label}>
                    <Button {...args} variant={variant} tone={tone} className={s.className} disabled={s.disabled}>
                      Button
                    </Button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  ),
};
