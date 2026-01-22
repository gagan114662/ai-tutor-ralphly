import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('displays the correct heading', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', { name: /ai tutor platform/i })
    ).toBeInTheDocument();
  });

  it('displays the description text', () => {
    render(<Home />);

    expect(
      screen.getByText(/ai-powered learning platform/i)
    ).toBeInTheDocument();
  });

  it('renders Get Started link', () => {
    render(<Home />);

    const getStartedLink = screen.getByRole('link', { name: /get started/i });
    expect(getStartedLink).toBeInTheDocument();
    expect(getStartedLink).toHaveAttribute('href', '/dashboard');
  });

  it('renders Log in link', () => {
    render(<Home />);

    const loginLink = screen.getByRole('link', { name: /log in/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
