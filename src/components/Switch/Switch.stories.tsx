import type { Meta, StoryObj } from '@storybook/react-vite';
import { StateGrid } from '../../stories/StateGrid';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Forms/Switch',
  component: Switch,
  args: { label: 'Email me when a candidate applies', defaultChecked: true, disabled: false },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

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
          <Switch key={s.label} label="Label" defaultChecked={r.checked} className={s.className} disabled={s.disabled} />
        )),
      }))}
    />
  ),
};
