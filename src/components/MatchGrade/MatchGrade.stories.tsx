import type { Meta, StoryObj } from '@storybook/react-vite';
import { MatchGrade, MustHavesPopover } from './MatchGrade';

const popover = (
  <MustHavesPopover
    level="partial"
    onEdit={() => {}}
    mustHaves={[
      { label: 'React, 5+ years', status: 'not-met' },
      { label: 'TypeScript', status: 'met' },
      { label: 'CSS', status: 'met' },
      { label: 'Design systems', status: 'met' },
      { label: 'Team lead', status: 'unknown' },
    ]}
    niceToHaves={[
      { label: 'Angular', met: true },
      { label: 'Storybook', met: true },
      { label: 'GraphQL', met: false },
    ]}
  />
);

const meta = {
  title: 'Components/AIR/Match grade',
  component: MatchGrade,
  args: { level: 'partial', popover },
  argTypes: { popover: { control: false } },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ minHeight: 280 }}>{Story()}</div>],
} satisfies Meta<typeof MatchGrade>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover or focus opens the must-haves; a click pins them; Escape closes. */
export const Playground: Story = {};

export const Levels: Story = {
  args: { popover: undefined },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <MatchGrade level="strong" count="8/8" />
      <MatchGrade level="partial" />
      <MatchGrade level="limited" />
      <MatchGrade level="not-graded" />
    </div>
  ),
};

export const Popover: Story = {
  name: 'Must-haves popover',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      {popover}
      <MustHavesPopover
        level="strong"
        mustHaves={[
          { label: 'React, 5+ years', status: 'met' },
          { label: 'TypeScript', status: 'met' },
          { label: 'CSS', status: 'met' },
        ]}
      />
    </div>
  ),
};
