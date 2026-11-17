import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader, SectionToggle } from './Section';

const meta = {
  title: 'Components/Layout/Section',
  component: SectionToggle,
  subcomponents: { SectionHeader },
  args: { title: 'Contact', summary: 'Email, phone, LinkedIn, location', aiFilled: false, defaultExpanded: false },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 592 }}>{Story()}</div>],
} satisfies Meta<typeof SectionToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const body = <p style={{ margin: 0, font: 'var(--air-font-body-m)', color: 'var(--air-text-secondary)' }}>ana@kamen.studio · +385 91 000 0000 · Zagreb</p>;

/** Click, Enter or Space. The summary shows while collapsed. */
export const Toggle: Story = { args: { children: body } };

export const Toggles: Story = {
  render: () => (
    <div>
      <SectionToggle title="Contact" summary="Email, phone, LinkedIn, location">
        {body}
      </SectionToggle>
      <SectionToggle title="Experience" summary="3 roles, 7 years" aiFilled>
        {body}
      </SectionToggle>
      <SectionToggle title="Pay and availability" defaultExpanded>
        {body}
      </SectionToggle>
    </div>
  ),
};

export const Header: Story = {
  name: 'Section header',
  render: () => <SectionHeader title="Fit against criteria" meta="4 of 6 met" action={{ label: 'Edit criteria', onClick: () => {} }} />,
};
