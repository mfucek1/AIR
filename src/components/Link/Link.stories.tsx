import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, FileText, Plus, Trash2 } from 'lucide-react';
import { StateGrid } from '../../stories/StateGrid';
import { stateParameters } from '../../stories/states';
import { Link } from './Link';

const meta = {
  title: 'Components/Actions/Link',
  component: Link,
  args: { children: 'View all candidates', variant: 'primary', size: 'm', href: '#', disabled: false },
  argTypes: { leadingIcon: { control: false }, trailingIcon: { control: false } },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Types: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <Link {...args} variant="primary" trailingIcon={ArrowRight}>View all</Link>
      <Link {...args} variant="neutral" leadingIcon={FileText}>Open CV</Link>
      <Link {...args} variant="danger" leadingIcon={Trash2} href={undefined}>Remove criterion</Link>
    </div>
  ),
};

/** Without href it's a button, for in-page actions. */
export const AsAButton: Story = {
  name: 'As a button',
  args: { href: undefined, leadingIcon: Plus, children: 'Add criterion' },
};

const variants = ['primary', 'neutral', 'danger'] as const;
const states = [
  { label: 'Default', className: '' },
  { label: 'Hover', className: 'is-hover' },
  { label: 'Focus', className: 'is-focus' },
  { label: 'Disabled', className: '', disabled: true },
];

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
              <Link key={s.label} href="#" variant={v} size={size} className={s.className} disabled={s.disabled} trailingIcon={ArrowRight}>
                View all
              </Link>
            )),
          }))}
        />
      ))}
    </div>
  ),
};
