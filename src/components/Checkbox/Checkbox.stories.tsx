import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StateGrid } from '../../stories/StateGrid';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  args: { label: 'Remote OK', indeterminate: false, disabled: false, defaultChecked: false },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

function Bulk() {
  const [picked, setPicked] = useState(['Ana Horvat']);
  const all = ['Ana Horvat', 'Luka Perić', 'Mia Novak'];
  const toggle = (n: string) => setPicked(picked.includes(n) ? picked.filter((p) => p !== n) : [...picked, n]);
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Checkbox
        label="Select all"
        checked={picked.length === all.length}
        indeterminate={picked.length > 0 && picked.length < all.length}
        onChange={() => setPicked(picked.length === all.length ? [] : all)}
      />
      <div style={{ display: 'grid', gap: 12, paddingLeft: 24 }}>
        {all.map((n) => (
          <Checkbox key={n} label={n} checked={picked.includes(n)} onChange={() => toggle(n)} />
        ))}
      </div>
    </div>
  );
}

/** Mixed shows on the parent while only some rows are picked. */
export const BulkSelect: Story = { name: 'Bulk select', render: () => <Bulk /> };

const states = [
  { label: 'Default', className: '' },
  { label: 'Hover', className: 'is-hover' },
  { label: 'Focus', className: 'is-focus' },
  { label: 'Disabled', className: '', disabled: true },
];

export const AllStates: Story = {
  name: 'All states',
  parameters: { layout: 'padded', pseudo: { hover: ['.is-hover'], focusVisible: ['.is-focus input'] } },
  render: () => (
    <StateGrid
      columns={states.map((s) => s.label)}
      rows={[
        { label: 'Unchecked', checked: false, mixed: false },
        { label: 'Checked', checked: true, mixed: false },
        { label: 'Mixed', checked: false, mixed: true },
      ].map((r) => ({
        label: r.label,
        cells: states.map((s) => (
          <Checkbox
            key={s.label}
            label="Label"
            defaultChecked={r.checked}
            indeterminate={r.mixed}
            className={s.className}
            disabled={s.disabled}
          />
        )),
      }))}
    />
  ),
};
