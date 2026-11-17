import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/global.css';
import '@fontsource/roboto-mono/latin-400.css';
import './figma-to-code.css';
import { FigmaToCode } from './FigmaToCode';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FigmaToCode />
  </StrictMode>,
);
