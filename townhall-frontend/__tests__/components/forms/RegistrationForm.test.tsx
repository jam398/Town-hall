import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegistrationForm } from '@/components/forms/RegistrationForm';

// Mock fetch
global.fetch = jest.fn();

describe('RegistrationForm', () => {
  const defaultProps = {
    eventSlug: 'test-event',
    eventTitle: 'Test Event Title',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Registration successful' }),
    });
  });

  it('renders all form fields', () => {
    render(<RegistrationForm {...defaultProps} />);
    
    expect(screen.getByTestId('first-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('last-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields on submit', async () => {
    render(<RegistrationForm {...defaultProps} />);
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm {...defaultProps} />);
    
    await user.type(screen.getByTestId('first-name-input'), 'John');
    await user.type(screen.getByTestId('last-name-input'), 'Doe');
    await user.type(screen.getByTestId('email-input'), 'invalid-email');
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
  });

  it('does not require phone number', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm {...defaultProps} />);
    
    await user.type(screen.getByTestId('first-name-input'), 'John');
    await user.type(screen.getByTestId('last-name-input'), 'Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Should not show phone error
    await waitFor(() => {
      expect(screen.queryByText(/phone.*required/i)).not.toBeInTheDocument();
    });
  });

  it('submits form with valid data and shows success message', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm {...defaultProps} />);
    
    await user.type(screen.getByTestId('first-name-input'), 'John');
    await user.type(screen.getByTestId('last-name-input'), 'Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    await user.type(screen.getByTestId('phone-input'), '555-123-4567');

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Button should be disabled during submission
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // Should show success message after submission
    await waitFor(() => {
      expect(screen.getByText(/you're registered/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('displays event title in success message', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm {...defaultProps} />);
    
    await user.type(screen.getByTestId('first-name-input'), 'John');
    await user.type(screen.getByTestId('last-name-input'), 'Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText(/test event title/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('shows helper text for phone field', () => {
    render(<RegistrationForm {...defaultProps} />);
    
    expect(screen.getByText(/for event reminders only/i)).toBeInTheDocument();
  });

  it('shows disclaimer about communications', () => {
    render(<RegistrationForm {...defaultProps} />);
    
    expect(screen.getByText(/by registering, you agree/i)).toBeInTheDocument();
  });

  it('validates first name is not just whitespace', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm {...defaultProps} />);
    
    await user.type(screen.getByTestId('first-name-input'), '   ');
    await user.type(screen.getByTestId('last-name-input'), 'Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    });
  });
});
