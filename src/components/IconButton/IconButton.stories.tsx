import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ellipsis, Pencil, SlidersHorizontal, Trash2, X } from 'lucide-react';
import { StateGrid } from '../../stories/StateGrid';
import { stateParameters } from '../../stories/states';
import { IconButton } from './IconButton';

const meta = {
  title: 'Components/Actions/Icon button',
  component: IconButton,
  args: { icon: Ellipsis, label: 'More actions', variant: 'ghost', size: 'm', disabled: false },
  argTypes: {
    icon: { control: false },
    tooltip: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right', false] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover or focus it: the tooltip names the action. */
export const Playground: Story = {};

export const Types: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <IconButton {...args} variant="ghost" icon={Pencil} label="Edit candidate" />
      <IconButton {...args} variant="secondary" icon={SlidersHorizontal} label="Filters" />
      <IconButton {...args} variant="primary" icon={X} label="Close" />
    </div>
  ),
};

/** A table row's actions: Ghost, S. */
export const InARow: Story = {
  name: 'In a table row',
  render: () => (
    <div style={{ display: 'flex', gap: 4 }}>
      <IconButton icon={Pencil} label="Edit" size="s" />
      <IconButton icon={Trash2} label="Delete" size="s" />
      <IconButton icon={Ellipsis} label="More actions" size="s" />
    </div>
  ),
};

const variants = ['ghost', 'secondary', 'primary'] as const;
const states = [
  { label: 'Default', className: '' },
  { label: 'Hover', className: 'is-hover' },
  { label: 'Pressed', className: 'is-pressed' },
  { label: 'Focus', className: 'is-focus' },
  { label: 'Disabled', className: '', disabled: true },
];

/** Every type, size and state, as in the Figma component set. */
export const AllStates: Story = {
  name: 'All states',
  parameters: stateParameters,
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      {(['m', 's'] as const).map((size) => (
        <StateGrid
          key={size}
          caption={`Size ${size.toUpperCase()}`}
          columns={states.map((s) => s.label)}
          rows={variants.map((v) => ({
            label: v[0].toUpperCase() + v.slice(1),
            cells: states.map((s) => (
              <IconButton
                key={s.label}
                icon={Ellipsis}
                label={`${v} ${s.label}`}
                variant={v}
                size={size}
                tooltip={false}
                className={s.className}
                disabled={s.disabled}
              />
            )),
          }))}
        />
      ))}
    </div>
  ),
};
