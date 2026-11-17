import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarStack } from './AvatarStack';

const team = [
  { name: 'Ana Horvat' },
  { name: 'Luka Perić' },
  { name: 'Mia Novak' },
  { name: 'Ivo Babić' },
  { name: 'Petra Jurić' },
  { name: 'Tin Kovač' },
  { name: 'Nora Marić' },
];

const meta = {
  title: 'Components/Data display/Avatar stack',
  component: AvatarStack,
  args: { people: team, label: 'Interviewers', size: 's', max: 4 },
  argTypes: { people: { control: false }, max: { control: { type: 'range', min: 1, max: 4 } } },
} satisfies Meta<typeof AvatarStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 16 }}>
      <AvatarStack {...args} size="s" />
      <AvatarStack {...args} size="m" />
      <AvatarStack {...args} size="m" people={team.slice(0, 3)} />
    </div>
  ),
};
