import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import { Footer } from '../../components/Footer';

describe('Footer', () => {
  it('renders social media links', () => {
    render(<Footer />);
    
    // Check if all social media links are present
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    // Check if copyright text is present
    expect(screen.getByText(/Afónica Naranjo/)).toBeInTheDocument();
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  it('has correct attributes for social links', () => {
    render(<Footer />);
    
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveClass('text-brand-orange');
    });
  });
}); 
