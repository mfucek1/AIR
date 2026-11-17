import { create } from 'storybook/theming';

// Storybook's own chrome, in AIR colours. Values mirror src/tokens/tokens.css
// (Storybook's theme API needs literal colours, not CSS variables).
export default create({
  base: 'light',
  brandTitle: 'AIR · ATS design system',
  brandUrl: 'https://github.com/mfucek1/AIR',
  brandTarget: '_blank',
  fontBase: "'Inter Variable', Inter, system-ui, sans-serif",
  colorPrimary: '#005f7d', // petrol-700
  colorSecondary: '#005f7d',
  appBg: '#f5f7f8', // slate-50
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#dae1e4', // slate-200
  appBorderRadius: 4,
  textColor: '#192930', // slate-900
  textMutedColor: '#69777d', // slate-500
  barBg: '#ffffff',
  barTextColor: '#3e4d54',
  barSelectedColor: '#005f7d',
  inputBorderRadius: 4,
});
