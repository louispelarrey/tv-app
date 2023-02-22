import { render } from '@testing-library/react';
import { SpanError } from './SpanError';

describe('SpanError', () => {
  it('renders with the correct style and content', () => {
    const { getByText } = render(<SpanError>Test error message</SpanError>);
    const errorElement = getByText('Test error message');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveStyle(`
      color: red;
      font-size: 0.8rem;
    `);
  });
});
