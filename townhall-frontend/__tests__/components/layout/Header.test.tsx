import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '@/components/layout/Header';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>{children}</a>
  );
});

describe('Header', () => {
  it('renders the logo with link to home', () => {
    render(<Header />);
    
    const homeLink = screen.getByLabelText(/town hall.*home/i);
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the Town Hall text', () => {
    render(<Header />);
    
    expect(screen.getByText(/town hall/i)).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Header />);
    
    expect(screen.getAllByText(/events/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/blog/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/vlogs/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/volunteer/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/about/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/contact/i).length).toBeGreaterThan(0);
  });

  it('has correct href for navigation links', () => {
    render(<Header />);
    
    const eventsLinks = screen.getAllByText(/events/i);
    expect(eventsLinks[0].closest('a')).toHaveAttribute('href', '/events');
  });

  it('renders mobile menu button', () => {
    render(<Header />);
    
    const menuButton = screen.getByLabelText(/open menu/i);
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu when button is clicked', () => {
    render(<Header />);
    
    const menuButton = screen.getByLabelText(/open menu/i);
    
    // Initially closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    
    // Open menu
    fireEvent.click(menuButton);
    expect(screen.getByLabelText(/close menu/i)).toHaveAttribute('aria-expanded', 'true');
    
    // Close menu
    fireEvent.click(screen.getByLabelText(/close menu/i));
    expect(screen.getByLabelText(/open menu/i)).toHaveAttribute('aria-expanded', 'false');
  });

  it('has accessible navigation landmarks', () => {
    render(<Header />);
    
    expect(screen.getByLabelText(/main navigation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile navigation/i)).toBeInTheDocument();
  });

  it('renders Bauhaus-style logo colors', () => {
    render(<Header />);
    
    // Check for the colored squares in the logo
    const header = screen.getByRole('banner');
    expect(header.querySelector('.bg-bauhaus-blue')).toBeInTheDocument();
    expect(header.querySelector('.bg-bauhaus-red')).toBeInTheDocument();
    expect(header.querySelector('.bg-bauhaus-yellow')).toBeInTheDocument();
  });

  it('is sticky positioned', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky');
    expect(header).toHaveClass('top-0');
  });

  it('mobile menu controls are properly linked', () => {
    render(<Header />);
    
    const menuButton = screen.getByLabelText(/open menu/i);
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    
    const mobileMenu = document.getElementById('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();
  });
});
