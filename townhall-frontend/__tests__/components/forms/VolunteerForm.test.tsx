import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VolunteerForm } from '@/components/forms/VolunteerForm';

describe('VolunteerForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<VolunteerForm />);
    
    expect(screen.getByTestId('first-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('last-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toBeInTheDocument();
    expect(screen.getByTestId('interest-select')).toBeInTheDocument();
    expect(screen.getByTestId('availability-select')).toBeInTheDocument();
    expect(screen.getByTestId('experience-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('motivation-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields on submit', async () => {
    render(<VolunteerForm />);
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please select an area of interest/i)).toBeInTheDocument();
      expect(screen.getByText(/please tell us why you want to volunteer/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<VolunteerForm />);
    
    await user.type(screen.getByTestId('first-name-input'), 'John');
    await user.type(screen.getByTestId('last-name-input'), 'Doe');
    await user.type(screen.getByTestId('email-input'), 'invalid-email');
    await user.selectOptions(screen.getByTestId('interest-select'), 'event-support');
    await user.type(screen.getByTestId('motivation-textarea'), 'I want to help the community');
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
  });

  it('does not require optional fields', async () => {
    const user = userEvent.setup();
    render(<VolunteerForm />);
    
    await user.type(screen.getByTestId('first-name-input'), 'John');
    await user.type(screen.getByTestId('last-name-input'), 'Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    await user.selectOptions(screen.getByTestId('interest-select'), 'event-support');
    await user.type(screen.getByTestId('motivation-textarea'), 'I want to help the community');
    
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Should not show errors for optional fields
    await waitFor(() => {
      expect(screen.queryByText(/phone.*required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/availability.*required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/experience.*required/i)).not.toBeInTheDocument();
    });
  });

  it('submits form with valid data and shows success message', async () => {
    const user = userEvent.setup();
    render(<VolunteerForm />);
    
    await user.type(screen.getByTestId('first-name-input'), 'John');
    await user.type(screen.getByTestId('last-name-input'), 'Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    await user.selectOptions(screen.getByTestId('interest-select'), 'workshop-facilitator');
    await user.selectOptions(screen.getByTestId('availability-select'), 'weekend');
    await user.type(screen.getByTestId('experience-textarea'), 'I have experience teaching.');
    await user.type(screen.getByTestId('motivation-textarea'), 'I want to help the community learn about AI.');

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    // Button should be disabled during submission
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // Should show success message after submission
    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('displays Discord link in success message', async () => {
    const user = userEvent.setup();
    render(<VolunteerForm />);
    
    await user.type(screen.getByTestId('first-name-input'), 'John');
    await user.type(screen.getByTestId('last-name-input'), 'Doe');
    await user.type(screen.getByTestId('email-input'), 'john@example.com');
    await user.selectOptions(screen.getByTestId('interest-select'), 'event-support');
    await user.type(screen.getByTestId('motivation-textarea'), 'I want to help');

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText(/discord community/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('renders interest options correctly', () => {
    render(<VolunteerForm />);
    
    expect(screen.getByText(/workshop facilitator/i)).toBeInTheDocument();
    expect(screen.getByText(/event support/i)).toBeInTheDocument();
    expect(screen.getByText(/content creator/i)).toBeInTheDocument();
    expect(screen.getByText(/community ambassador/i)).toBeInTheDocument();
  });

  it('renders availability options correctly', () => {
    render(<VolunteerForm />);
    
    expect(screen.getByText(/weekday mornings/i)).toBeInTheDocument();
    expect(screen.getByText(/weekday evenings/i)).toBeInTheDocument();
    expect(screen.getByText(/weekends/i)).toBeInTheDocument();
    expect(screen.getByText(/flexible/i)).toBeInTheDocument();
  });

  it('shows privacy notice', () => {
    render(<VolunteerForm />);
    
    expect(screen.getByText(/we respect your privacy/i)).toBeInTheDocument();
  });
});
