import '@testing-library/jest-dom';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { ToastProvider, useToast, toast, toastHelpers } from '@/components/ui/Toast';

// Test component that uses the toast hook
function TestComponent() {
  const { addToast, removeToast, toasts } = useToast();

  return (
    <div>
      <button onClick={() => addToast({ type: 'success', title: 'Success!' })}>
        Show Success
      </button>
      <button onClick={() => addToast({ type: 'error', title: 'Error!', message: 'Something went wrong' })}>
        Show Error
      </button>
      <button onClick={() => addToast({ type: 'warning', title: 'Warning!' })}>
        Show Warning
      </button>
      <button onClick={() => addToast({ type: 'info', title: 'Info!' })}>
        Show Info
      </button>
      <span data-testid="toast-count">{toasts.length}</span>
    </div>
  );
}

describe('ToastProvider', () => {
  it('renders children', () => {
    render(
      <ToastProvider>
        <div>Child content</div>
      </ToastProvider>
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('provides toast context to children', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    expect(screen.getByText('Show Success')).toBeInTheDocument();
  });
});

describe('useToast', () => {
  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useToast must be used within a ToastProvider');
    
    consoleSpy.mockRestore();
  });

  it('adds toast when addToast is called', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    
    await waitFor(() => {
      expect(screen.getByText('Success!')).toBeInTheDocument();
    });
  });

  it('displays success toast with correct styling', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    
    await waitFor(() => {
      const toast = screen.getByRole('alert');
      expect(toast).toHaveClass('border-l-green-500');
    });
  });

  it('displays error toast with correct styling', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Error'));
    
    await waitFor(() => {
      const toast = screen.getByRole('alert');
      expect(toast).toHaveClass('border-l-bauhaus-red');
    });
  });

  it('displays toast message when provided', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Error'));
    
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  it('removes toast when dismiss button is clicked', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    
    await waitFor(() => {
      expect(screen.getByText('Success!')).toBeInTheDocument();
    });

    const dismissButton = screen.getByRole('button', { name: /dismiss/i });
    fireEvent.click(dismissButton);

    await waitFor(() => {
      expect(screen.queryByText('Success!')).not.toBeInTheDocument();
    });
  });

  it('can add multiple toasts', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    fireEvent.click(screen.getByText('Show Error'));
    fireEvent.click(screen.getByText('Show Warning'));

    await waitFor(() => {
      expect(screen.getByText('Success!')).toBeInTheDocument();
      expect(screen.getByText('Error!')).toBeInTheDocument();
      expect(screen.getByText('Warning!')).toBeInTheDocument();
    });
  });

  it('auto-dismisses toast after duration', async () => {
    jest.useFakeTimers();
    
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    
    await waitFor(() => {
      expect(screen.getByText('Success!')).toBeInTheDocument();
    });

    // Fast-forward past the default duration (5000ms)
    act(() => {
      jest.advanceTimersByTime(5500);
    });

    await waitFor(() => {
      expect(screen.queryByText('Success!')).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});

describe('Toast accessibility', () => {
  it('has role="alert" for screen readers', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    
    await waitFor(() => {
      const toast = screen.getByRole('alert');
      expect(toast).toBeInTheDocument();
    });
  });

  it('has aria-live attribute', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    
    await waitFor(() => {
      const toast = screen.getByRole('alert');
      expect(toast).toHaveAttribute('aria-live', 'polite');
    });
  });

  it('dismiss button has accessible label', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    
    await waitFor(() => {
      const dismissButton = screen.getByRole('button', { name: /dismiss/i });
      expect(dismissButton).toBeInTheDocument();
    });
  });
});

describe('Toast helper functions', () => {
  // Test component that exposes context for helper function testing
  function HelperTestComponent({ onContextReady }: { onContextReady: (ctx: ReturnType<typeof useToast>) => void }) {
    const context = useToast();
    
    return (
      <div>
        <button onClick={() => onContextReady(context)}>Get Context</button>
        <span data-testid="toast-count">{context.toasts.length}</span>
      </div>
    );
  }

  it('toast function adds toast via context', async () => {
    let capturedContext: ReturnType<typeof useToast> | null = null;
    
    render(
      <ToastProvider>
        <HelperTestComponent onContextReady={(ctx) => { capturedContext = ctx; }} />
      </ToastProvider>
    );

    // Get context
    fireEvent.click(screen.getByText('Get Context'));
    
    // Use toast helper
    act(() => {
      if (capturedContext) {
        toast(capturedContext, { type: 'info', title: 'Helper Toast' });
      }
    });

    await waitFor(() => {
      expect(screen.getByText('Helper Toast')).toBeInTheDocument();
    });
  });

  it('toastHelpers.success adds success toast', async () => {
    let capturedContext: ReturnType<typeof useToast> | null = null;
    
    render(
      <ToastProvider>
        <HelperTestComponent onContextReady={(ctx) => { capturedContext = ctx; }} />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Get Context'));
    
    act(() => {
      if (capturedContext) {
        toastHelpers.success(capturedContext, 'Success Helper', 'Success message');
      }
    });

    await waitFor(() => {
      expect(screen.getByText('Success Helper')).toBeInTheDocument();
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });
  });

  it('toastHelpers.error adds error toast', async () => {
    let capturedContext: ReturnType<typeof useToast> | null = null;
    
    render(
      <ToastProvider>
        <HelperTestComponent onContextReady={(ctx) => { capturedContext = ctx; }} />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Get Context'));
    
    act(() => {
      if (capturedContext) {
        toastHelpers.error(capturedContext, 'Error Helper');
      }
    });

    await waitFor(() => {
      expect(screen.getByText('Error Helper')).toBeInTheDocument();
    });
  });

  it('toastHelpers.warning adds warning toast', async () => {
    let capturedContext: ReturnType<typeof useToast> | null = null;
    
    render(
      <ToastProvider>
        <HelperTestComponent onContextReady={(ctx) => { capturedContext = ctx; }} />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Get Context'));
    
    act(() => {
      if (capturedContext) {
        toastHelpers.warning(capturedContext, 'Warning Helper');
      }
    });

    await waitFor(() => {
      expect(screen.getByText('Warning Helper')).toBeInTheDocument();
    });
  });

  it('toastHelpers.info adds info toast', async () => {
    let capturedContext: ReturnType<typeof useToast> | null = null;
    
    render(
      <ToastProvider>
        <HelperTestComponent onContextReady={(ctx) => { capturedContext = ctx; }} />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Get Context'));
    
    act(() => {
      if (capturedContext) {
        toastHelpers.info(capturedContext, 'Info Helper');
      }
    });

    await waitFor(() => {
      expect(screen.getByText('Info Helper')).toBeInTheDocument();
    });
  });
});

describe('Toast styling variants', () => {
  it('displays warning toast with correct styling', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Warning'));
    
    await waitFor(() => {
      const toast = screen.getByRole('alert');
      expect(toast).toHaveClass('border-l-bauhaus-yellow');
    });
  });

  it('displays info toast with correct styling', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Info'));
    
    await waitFor(() => {
      const toast = screen.getByRole('alert');
      expect(toast).toHaveClass('border-l-bauhaus-blue');
    });
  });
});
