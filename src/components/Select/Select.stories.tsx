import type { Meta, StoryObj } from '@storybook/react-vite';
import { Briefcase } from 'lucide-react';
import { StateGrid } from '../../stories/StateGrid';
import { Select } from './Select';

const departments = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'sales', label: 'Sales' },
];

const meta = {
  title: 'Components/Forms/Select',
  component: Select,
  args: { label: 'Department', placeholder: 'Choose a department', options: departments, size: 'm', disabled: false, required: false },
  argTypes: { leadingIcon: { control: false }, options: { control: false } },
  decorators: [(Story) => <div style={{ width: 320 }}>{Story()}</div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A native select: the list, keyboard and screen readers come from the browser. */
export const Playground: Story = {};

export const Examples: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <Select label="Department" options={departments} defaultValue="design" leadingIcon={Briefcase} aiFilled helper="Suggested from the job title." />
      <Select label="Seniority" placeholder="Choose seniority" required error="Choose a seniority." options={[{ value: 'mid', label: 'Mid' }, { value: 'senior', label: 'Senior' }]} />
      <Select label="Sort" hideLabel size="s" options={[{ value: 'match', label: 'Best match first' }, { value: 'recent', label: 'Newest first' }]} />
    </div>
  ),
};

const states = [
  { label: 'Default', className: '' },
  { label: 'Hover', className: 'is-hover' },
  { label: 'Focus', className: 'is-focus' },
  { label: 'Error', className: '', error: 'Choose a department.' },
  { label: 'Disabled', className: '', disabled: true },
];

/** Open is the browser's own list, so it isn't drawn here. */
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
            { label: 'Empty', value: '' },
            { label: 'Filled', value: 'design' },
          ].map((r) => ({
            label: r.label,
            cells: states.map((s) => (
              <div key={s.label} style={{ width: 200 }}>
                <Select
                  label="Department"
                  size={size}
                  placeholder="Choose one"
                  options={departments}
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
