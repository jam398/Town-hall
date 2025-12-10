import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VolunteerForm } from '@/components/forms/VolunteerForm';

// Mock fetch
global.fetch = jest.fn();

describe('VolunteerForm', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders all form fields', () => {
    render(<VolunteerForm />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/area of interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/availability/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/relevant experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/why do you want to volunteer/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    render(<VolunteerForm />);

    const submitButton = screen.getByRole('button', { name: /submit application/i });
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
    render(<VolunteerForm />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByRole('button', { name: /submit application/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Application submitted' }),
    });

    render(<VolunteerForm />);

    // Fill in form
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'Smith' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'jane.smith@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/phone/i), {
      target: { value: '555-5678' },
    });
    fireEvent.change(screen.getByLabelText(/area of interest/i), {
      target: { value: 'workshop-facilitator' },
    });
    fireEvent.change(screen.getByLabelText(/availability/i), {
      target: { value: 'weekday-evening' },
    });
    fireEvent.change(screen.getByLabelText(/relevant experience/i), {
      target: { value: 'I have teaching experience' },
    });
    fireEvent.change(screen.getByLabelText(/why do you want to volunteer/i), {
      target: { value: 'I want to help my community learn about AI' },
    });

    // Submit
    const submitButton = screen.getByRole('button', { name: /submit application/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          phone: '555-5678',
          interest: 'workshop-facilitator',
          availability: 'weekday-evening',
          experience: 'I have teaching experience',
          motivation: 'I want to help my community learn about AI',
        }),
      });
    });
  });

  it('shows success message after successful submission', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Application submitted' }),
    });

    render(<VolunteerForm />);

    // Fill required fields
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/area of interest/i), { target: { value: 'event-support' } });
    fireEvent.change(screen.getByLabelText(/why do you want to volunteer/i), { target: { value: 'To help the community' } });

    fireEvent.click(screen.getByRole('button', { name: /submit application/i }));

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      expect(screen.getByText(/received your volunteer application/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('shows error message when API call fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Submission failed' }),
    });

    render(<VolunteerForm />);

    // Fill required fields
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/area of interest/i), { target: { value: 'event-support' } });
    fireEvent.change(screen.getByLabelText(/why do you want to volunteer/i), { target: { value: 'To help' } });

    fireEvent.click(screen.getByRole('button', { name: /submit application/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('optional fields can be left empty', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<VolunteerForm />);

    // Fill only required fields (phone, availability, experience are optional)
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/area of interest/i), { target: { value: 'event-support' } });
    fireEvent.change(screen.getByLabelText(/why do you want to volunteer/i), { target: { value: 'To help' } });

    fireEvent.click(screen.getByRole('button', { name: /submit application/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('disables submit button while submitting', async () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 100))
    );

    render(<VolunteerForm />);

    // Fill required fields
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/area of interest/i), { target: { value: 'event-support' } });
    fireEvent.change(screen.getByLabelText(/why do you want to volunteer/i), { target: { value: 'To help' } });

    const submitButton = screen.getByRole('button', { name: /submit application/i });
    fireEvent.click(submitButton);

    // Button should be disabled during submission
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText(/thank you/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
