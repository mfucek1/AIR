import type { Meta, StoryObj } from '@storybook/react-vite';
import { StateGrid } from '../../stories/StateGrid';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  args: {
    label: 'Interview notes',
    placeholder: 'What stood out, with examples',
    helper: 'Only the hiring team sees these.',
    maxLength: 500,
    showCounter: true,
    disabled: false,
    required: false,
  },
  decorators: [(Story) => <div style={{ width: 360 }}>{Story()}</div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Type to see the counter move. */
export const Playground: Story = {};

export const WithError: Story = {
  name: 'Error',
  args: { defaultValue: 'Good.', error: 'Add at least one example.' },
};

const states = [
  { label: 'Default', className: '' },
  { label: 'Hover', className: 'is-hover' },
  { label: 'Focus', className: 'is-focus' },
  { label: 'Error', className: '', error: 'Add at least one example.' },
  { label: 'Disabled', className: '', disabled: true },
];

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
    <StateGrid
      align="top"
      columns={states.map((s) => s.label)}
      rows={[
        { label: 'Empty', value: undefined },
        { label: 'Filled', value: 'Clear on trade-offs; walked through the pricing redesign.' },
      ].map((r) => ({
        label: r.label,
        cells: states.map((s) => (
          <div key={s.label} style={{ width: 220 }}>
            <Textarea
              label="Notes"
              placeholder="What stood out"
              rows={3}
              maxLength={500}
              helper={s.error ? undefined : 'Only the hiring team sees these.'}
              defaultValue={r.value}
              className={s.className}
              error={s.error}
              disabled={s.disabled}
            />
          </div>
        )),
      }))}
    />
  ),
};
