// The live side of each step: the real components with the content of the Figma drawing.
// People and companies are fictional. rows.ts reads this file as text for the parts that fill
// a slot (the Top bar's breadcrumbs and search), so those lines are the ones rendered here.
import { useState } from 'react';
import account from '../src/assets/people/account.jpg';
import { Avatar } from '../src/components/Avatar/Avatar';
import { AvatarStack } from '../src/components/AvatarStack/AvatarStack';
import { Badge } from '../src/components/Badge/Badge';
import { Breadcrumbs } from '../src/components/Breadcrumbs/Breadcrumbs';
import { Button } from '../src/components/Button/Button';
import { CandidateCard } from '../src/components/CandidateCard/CandidateCard';
import { CommandSearch } from '../src/components/CommandSearch/CommandSearch';
import { Tag } from '../src/components/Tag/Tag';
import { TopBar } from '../src/components/TopBar/TopBar';

export const LiveButton = () => <Button variant="primary">Add candidate</Button>;

export const LiveBadge = () => (
  <Badge tone="success" size="m">
    Hired
  </Badge>
);

export function LiveTag() {
  const [selected, setSelected] = useState(false);
  return (
    <Tag selected={selected} onClick={() => setSelected(!selected)}>
      TypeScript
    </Tag>
  );
}

export const LiveAvatar = () => <Avatar size="l" name="Lena Horvat" />;

const team = ['Ana Kovač', 'Luka Perić', 'Ivana Marić', 'Josip Dragić', 'Tea Babić', 'Nika Jurić', 'Dino Rukavina'].map((name) => ({ name }));

export const LiveAvatarStack = () => <AvatarStack size="m" label="Interviewers" people={team} />;

const path = [
  { label: 'Jobs', href: '#jobs' },
  { label: 'Senior Frontend Developer', href: '#jobs/senior-frontend-developer' },
];

export const LiveBreadcrumbs = () => <Breadcrumbs items={path} current="Mate Plate" />;

export const LiveCandidateCard = () => (
  <CandidateCard
    name="Mate Plate"
    href="#candidates/mate-plate"
    match="partial"
    matchCount="5/8"
    skills={['SQL', 'Python', 'R', 'Tableau', 'Angular']}
    appliedOn="17/05/2023"
    expectedSalary="$50.000"
    timeInStage="4 days"
  />
);

const breadcrumbs = <Breadcrumbs items={path} current="Mate Plate" />;
const search = <CommandSearch />;

export const LiveTopBar = () => <TopBar breadcrumbs={breadcrumbs} search={search} account={{ name: 'Petra Novak', src: account }} unread />;

// The template is a whole page, so it runs as one: its Storybook story (which renders
// <CandidatesPage />) in a frame 1440 wide, scaled to fit like the rest. That keeps its landmarks
// to itself and lays it out for 1440 even on a phone.
const templateStory = `${import.meta.env.DEV ? 'http://localhost:6006' : ''}/iframe.html?id=templates-candidates-page--default&viewMode=story`;

export const LiveCandidatesPage = () => <iframe className="ftc__page" src={templateStory} title="The Candidates page template, live from Storybook" />;
