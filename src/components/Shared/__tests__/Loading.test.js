import { render, screen } from '@testing-library/react';
import Loading from '../Loading';

describe('Loading Component', () => {
  it('renders with loader-big class', () => {
    const { container } = render(<Loading loading={false} />);
    expect(container.querySelector('.loader-big')).toBeInTheDocument();
  });

  it('adds fired class when loading is true', () => {
    const { container } = render(<Loading loading={true} />);
    const loader = container.querySelector('.loader-big');
    expect(loader).toHaveClass('fired');
  });

  it('does not have fired class when loading is false', () => {
    const { container } = render(<Loading loading={false} />);
    const loader = container.querySelector('.loader-big');
    expect(loader).not.toHaveClass('fired');
  });

  it('renders Spinner component with border animation', () => {
    render(<Loading loading={true} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders loading text', () => {
    render(<Loading loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
