import type { Meta, StoryObj } from '@storybook/react-vite';
import { CandidatesPage } from './CandidatesPage';

const meta = {
  title: 'Templates/Candidates page',
  component: CandidatesPage,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', minHeight: 720, overflowX: 'auto' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CandidatesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Every candidate across jobs. A template: it only places organisms (Sidebar, Top bar,
 * Page header, Candidate card) and holds no styles of its own beyond the page's background,
 * padding and gaps. Figma draws it at 1440 only; on narrower screens it scrolls sideways.
 * People and companies are fictional.
 */
export const Default: Story = {};
