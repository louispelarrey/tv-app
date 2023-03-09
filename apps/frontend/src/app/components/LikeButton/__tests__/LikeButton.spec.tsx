import { render, screen, fireEvent } from '@testing-library/react';
import { LikeButton } from '../LikeButton';
import '@testing-library/jest-dom';

describe('LikeButton component', () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    mockOnClick.mockClear();
  });

  it('renders the number of likes', () => {
    const likes = 10;
    render(<LikeButton likes={likes} onClick={mockOnClick} />);
    expect(screen.getByText(likes)).toBeInTheDocument();
  });


  it('calls onClick when button is clicked', () => {
    render(<LikeButton likes={0} onClick={mockOnClick} />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders the heart icon', () => {
    render(<LikeButton likes={0} onClick={mockOnClick} />);
    const iconElement = screen.getByTestId('heart-icon');
    expect(iconElement).toBeInTheDocument();
  });
});
