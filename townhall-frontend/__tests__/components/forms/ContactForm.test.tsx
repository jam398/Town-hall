import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/forms/ContactForm';

// Mock fetch
global.fetch = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Message sent' }),
    });
  });

  it('renders all form fields', () => {
    render(<ContactForm />);
    
    expect(screen.getByTestId('name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('subject-select')).toBeInTheDocument();
    expect(screen.getByTestId('message-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields on submit', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please select a subject/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const emailInput = screen.getByTestId('email-input');
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for short message', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const messageInput = screen.getByTestId('message-textarea');
    await user.type(messageInput, 'Short');
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data and shows success message', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    await user.selectOptions(screen.getByTestId('subject-select'), 'general');
    await user.type(screen.getByTestId('message-textarea'), 'This is a test message that is long enough.');

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Button should be disabled during submission
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // Should show success message after submission
    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('allows sending another message after success', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    await user.type(screen.getByTestId('name-input'), 'John Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    await user.selectOptions(screen.getByTestId('subject-select'), 'general');
    await user.type(screen.getByTestId('message-textarea'), 'This is a test message that is long enough.');

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Click "Send Another Message"
    const sendAnotherButton = screen.getByText(/send another message/i);
    fireEvent.click(sendAnotherButton);

    // Form should be visible again
    await waitFor(() => {
      expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    });
  });

  it('renders subject options correctly', () => {
    render(<ContactForm />);
    
    const subjectSelect = screen.getByTestId('subject-select');
    expect(subjectSelect).toBeInTheDocument();
    
    // Check that options exist
    expect(screen.getByText(/general inquiry/i)).toBeInTheDocument();
    expect(screen.getByText(/partnership opportunity/i)).toBeInTheDocument();
    expect(screen.getByText(/media/i)).toBeInTheDocument();
  });
});
