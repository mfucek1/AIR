import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowUpDown, Briefcase, ChevronDown, CircleDot, Clock, Columns3, MapPin, SlidersHorizontal } from 'lucide-react';
import { Button } from '../Button/Button';
import { Select } from '../Select/Select';
import { PageHeader } from './PageHeader';

const jobActions = (
  <>
    <Button variant="secondary">Share job</Button>
    <Button>Add candidate</Button>
  </>
);

const meta = {
  title: 'Components/Layout/Page header',
  component: PageHeader,
  args: {
    title: 'Senior Frontend Engineer',
    description: 'Engineering · Zagreb or remote · 14 candidates',
    actions: jobActions,
  },
  argTypes: { actions: { control: false }, filters: { control: false }, sort: { control: false }, meta: { control: false } },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A job: title, one line of description and the actions. */
export const Page: Story = {};

/** One level down, with the way back, the job's status and its meta. */
export const WithBackLinkAndMeta: Story = {
  name: 'With back link and meta',
  args: {
    backLink: { label: 'Back to Jobs', href: '#jobs' },
    status: { label: 'Active', tone: 'success' },
    description: undefined,
    meta: [
      { icon: Briefcase, label: 'Engineering' },
      { icon: Clock, label: 'Full time' },
      { icon: MapPin, label: 'Šibenik, Croatia' },
    ],
  },
};

/** A list page: the counter after the title, and the filters and sort on the title line, so there's no separate filter row. */
export const WithFilters: Story = {
  name: 'With filters',
  args: {
    title: 'Candidates',
    count: 13,
    description: undefined,
    actions: <Button>Add candidate</Button>,
    filters: (
      <>
        <Select size="s" label="Status" hideLabel leadingIcon={CircleDot} options={[{ value: 'all', label: 'All statuses' }, { value: 'active', label: 'Active' }]} />
        <Select size="s" label="Job" hideLabel leadingIcon={Briefcase} options={[{ value: 'all', label: 'All jobs' }, { value: 'sfe', label: 'Senior Frontend Engineer' }]} />
        <Select size="s" label="Stage" hideLabel leadingIcon={Columns3} options={[{ value: 'all', label: 'All stages' }, { value: 'screening', label: 'Screening' }]} />
        <Button variant="ghost" size="s" leadingIcon={SlidersHorizontal}>
          More filters
        </Button>
      </>
    ),
    sort: (
      <Button variant="ghost" size="s" leadingIcon={ArrowUpDown} trailingIcon={ChevronDown}>
        Best match
      </Button>
    ),
  },
};
