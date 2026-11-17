import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterChip, FilterOption, TagInput } from './Filters';

const meta = {
  title: 'Components/Forms/Filters',
  component: FilterChip,
  subcomponents: { FilterOption, TagInput },
  args: { filterKey: 'Stage:', value: 'Screening +1', open: false, onRemove: () => {} },
  argTypes: { onRemove: { control: false } },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Chip: Story = { name: 'Filter chip' };

export const ChipStates: Story = {
  name: 'Filter chip states',
  parameters: { pseudo: { hover: ['.is-hover'], focusVisible: ['.is-focus .air-filter-chip__main'] } },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <FilterChip filterKey="Stage:" value="Screening +1" onRemove={() => {}} />
      <FilterChip filterKey="Stage:" value="Screening +1" onRemove={() => {}} className="is-hover" />
      <FilterChip filterKey="Stage:" value="Screening +1" onRemove={() => {}} className="is-focus" />
      <FilterChip filterKey="Stage:" value="Screening +1" onRemove={() => {}} open />
    </div>
  ),
};

function Options() {
  const [picked, setPicked] = useState(['screening']);
  const rows = [
    ['applied', 'Applied', 64],
    ['screening', 'Screening', 21],
    ['interview', 'Interview', 9],
    ['offer', 'Offer sent', 2],
  ] as const;
  return (
    <fieldset style={{ width: 280, margin: 0, padding: 0, border: 'none' }}>
      <legend style={{ marginBottom: 8, font: 'var(--air-font-body-m-strong)' }}>Stage</legend>
      {rows.map(([v, label, n]) => (
        <FilterOption
          key={v}
          label={label}
          count={n}
          checked={picked.includes(v)}
          onChange={() => setPicked(picked.includes(v) ? picked.filter((p) => p !== v) : [...picked, v])}
        />
      ))}
    </fieldset>
  );
}

/** The whole row toggles the checkbox; counts are for the current results. */
export const Option: Story = { name: 'Filter option', render: () => <Options /> };

function Skills() {
  const [values, setValues] = useState(['React', 'TypeScript', 'CSS', 'Storybook']);
  return (
    <div style={{ width: 432 }}>
      <TagInput label="Technical skills" values={values} onChange={setValues} helper="Enter or comma adds; Backspace removes the last." />
    </div>
  );
}

export const Tags: Story = { name: 'Tag input', render: () => <Skills /> };
