import type { Meta, StoryObj } from '@storybook/react-vite';
import { Columns3, List } from 'lucide-react';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Components/Forms/Segmented control',
  component: SegmentedControl,
  args: {
    label: 'Pipeline view',
    segments: [
      { value: 'board', label: 'Board', icon: Columns3 },
      { value: 'list', label: 'List', icon: List },
    ],
  },
  argTypes: { segments: { control: false } },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A radio group: Tab in, then arrow keys move the selection. */
export const Playground: Story = {};

export const Range: Story = {
  args: {
    label: 'Date range',
    defaultValue: '30',
    segments: [
      { value: '7', label: '7 days' },
      { value: '30', label: '30 days' },
      { value: '90', label: '90 days' },
      { value: 'all', label: 'All time' },
    ],
  },
};

export const IconOnly: Story = {
  name: 'Icon only',
  args: {
    segments: [
      { value: 'board', label: 'Board', icon: Columns3, iconOnly: true },
      { value: 'list', label: 'List', icon: List, iconOnly: true },
    ],
  },
};

/** Default, Hover, Focus and Selected segments. */
export const AllStates: Story = {
  name: 'All states',
  parameters: { pseudo: { hover: ['.is-hover .air-segment:nth-child(2)'], focusVisible: ['.is-focus .air-segment:nth-child(2)'] } },
  render: () => (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'start', font: 'var(--air-font-body-s)', color: 'var(--air-text-secondary)' }}>
      {[
        ['Second segment at rest', ''],
        ['Second segment hovered', 'is-hover'],
        ['Second segment focused', 'is-focus'],
      ].map(([text, cls]) => (
        <div key={text} className={cls} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <SegmentedControl label={text} segments={[{ value: 'a', label: 'Selected' }, { value: 'b', label: 'Segment' }, { value: 'c', label: 'Segment' }]} />
          <span>{text}</span>
        </div>
      ))}
    </div>
  ),
};
