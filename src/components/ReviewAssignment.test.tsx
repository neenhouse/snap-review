import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ReviewAssignment from './ReviewAssignment';

describe('ReviewAssignment', () => {
  it('renders all form fields', () => {
    render(<ReviewAssignment />);

    expect(screen.getByText('Review Assignment')).toBeInTheDocument();
    expect(screen.getByText('Assignee')).toBeInTheDocument();
    expect(screen.getByText('Priority')).toBeInTheDocument();
    expect(screen.getByText('Due Date')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Save Assignment')).toBeInTheDocument();
  });

  it('shows team members in the assignee dropdown', () => {
    render(<ReviewAssignment />);

    // Check that mock users appear as options
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('Bob Martinez')).toBeInTheDocument();
    expect(screen.getByText('Select team member...')).toBeInTheDocument();
  });

  it('toggles priority buttons', () => {
    render(<ReviewAssignment />);

    const highBtn = screen.getByText('High');
    fireEvent.click(highBtn);
    expect(highBtn.className).toContain('active');
  });
});
