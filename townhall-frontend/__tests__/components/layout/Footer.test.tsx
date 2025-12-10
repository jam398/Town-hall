import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  );
});

describe('Footer', () => {
  it('renders the Town Hall logo and text', () => {
    render(<Footer />);
    
    // Multiple elements contain "Town Hall" - check that at least one exists
    const townHallElements = screen.getAllByText(/town hall/i);
    expect(townHallElements.length).toBeGreaterThan(0);
  });

  it('renders the description', () => {
    render(<Footer />);
    
    expect(screen.getByText(/newark.*nonprofit.*community hub/i)).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);
    
    expect(screen.getByText(/newark, new jersey/i)).toBeInTheDocument();
    expect(screen.getByText(/hello@townhallnewark.org/i)).toBeInTheDocument();
  });

  it('renders email as a mailto link', () => {
    render(<Footer />);
    
    const emailLink = screen.getByText(/hello@townhallnewark.org/i);
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:hello@townhallnewark.org');
  });

  it('renders Explore section with links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Explore')).toBeInTheDocument();
    
    const eventsLink = screen.getAllByText('Events')[0];
    expect(eventsLink.closest('a')).toHaveAttribute('href', '/events');
    
    const blogLink = screen.getAllByText('Blog')[0];
    expect(blogLink.closest('a')).toHaveAttribute('href', '/blog');
  });

  it('renders Get Involved section with links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Get Involved')).toBeInTheDocument();
    
    const volunteerLink = screen.getAllByText('Volunteer')[0];
    expect(volunteerLink.closest('a')).toHaveAttribute('href', '/volunteer');
  });

  it('renders Connect section with external links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Connect')).toBeInTheDocument();
    
    const discordLink = screen.getByText('Discord');
    expect(discordLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(discordLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders newsletter signup section', () => {
    render(<Footer />);
    
    expect(screen.getByText(/stay updated/i)).toBeInTheDocument();
    expect(screen.getByText(/subscribe/i)).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
  });

  it('renders privacy policy and terms links', () => {
    render(<Footer />);
    
    const privacyLink = screen.getByText(/privacy policy/i);
    expect(privacyLink.closest('a')).toHaveAttribute('href', '/privacy');
    
    const termsLink = screen.getByText(/terms of service/i);
    expect(termsLink.closest('a')).toHaveAttribute('href', '/terms');
  });

  it('renders Bauhaus color bar', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer.querySelector('.bg-bauhaus-blue')).toBeInTheDocument();
    expect(footer.querySelector('.bg-bauhaus-red')).toBeInTheDocument();
    expect(footer.querySelector('.bg-bauhaus-yellow')).toBeInTheDocument();
  });

  it('has accessible screen reader text for external links', () => {
    render(<Footer />);
    
    expect(screen.getAllByText(/opens in new tab/i).length).toBeGreaterThan(0);
  });

  it('renders all social media links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Discord')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });
});
