// The live side of each step: the real components with the content of the Figma drawing.
// People and companies are fictional. rows.ts reads this file as text for the parts that fill
// a slot (the Menu's items, the Top bar's breadcrumbs and search), so those lines are the ones
// rendered here.
import { useState } from 'react';
import { ArrowRight, Briefcase, Copy, Pencil, Send, Trash2 } from 'lucide-react';
import account from '../src/assets/people/account.jpg';
import { AvatarStack } from '../src/components/AvatarStack/AvatarStack';
import { Breadcrumbs } from '../src/components/Breadcrumbs/Breadcrumbs';
import { Button } from '../src/components/Button/Button';
import { CandidateCard } from '../src/components/CandidateCard/CandidateCard';
import { CommandSearch } from '../src/components/CommandSearch/CommandSearch';
import { Divider, Menu, MenuItem } from '../src/components/Menu/Menu';
import { SegmentedControl } from '../src/components/SegmentedControl/SegmentedControl';
import { Select } from '../src/components/Select/Select';
import { Switch } from '../src/components/Switch/Switch';
import { Tag } from '../src/components/Tag/Tag';
import { TopBar } from '../src/components/TopBar/TopBar';
import { candidates } from '../src/templates/CandidatesPage/candidates';

export const LiveButton = () => <Button variant="primary">Add candidate</Button>;

/** Remove it, and a button puts it back */
export function LiveTag() {
  const [removed, setRemoved] = useState(false);
  if (removed) {
    return (
      <Button variant="ghost" size="s" onClick={() => setRemoved(false)}>
        Put TypeScript back
      </Button>
    );
  }
  return <Tag onRemove={() => setRemoved(true)}>TypeScript</Tag>;
}

export const LiveSwitch = () => <Switch label="Blind review" defaultChecked />;

const team = ['Ana Kovač', 'Luka Perić', 'Ivana Marić', 'Josip Dragić', 'Tea Babić', 'Nika Jurić', 'Dino Rukavina'].map((name) => ({ name }));

export const LiveAvatarStack = () => <AvatarStack size="m" label="Interviewers" people={team} />;

const views = [
  { value: 'board', label: 'Board' },
  { value: 'list', label: 'List' },
  { value: 'table', label: 'Table' },
];

export const LiveSegmentedControl = () => <SegmentedControl label="View" segments={views} />;

const jobs = [
  { value: 'frontend', label: 'Frontend Developer' },
  { value: 'product', label: 'Product Manager' },
  { value: 'senior-frontend', label: 'Senior Frontend Engineer' },
];

export const LiveSelect = () => (
  <Select label="Job" required leadingIcon={Briefcase} helper="Each candidate applies to one job." options={jobs} defaultValue="frontend" />
);

export const LiveMenu = () => (
  <Menu label="Candidate actions">
    <MenuItem icon={Pencil}>Edit</MenuItem>
    <MenuItem icon={Copy}>Duplicate</MenuItem>
    <MenuItem icon={ArrowRight}>Move to stage</MenuItem>
    <MenuItem icon={Send}>Share</MenuItem>
    <Divider />
    <MenuItem icon={Trash2} danger>
      Delete
    </MenuItem>
  </Menu>
);

const path = [
  { label: 'Jobs', href: '#jobs' },
  { label: 'Senior Frontend Developer', href: '#jobs/senior-frontend-developer' },
];
const breadcrumbs = <Breadcrumbs items={path} current="Mate Plate" />;
const search = <CommandSearch />;

export const LiveTopBar = () => <TopBar breadcrumbs={breadcrumbs} search={search} account={{ name: 'Petra Novak', src: account }} unread />;

// Mate Plate from the Candidates page, as the Figma List variant has him: recommendation No
export const LiveCandidateCard = () => <CandidateCard {...candidates[0]} recommendation={{ label: 'No' }} />;
