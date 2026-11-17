import type { ReactNode } from 'react';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { Link } from '../Link/Link';
import { MatchGrade, type MatchLevel } from '../MatchGrade/MatchGrade';
import { Rating } from '../Rating/Rating';
import { StagePath, type StagePathProps } from '../StagePath/StagePath';
import { Tag } from '../Tag/Tag';
import './CandidateCard.css';

export interface CandidateCardProps {
  /** Board: the job board card. List: the Candidates page card with the Stage path. */
  type?: 'board' | 'list';
  name: string;
  photo?: string;
  /** Opens the profile. The name becomes the link. */
  href?: string;
  /** List only: the job applied for, as a link. */
  role?: { label: string; href?: string };
  match?: MatchLevel;
  rating?: number;
  skills?: string[];
  /** Skills shown before "+N". */
  maxSkills?: number;
  appliedOn?: string;
  expectedSalary?: string;
  timeInStage?: string;
  /** List only. */
  summary?: ReactNode;
  /** List only. */
  stagePath?: StagePathProps;
  /** List only: Decline and the next-stage button. */
  onDecline?: () => void;
  onAdvance?: () => void;
  advanceLabel?: string;
  className?: string;
}

/** A candidate on the job board (Board) or on the Candidates page (List). Names and photos in the stories are fictional. */
export function CandidateCard({
  type = 'board',
  name,
  photo,
  href,
  role,
  match,
  rating,
  skills = [],
  maxSkills = 4,
  appliedOn,
  expectedSalary,
  timeInStage,
  summary,
  stagePath,
  onDecline,
  onAdvance,
  advanceLabel = 'Advance',
  className,
}: CandidateCardProps) {
  const shown = skills.slice(0, maxSkills);
  const more = skills.length - shown.length;
  const nameEl = href ? (
    <a className="air-candidate__name-link" href={href}>
      {name}
    </a>
  ) : (
    name
  );
  const fields = [
    ['Applied on', appliedOn],
    ['Expected salary', expectedSalary],
    ['In stage', timeInStage],
  ].filter(([, v]) => v);
  const skillTags = skills.length > 0 && (
    <ul className="air-candidate__tags" aria-label="Technical skills">
      {shown.map((s) => (
        <li key={s}>
          <Tag>{s}</Tag>
        </li>
      ))}
      {more > 0 && (
        <li>
          <Tag>{`+${more}`}</Tag>
        </li>
      )}
    </ul>
  );

  if (type === 'list') {
    return (
      <article className={['air-candidate', 'air-candidate--list', className].filter(Boolean).join(' ')}>
        <header className="air-candidate__header">
          <Avatar size="l" name={name} src={photo} />
          <div className="air-candidate__who">
            <h3 className="air-candidate__name air-candidate__name--l">{nameEl}</h3>
            {role && <Link href={role.href}>{role.label}</Link>}
            {(rating !== undefined || match) && (
              <div className="air-candidate__score">
                {rating !== undefined && <Rating value={rating} />}
                {match && <MatchGrade level={match} />}
              </div>
            )}
          </div>
          {(onDecline || onAdvance) && (
            <div className="air-candidate__actions">
              {onDecline && (
                <Button variant="secondary" tone="danger" onClick={onDecline}>
                  Decline
                </Button>
              )}
              {onAdvance && <Button onClick={onAdvance}>{advanceLabel}</Button>}
            </div>
          )}
        </header>
        {stagePath && <StagePath {...stagePath} />}
        {summary && <p className="air-candidate__summary">{summary}</p>}
        {skillTags}
      </article>
    );
  }

  return (
    <article className={['air-candidate', 'air-candidate--board', className].filter(Boolean).join(' ')}>
      <header className="air-candidate__title-row">
        <Avatar size="m" name={name} src={photo} />
        <h3 className="air-candidate__name">{nameEl}</h3>
        {match && <MatchGrade level={match} />}
      </header>
      {skills.length > 0 && (
        <div className="air-candidate__skills">
          <p className="air-candidate__label">Technical skills</p>
          {skillTags}
        </div>
      )}
      {fields.length > 0 && (
        <dl className="air-candidate__fields">
          {fields.map(([k, v]) => (
            <div key={k}>
              <dt className="air-candidate__label">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
