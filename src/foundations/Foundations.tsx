import type { CSSProperties, ReactNode } from 'react';
import { byGroup, byPrefix, tokens } from './tokens';
import './foundations.css';

const shortValue = (v: string) => v.replace(/var\(--air-([a-z0-9-]+)\)/g, '$1');

/* Colour */

export function PrimitiveRamps() {
  const prims = byGroup('AIR · Primitives');
  const ramps = ['petrol', 'slate', 'apricot', 'violet', 'green', 'amber', 'red', 'paper'];
  return (
    <div className="fd-ramps">
      {ramps.map((r) => (
        <div key={r} className="fd-ramp">
          <div className="fd-ramp__name">{r}</div>
          <div className="fd-ramp__row">
            {prims
              .filter((t) => t.name.startsWith(`--air-${r}-`))
              .map((t) => (
                <div key={t.name} className="fd-ramp__step">
                  <div className="fd-ramp__chip" style={{ background: `var(${t.name})` }} />
                  <code>{t.name.replace(`--air-${r}-`, '')}</code>
                  <span>{t.value}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function RoleSwatches({ prefix, title }: { prefix: string; title?: string }) {
  const list = byPrefix('AIR · Color', prefix);
  return (
    <div className="fd-roles">
      {title && <h4 className="fd-roles__title">{title}</h4>}
      {list.map((t) => (
        <div key={t.name} className="fd-role">
          <div className="fd-role__chip" style={{ background: `var(${t.name})` }} />
          <code className="fd-role__name">{t.name}</code>
          <span className="fd-role__value">{shortValue(t.value)}</span>
        </div>
      ))}
    </div>
  );
}

/* Typography */

export function TypeScale() {
  const fonts = tokens.filter((t) => t.name.startsWith('--air-font-') && t.name !== '--air-font-family');
  return (
    <div className="fd-type">
      {fonts.map((t) => {
        const slug = t.name.replace('--air-font-', '');
        const style: CSSProperties = { font: `var(${t.name})`, letterSpacing: `var(--air-tracking-${slug})` };
        return (
          <div key={t.name} className="fd-type__row">
            <div style={style}>Senior Frontend Developer</div>
            <code>{t.name}</code>
            <span>{t.value.replace(' var(--air-font-family)', '')}</span>
          </div>
        );
      })}
    </div>
  );
}

/* Space, radius, elevation */

export function SpaceScale() {
  const list = byGroup('AIR · Size')
    .filter((t) => t.name.startsWith('--air-space-') || t.name.startsWith('--air-overlap-'))
    .sort((a, b) => {
      const x = parseFloat(a.value) || 0, y = parseFloat(b.value) || 0;
      return x < 0 !== y < 0 ? (x < 0 ? 1 : -1) : Math.abs(x) - Math.abs(y);
    });
  return (
    <div className="fd-space">
      {list.map((t) => {
        const px = parseFloat(t.value) || 0;
        return (
          <div key={t.name} className="fd-space__row">
            <code>{t.name}</code>
            <div className={px < 0 ? 'fd-space__bar fd-space__bar--negative' : 'fd-space__bar'} style={{ width: Math.abs(px) * 4 }} />
            <span>{px < 0 ? `${px} px, items overlap` : `${px} px`}</span>
          </div>
        );
      })}
    </div>
  );
}

export function RadiusScale() {
  const list = byGroup('AIR · Size').filter((t) => t.name.startsWith('--air-radius-'));
  return (
    <div className="fd-tiles">
      {list.map((t) => (
        <div key={t.name} className="fd-tile">
          <div className="fd-radius" style={{ borderRadius: `var(${t.name})` }} />
          <code>{t.name}</code>
          <span>{t.value}</span>
        </div>
      ))}
    </div>
  );
}

export function Elevation() {
  const list = tokens.filter((t) => t.name.startsWith('--air-effect-') && t.name !== '--air-effect-basic');
  return (
    <div className="fd-tiles">
      {list.map((t) => (
        <div key={t.name} className="fd-tile">
          <div className="fd-card" style={{ boxShadow: `var(${t.name})` }} />
          <code>{t.name}</code>
        </div>
      ))}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="fd-note">{children}</p>;
}
