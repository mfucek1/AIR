import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRightLeft, Ellipsis, Mail, Pencil, Trash2, UserPlus } from 'lucide-react';
import { IconButton } from '../IconButton/IconButton';
import { Divider, Menu, MenuItem } from './Menu';

const meta = {
  title: 'Components/Navigation/Menu',
  component: Menu,
  args: { label: 'Candidate actions', children: null },
  argTypes: { children: { control: false } },
  subcomponents: { MenuItem, Divider },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tab into it, then arrow keys, Home and End. */
export const Actions: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem icon={Pencil} shortcut="E">Edit</MenuItem>
      <MenuItem icon={ArrowRightLeft}>Move to stage</MenuItem>
      <MenuItem icon={Mail}>Email candidate</MenuItem>
      <MenuItem icon={UserPlus} disabled>Refer to another job</MenuItem>
      <Divider />
      <MenuItem icon={Trash2} danger>Reject</MenuItem>
    </Menu>
  ),
};

/** Options: the chosen one is checked. */
export const Options: Story = {
  args: { label: 'Sort by' },
  render: (args) => (
    <Menu {...args}>
      <MenuItem selected>Best match first</MenuItem>
      <MenuItem selected={false}>Newest first</MenuItem>
      <MenuItem selected={false}>Oldest first</MenuItem>
    </Menu>
  ),
};

function WithButton() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);
  return (
    <div ref={wrap} style={{ position: 'relative', height: 260 }}>
      <IconButton icon={Ellipsis} label="Candidate actions" aria-haspopup="menu" aria-expanded={open} tooltip={open ? false : 'top'} onClick={() => setOpen(!open)} />
      {open && (
        <Menu label="Candidate actions" autoFocus style={{ position: 'absolute', top: 44, left: 0 }}>
          <MenuItem icon={Pencil} onClick={() => setOpen(false)}>Edit</MenuItem>
          <MenuItem icon={ArrowRightLeft} onClick={() => setOpen(false)}>Move to stage</MenuItem>
          <Divider />
          <MenuItem icon={Trash2} danger onClick={() => setOpen(false)}>Reject</MenuItem>
        </Menu>
      )}
    </div>
  );
}

/** Opened from an Icon button: focus moves into the menu; Escape or a click outside closes it. */
export const FromAButton: Story = { name: 'From a button', render: () => <WithButton /> };

export const ItemStates: Story = {
  name: 'Item states',
  parameters: { pseudo: { hover: ['.is-hover'] } },
  render: () => (
    <Menu label="Item states">
      <MenuItem icon={Pencil}>Default</MenuItem>
      <MenuItem icon={Pencil} className="is-hover">Hover</MenuItem>
      <MenuItem icon={Pencil} selected>Selected</MenuItem>
      <MenuItem icon={Pencil} disabled>Disabled</MenuItem>
      <MenuItem icon={Trash2} danger>Danger</MenuItem>
    </Menu>
  ),
};
