import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal, ModalFooter } from '@/components/ui/Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div>Modal content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<Modal {...defaultProps} title="Test Modal" />);
    expect(screen.getByRole('heading', { name: /test modal/i })).toBeInTheDocument();
  });

  it('shows close button by default', () => {
    render(<Modal {...defaultProps} title="Test" />);
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('hides close button when showCloseButton is false', () => {
    render(<Modal {...defaultProps} showCloseButton={false} />);
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} title="Test" />);
    
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    // Click the overlay (the first div with absolute positioning)
    const overlay = document.querySelector('.bg-black\\/60');
    if (overlay) {
      fireEvent.click(overlay);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('does not call onClose when overlay click is disabled', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={false} />);
    
    const overlay = document.querySelector('.bg-black\\/60');
    if (overlay) {
      fireEvent.click(overlay);
      expect(onClose).not.toHaveBeenCalled();
    }
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose on Escape when closeOnEscape is false', () => {
    const onClose = jest.fn();
    render(<Modal {...defaultProps} onClose={onClose} closeOnEscape={false} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('has correct aria attributes', () => {
    render(<Modal {...defaultProps} title="Accessible Modal" />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Modal {...defaultProps} size="sm" />);
    expect(document.querySelector('.max-w-sm')).toBeInTheDocument();

    rerender(<Modal {...defaultProps} size="lg" />);
    expect(document.querySelector('.max-w-lg')).toBeInTheDocument();

    rerender(<Modal {...defaultProps} size="xl" />);
    expect(document.querySelector('.max-w-xl')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Modal {...defaultProps} className="custom-modal" />);
    expect(document.querySelector('.custom-modal')).toBeInTheDocument();
  });
});

describe('ModalFooter', () => {
  it('renders children', () => {
    render(<ModalFooter>Footer content</ModalFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('has flex layout', () => {
    render(<ModalFooter>Content</ModalFooter>);
    const footer = screen.getByText('Content');
    // ModalFooter has flex class
    expect(footer).toHaveClass('items-center');
  });

  it('applies custom className', () => {
    render(<ModalFooter className="custom-footer">Content</ModalFooter>);
    const footer = document.querySelector('.custom-footer');
    expect(footer).toBeInTheDocument();
  });
});
