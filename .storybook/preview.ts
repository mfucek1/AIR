import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.css';
import theme from './theme';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: { theme, toc: true },
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', ['Colour', 'Typography', 'Spacing', 'Radius', 'Elevation and focus'], 'Components', ['Actions', 'Forms', 'Navigation', 'Feedback', 'Data display']],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
