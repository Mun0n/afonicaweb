import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BandProvider } from '../context/BandContext';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: BandProvider, ...options });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render }; 