import { render, screen } from '@testing-library/react';
import SectionHead from '../SectionHead';

describe('SectionHead', () => {
  it('renders title and description', () => {
    render(<SectionHead secTitle="Our Services" secDescription="We provide the best." />);
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText('We provide the best.')).toBeInTheDocument();
  });

  it('renders title inside an h2', () => {
    render(<SectionHead secTitle="Hello" secDescription="World" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Hello');
  });

  it('renders without crashing when no props provided', () => {
    render(<SectionHead />);
    expect(document.querySelector('.section-head')).toBeInTheDocument();
  });
});
