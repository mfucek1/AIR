import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import vrata from '../../assets/logos/vrata-systems.svg';
import kamen from '../../assets/logos/kamen-studio.svg';
import ribar from '../../assets/logos/ribar-analytics.svg';
import northfold from '../../assets/logos/northfold.svg';

const meta = {
  title: 'Components/Data display/Avatar',
  component: Avatar,
  args: { name: 'Mate Plate', size: 'm' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const row = { display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' } as const;

export const Types: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['s', 'm', 'l'] as const).map((size) => (
        <div key={size} style={row}>
          <Avatar size={size} name="Petra Novak" />
          <Avatar size={size} />
          <Avatar size={size} name="Vrata Systems" logo={vrata} />
        </div>
      ))}
    </div>
  ),
};

/** Company logos in the candidate's work history. All four companies are fictional. */
export const Logos: Story = {
  render: () => (
    <div style={row}>
      <Avatar size="l" name="Vrata Systems" logo={vrata} />
      <Avatar size="l" name="Kamen Studio" logo={kamen} />
      <Avatar size="l" name="Ribar Analytics" logo={ribar} />
      <Avatar size="l" name="Northfold" logo={northfold} />
    </div>
  ),
};

/** A broken photo URL falls back to initials. */
export const PhotoFallback: Story = {
  name: 'Photo fallback',
  args: { src: '/missing-photo.jpg', name: 'Ana Kovač', size: 'l' },
};
