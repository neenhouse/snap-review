import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ApprovalDash from './ApprovalDash';

describe('ApprovalDash', () => {
  it('renders all mock reviews in the table', () => {
    render(<ApprovalDash />);

    expect(screen.getByText('Approval Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Homepage hero redesign')).toBeInTheDocument();
    expect(screen.getByText('Checkout flow button alignment')).toBeInTheDocument();
    expect(screen.getByText('Login form responsive breakpoint')).toBeInTheDocument();
  });

  it('filters reviews by status', () => {
    render(<ApprovalDash />);

    // Click the "Approved" filter
    const approvedBtn = screen.getByRole('button', { name: /Approved/i });
    fireEvent.click(approvedBtn);

    // Approved items should be visible
    expect(screen.getByText('Dashboard sidebar spacing')).toBeInTheDocument();
    expect(screen.getByText('Footer link color contrast')).toBeInTheDocument();

    // Non-approved items should be hidden
    expect(screen.queryByText('Homepage hero redesign')).not.toBeInTheDocument();
  });

  it('updates review status when approve button is clicked', () => {
    render(<ApprovalDash />);

    // Find all approve buttons and click the first one
    const approveButtons = screen.getAllByText('Approve');
    fireEvent.click(approveButtons[0]);

    // The "Approved" count should increase (was 2, now 3)
    // We check the stat display
    const stats = screen.getAllByText('3');
    expect(stats.length).toBeGreaterThan(0);
  });
});
