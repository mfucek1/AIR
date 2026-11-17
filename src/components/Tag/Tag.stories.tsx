import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: { children: 'React', selected: false },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  parameters: { pseudo: { hover: ['.is-hover'], focusVisible: ['.is-focus'] } },
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Tag onClick={() => {}}>Default</Tag>
      <Tag onClick={() => {}} className="is-hover">Hover</Tag>
      <Tag onClick={() => {}} selected>Selected</Tag>
      <Tag onClick={() => {}} className="is-focus">Focus</Tag>
    </div>
  ),
};

/** Click to toggle. Each tag is a button with aria-pressed. */
export const AsFilters: Story = {
  name: 'As filters',
  render: function Render() {
    const skills = ['React', 'TypeScript', 'Figma', 'Node.js', 'GraphQL'];
    const [on, setOn] = useState<string[]>(['React']);
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {skills.map((s) => (
          <Tag key={s} selected={on.includes(s)} onClick={() => setOn(on.includes(s) ? on.filter((x) => x !== s) : [...on, s])}>
            {s}
          </Tag>
        ))}
      </div>
    );
  },
};

export const Removable: Story = {
  render: function Render() {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Design systems']);
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {tags.map((t) => (
          <Tag key={t} onRemove={() => setTags(tags.filter((x) => x !== t))}>
            {t}
          </Tag>
        ))}
      </div>
    );
  },
};
