import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Eye, EyeOff, Mail, Search, SlidersHorizontal } from 'lucide-react';
import { StateGrid } from '../../stories/StateGrid';
import { Input, InputAction } from './Input';

const meta = {
  title: 'Components/Forms/Input',
  component: Input,
  args: { label: 'Email', placeholder: 'name@company.com', helper: '', size: 'm', disabled: false, required: false, aiFilled: false },
  argTypes: { leadingIcon: { control: false }, trailingAction: { control: false } },
  decorators: [(Story) => <div style={{ width: 320 }}>{Story()}</div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithHelperAndError: Story = {
  name: 'Helper and error',
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Input label="Job title" placeholder="Senior Product Designer" helper="As it appears on the job board." required />
      <Input label="Email" defaultValue="ana@kamen" leadingIcon={Mail} error="Enter a full email address, like ana@kamen.studio." />
      <Input label="Current company" defaultValue="Ribar Analytics" aiFilled helper="Read from the CV. Check before you save." />
    </div>
  ),
};

function SearchWithActions() {
  const [q, setQ] = useState('Product designer');
  const [filters, setFilters] = useState(true);
  return (
    <Input
      label="Search candidates"
      hideLabel
      size="s"
      leadingIcon={Search}
      placeholder="Search candidates"
      value={q}
      onChange={(e) => setQ(e.target.value)}
      onClear={() => setQ('')}
      trailingAction={<InputAction icon={SlidersHorizontal} label="Filters" active={filters} count={filters ? 2 : undefined} onClick={() => setFilters(!filters)} />}
    />
  );
}

function Password() {
  const [show, setShow] = useState(false);
  return (
    <Input
      label="Password"
      type={show ? 'text' : 'password'}
      defaultValue="correct-horse"
      trailingAction={<InputAction icon={show ? EyeOff : Eye} label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)} />}
    />
  );
}

/** Clear and one more action at the end, each with a tooltip and a focus ring. */
export const Actions: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <SearchWithActions />
      <Password />
    </div>
  ),
};

const states = [
  { label: 'Default', className: '' },
  { label: 'Hover', className: 'is-hover' },
  { label: 'Focus', className: 'is-focus' },
  { label: 'Error', className: '', error: 'Enter a full email address.' },
  { label: 'Disabled', className: '', disabled: true },
];

/** Default, Hover, Focus, Error and Disabled, empty and filled, at M and S. */
export const AllStates: Story = {
  name: 'All states',
  decorators: [(Story) => Story()],
  parameters: {
    layout: 'padded',
    pseudo: { hover: ['.is-hover .air-field-box'], focusWithin: ['.is-focus .air-field-box'] },
    // Disabled fields are exempt from contrast rules (WCAG 1.4.3, inactive components).
    a11y: { context: { include: ['body'], exclude: ['.air-field--disabled'] } },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      {(['m', 's'] as const).map((size) => (
        <StateGrid
          key={size}
          align="top"
          caption={`Size ${size.toUpperCase()}`}
          columns={states.map((s) => s.label)}
          rows={[
            { label: 'Empty', value: undefined },
            { label: 'Filled', value: 'ana@kamen.studio' },
          ].map((r) => ({
            label: r.label,
            cells: states.map((s) => (
              <div key={s.label} style={{ width: 200 }}>
                <Input
                  label="Email"
                  size={size}
                  placeholder="name@company.com"
                  defaultValue={r.value}
                  className={s.className}
                  error={s.error}
                  disabled={s.disabled}
                />
              </div>
            )),
          }))}
        />
      ))}
    </div>
  ),
};
