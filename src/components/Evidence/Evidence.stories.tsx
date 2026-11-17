import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CitationChip, CriteriaEvidenceRow, FlagRow } from './Evidence';

const meta = {
  title: 'Components/AIR/Evidence',
  component: CriteriaEvidenceRow,
  subcomponents: { CitationChip, FlagRow },
  args: {
    criterion: 'React, 5+ years',
    status: 'met',
    evidence: '“Built and maintained the React component library used by four product teams (2019–2025).”',
    citation: { label: 'CV · p. 1' },
    selected: false,
    onChange: () => {},
  },
  argTypes: { citation: { control: false }, onChange: { control: false } },
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 640 }}>{Story()}</div>],
} satisfies Meta<typeof CriteriaEvidenceRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CriteriaRow: Story = { name: 'Criteria evidence row' };

function Criteria() {
  const [picked, setPicked] = useState('React, 5+ years');
  const rows = [
    { criterion: 'React, 5+ years', status: 'met', evidence: '“Built and maintained the React component library used by four product teams.”', page: 'CV · p. 1' },
    { criterion: 'Design systems', status: 'partly', evidence: '“Contributed tokens and documentation to the company design system.”', page: 'CV · p. 2' },
    { criterion: 'Team lead', status: 'not-met', evidence: '“Worked in a team of six engineers.” No lead role is mentioned.', page: 'CV · p. 1' },
    { criterion: 'Right to work in the EU', status: 'unknown', evidence: 'Not in the CV. Ask about it in the screening call.', page: '' },
  ] as const;
  return (
    <div style={{ display: 'grid', gap: 4 }}>
      {rows.map((r) => (
        <CriteriaEvidenceRow
          key={r.criterion}
          criterion={r.criterion}
          status={r.status}
          evidence={r.evidence}
          citation={r.page ? { label: r.page, onClick: () => setPicked(r.criterion) } : undefined}
          selected={picked === r.criterion}
          onChange={() => {}}
        />
      ))}
    </div>
  );
}

/** Click a citation to select its row, as when its line is highlighted in the CV. */
export const AllStatuses: Story = { name: 'All statuses', render: () => <Criteria /> };

export const Citations: Story = {
  parameters: { pseudo: { hover: ['.is-hover'], focusVisible: ['.is-focus'] } },
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <CitationChip label="CV · p. 1" />
      <CitationChip label="CV · p. 1" className="is-hover" />
      <CitationChip label="CV · p. 1" className="is-focus" />
      <CitationChip label="CV · p. 1" selected />
    </div>
  ),
};

export const Flags: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 8 }}>
      <FlagRow tone="danger" title="Notice period: 3 months" detail="The job asks for 1 month or less." action={{ label: 'Ask about it', onClick: () => {} }} />
      <FlagRow tone="warning" title="Salary above the range" detail="Expects €72k; the range tops out at €65k." />
      <FlagRow tone="success" title="Right to work" detail="EU citizen, from the application form." />
      <FlagRow tone="info" title="Applied before" detail="Frontend Developer, March 2025. Rejected at Screening." />
    </div>
  ),
};
