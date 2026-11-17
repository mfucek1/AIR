import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Dialog } from './Dialog';

const meta = {
  title: 'Components/Feedback/Dialog',
  component: Dialog,
  args: { open: false, onClose: () => {}, title: 'Add candidate', size: 'm' },
  argTypes: { open: { control: false }, onClose: { control: false } },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function AddCandidate() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Add candidate</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add candidate"
        description="They’ll get an email with the job and a link to apply."
        primaryAction={{ label: 'Add', onClick: () => setOpen(false) }}
      >
        <div style={{ display: 'grid', gap: 16 }}>
          <Input label="Full name" placeholder="Ana Horvat" required />
          <Input label="Email" placeholder="ana@kamen.studio" type="email" required />
        </div>
      </Dialog>
    </>
  );
}

/** Focus moves in and stays in; Escape, Cancel or a click on the scrim closes it. */
export const Medium: Story = { name: 'M · form', render: () => <AddCandidate /> };

function Confirm() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" tone="danger" onClick={() => setOpen(true)}>
        Delete job
      </Button>
      <Dialog
        open={open}
        size="s"
        onClose={() => setOpen(false)}
        title="Delete this job?"
        description="48 candidates and their notes go with it. This can’t be undone."
        primaryAction={{ label: 'Delete job', tone: 'danger', onClick: () => setOpen(false) }}
      />
    </>
  );
}

export const Small: Story = { name: 'S · confirm', render: () => <Confirm /> };
