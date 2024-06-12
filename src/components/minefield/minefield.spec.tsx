import { render } from '@testing-library/react';

import Minefield from './minefield';

describe('Minefield', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Minefield />);
    expect(baseElement).toBeTruthy();
  });
});
