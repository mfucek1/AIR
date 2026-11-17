import type { ReactNode } from 'react';
import { FileText, Link as LinkIcon, Mail, Phone } from 'lucide-react';
import { Avatar } from '../Avatar/Avatar';
import { Badge, type BadgeTone } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
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
  /** Count of everything met, inside the Match grade, like "5/8". */
  matchCount?: string;
  /** Blind review: the avatar shows the person icon, not initials or a photo. Figma: Avatar Type=Icon. */
  anonymous?: boolean;
  rating?: number;
  skills?: string[];
  /** Skills shown before "+N": four on the board, five in the list. */
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
  /** List only, the details row: a Badge, like Yes. */
  recommendation?: { label: string; tone?: BadgeTone };
  currentEmployer?: string;
  noticePeriod?: string;
  /** List only: the skill groups after Technical skills. */
  managementSkills?: string[];
  industries?: string[];
  /** List only: the latest job, with the company's logo. */
  latestExperience?: { title: string; period: string; company: string; logo?: string };
  /** List only: the candidate's answer, quoted. */
  rightToWork?: string;
  /** List only: other jobs they applied for, with the date. */
  alsoAppliedFor?: { label: string; href?: string; date: string }[];
  /** List only: CV, cover letter and other files. */
  documents?: { label: string; href: string }[];
  /** List only, Get in touch by: an Icon button for each one given. */
  onLinkedIn?: () => void;
  onEmail?: () => void;
  onPhone?: () => void;
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
  matchCount,
  anonymous = false,
  rating,
  skills = [],
  maxSkills = type === 'list' ? 5 : 4,
  appliedOn,
  expectedSalary,
  timeInStage,
  summary,
  stagePath,
  onDecline,
  onAdvance,
  advanceLabel = 'Advance',
  recommendation,
  currentEmployer,
  noticePeriod,
  managementSkills = [],
  industries = [],
  latestExperience,
  rightToWork,
  alsoAppliedFor = [],
  documents = [],
  onLinkedIn,
  onEmail,
  onPhone,
  className,
}: CandidateCardProps) {
  // Blind review hides who it is: the Avatar gets no name or photo, so it shows the person icon.
  const person = anonymous ? {} : { name, src: photo };
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
  const tagList = (label: string, items: string[]) => (
    <ul className="air-candidate__tags" aria-label={label}>
      {items.map((s) => (
        <li key={s}>
          <Tag>{s}</Tag>
        </li>
      ))}
    </ul>
  );
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
    const details = ([
      ['Applied on', appliedOn],
      ['Recommendation', recommendation && <Badge tone={recommendation.tone}>{recommendation.label}</Badge>],
      ['Current employer', currentEmployer],
      ['Expected salary', expectedSalary],
      ['Notice period', noticePeriod],
    ] as [string, ReactNode][]).filter(([, v]) => Boolean(v));
    const groups = ([
      ['Technical skills', skillTags],
      ['Management skills', managementSkills.length > 0 && tagList('Management skills', managementSkills)],
      ['Industries', industries.length > 0 && tagList('Industries', industries)],
    ] as [string, ReactNode][]).filter(([, v]) => Boolean(v));
    const contact = [
      onLinkedIn && <IconButton key="linkedin" icon={LinkIcon} label="LinkedIn profile" onClick={onLinkedIn} />,
      onEmail && <IconButton key="email" icon={Mail} label="Email" onClick={onEmail} />,
      onPhone && <IconButton key="phone" icon={Phone} label="Phone" onClick={onPhone} />,
    ].filter(Boolean);
    return (
      <article className={['air-candidate', 'air-candidate--list', className].filter(Boolean).join(' ')}>
        <header className="air-candidate__header">
          <Avatar size="l" {...person} />
          <div className="air-candidate__who">
            <h3 className="air-candidate__name air-candidate__name--l">{nameEl}</h3>
            {role && <Link href={role.href}>{role.label}</Link>}
            {(rating !== undefined || match) && (
              <div className="air-candidate__score">
                {rating !== undefined && <Rating value={rating} />}
                {match && <MatchGrade level={match} count={matchCount} />}
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
        {details.length > 0 && (
          <dl className="air-candidate__details">
            {details.map(([k, v]) => (
              <div key={k}>
                <dt className="air-candidate__label">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
        {groups.length > 0 && (
          <div className="air-candidate__row">
            {groups.map(([label, tags]) => (
              <section key={label} className="air-candidate__group">
                <h4 className="air-candidate__group-label">{label}</h4>
                {tags}
              </section>
            ))}
          </div>
        )}
        {(latestExperience || rightToWork) && (
          <div className="air-candidate__row">
            {latestExperience && (
              <section className="air-candidate__group">
                <h4 className="air-candidate__group-label">Latest experience</h4>
                <div className="air-candidate__experience">
                  <Avatar size="s" name={latestExperience.company} logo={latestExperience.logo} />
                  <div className="air-candidate__experience-text">
                    <span>{latestExperience.title}</span>
                    <span className="air-candidate__date">{latestExperience.period}</span>
                  </div>
                </div>
              </section>
            )}
            {rightToWork && (
              <section className="air-candidate__group">
                <h4 className="air-candidate__group-label">Right to work</h4>
                <p className="air-candidate__quote">
                  <FileText className="air-candidate__quote-icon" size={16} aria-hidden="true" />“{rightToWork}”
                </p>
              </section>
            )}
          </div>
        )}
        {alsoAppliedFor.length > 0 && (
          <section className="air-candidate__group">
            <h4 className="air-candidate__group-label">Also applied for</h4>
            <ul className="air-candidate__applied">
              {alsoAppliedFor.map((job) => (
                <li key={job.label}>
                  <Link href={job.href}>{job.label}</Link>
                  <span className="air-candidate__date">{job.date}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {(documents.length > 0 || contact.length > 0) && (
          <div className="air-candidate__row air-candidate__row--ends">
            {documents.length > 0 && (
              <section className="air-candidate__group">
                <h4 className="air-candidate__group-label">Documents</h4>
                <ul className="air-candidate__files">
                  {documents.map((d) => (
                    <li key={d.href}>
                      <Link variant="neutral" leadingIcon={FileText} href={d.href}>
                        {d.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {contact.length > 0 && (
              <section className="air-candidate__group air-candidate__group--end">
                <h4 className="air-candidate__group-label">Get in touch by</h4>
                <div className="air-candidate__contact">{contact}</div>
              </section>
            )}
          </div>
        )}
      </article>
    );
  }

  return (
    <article className={['air-candidate', 'air-candidate--board', className].filter(Boolean).join(' ')}>
      <header className="air-candidate__title-row">
        <Avatar size="m" {...person} />
        <h3 className="air-candidate__name">{nameEl}</h3>
        {match && <MatchGrade level={match} count={matchCount} />}
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
