import type { Meta, StoryObj } from '@storybook/react-vite';
import { StateGrid } from '../../stories/StateGrid';
import { Radio, RadioGroup } from './Radio';

const meta = {
  title: 'Components/Forms/Radio',
  component: RadioGroup,
  args: {
    label: 'Employment type',
    name: 'employment',
    defaultValue: 'full-time',
    orientation: 'vertical',
    disabled: false,
    options: [
      { value: 'full-time', label: 'Full-time' },
      { value: 'part-time', label: 'Part-time' },
      { value: 'contract', label: 'Contract' },
    ],
  },
  argTypes: { options: { control: false } },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A fieldset with a legend; arrow keys move the choice, as with any radio group. */
export const Playground: Story = {};

export const Horizontal: Story = { args: { orientation: 'horizontal', name: 'employment-h' } };

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
        { label: 'Off', checked: false },
        { label: 'On', checked: true },
      ].map((r) => ({
        label: r.label,
        cells: states.map((s) => (
          <Radio
            key={s.label}
            name={`state-${r.label}-${s.label}`}
            label="Label"
            defaultChecked={r.checked}
            className={s.className}
            disabled={s.disabled}
          />
        )),
      }))}
    />
  ),
};
