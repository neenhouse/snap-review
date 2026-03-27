import { useState } from 'react';
import {
  mockReviews,
  getStatusColor,
  getPriorityColor,
  type ReviewStatus,
  type Review,
} from '../lib/mockData';
import './ApprovalDash.css';

type FilterStatus = 'all' | ReviewStatus;

export default function ApprovalDash() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [confirmingAction, setConfirmingAction] = useState<{
    id: string;
    action: 'approved' | 'rejected';
  } | null>(null);

  const filtered =
    filterStatus === 'all'
      ? reviews
      : reviews.filter((r) => r.status === filterStatus);

  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    'in-review': reviews.filter((r) => r.status === 'in-review').length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    rejected: reviews.filter((r) => r.status === 'rejected').length,
  };

  const updateStatus = (id: string, newStatus: ReviewStatus) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: newStatus, updatedAt: new Date().toISOString() }
          : r,
      ),
    );
    setConfirmingAction(null);
  };

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    if (confirmingAction?.id === id && confirmingAction?.action === action) {
      updateStatus(id, action);
    } else {
      setConfirmingAction({ id, action });
      setTimeout(() => {
        setConfirmingAction((current) =>
          current?.id === id && current?.action === action ? null : current,
        );
      }, 3000);
    }
  };

  const statusIcons: Record<ReviewStatus, React.ReactNode> = {
    pending: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    'in-review': (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    approved: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    rejected: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  };

  return (
    <div className="approval-dash" data-testid="approval-dash">
      {/* Header with stats */}
      <div className="dash-header">
        <div className="dash-header-left">
          <h2 className="dash-title">Approval Dashboard</h2>
          <p className="dash-subtitle">Track review status across your team</p>
        </div>
        <div className="dash-stats">
          {[
            { key: 'all', label: 'Total', color: 'var(--text-primary)' },
            { key: 'pending', label: 'Pending', color: 'var(--yellow)' },
            { key: 'in-review', label: 'In Review', color: 'var(--blue)' },
            { key: 'approved', label: 'Approved', color: 'var(--green)' },
            { key: 'rejected', label: 'Rejected', color: 'var(--red)' },
          ].map((s) => (
            <div key={s.key} className="dash-stat">
              <span className="dash-stat-value" style={{ color: s.color }}>
                {counts[s.key as keyof typeof counts]}
              </span>
              <span className="dash-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="dash-filters">
        {(
          ['all', 'pending', 'in-review', 'approved', 'rejected'] as FilterStatus[]
        ).map((s) => (
          <button
            key={s}
            className={`dash-filter-btn ${filterStatus === s ? 'active' : ''}`}
            onClick={() => setFilterStatus(s)}
          >
            {s === 'all'
              ? 'All'
              : s === 'in-review'
                ? 'In Review'
                : s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="filter-count">{counts[s]}</span>
          </button>
        ))}
      </div>

      {/* Review list */}
      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Review</th>
              <th>Assignee</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Annotations</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((review) => (
              <tr key={review.id}>
                <td>
                  <div className="dash-review-cell">
                    <div className="dash-thumb">
                      <svg width="32" height="32" viewBox="0 0 32 32">
                        <rect
                          width="32"
                          height="32"
                          rx="6"
                          fill="var(--bg-tertiary)"
                        />
                        <rect x="6" y="6" width="8" height="8" rx="1" fill="var(--border-light)" />
                        <rect x="18" y="6" width="8" height="8" rx="1" fill="var(--border-light)" />
                        <rect x="6" y="18" width="8" height="8" rx="1" fill="var(--border-light)" />
                        <rect x="18" y="18" width="8" height="8" rx="1" fill="var(--magenta-border)" />
                      </svg>
                    </div>
                    <div>
                      <span className="dash-review-title">{review.title}</span>
                      <span className="dash-review-date">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="dash-assignee">
                    <span className="dash-avatar">
                      {review.assignee.avatar}
                    </span>
                    <span className="dash-assignee-name">{review.assignee.name}</span>
                  </div>
                </td>
                <td>
                  <span
                    className="dash-badge"
                    style={{
                      background: `color-mix(in srgb, ${getStatusColor(review.status)} 12%, transparent)`,
                      color: getStatusColor(review.status),
                      borderColor: `color-mix(in srgb, ${getStatusColor(review.status)} 35%, transparent)`,
                    }}
                  >
                    {statusIcons[review.status]}
                    {review.status === 'in-review'
                      ? 'In Review'
                      : review.status.charAt(0).toUpperCase() +
                        review.status.slice(1)}
                  </span>
                </td>
                <td>
                  <span
                    className="dash-priority"
                    style={{ color: getPriorityColor(review.priority) }}
                  >
                    {review.priority === 'high' && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 3, verticalAlign: 'middle' }}>
                        <path d="M12 2l2.09 6.26L20 9.27l-4 3.87.94 5.86L12 16.77l-4.94 2.23.94-5.86-4-3.87 5.91-.01z" />
                      </svg>
                    )}
                    {review.priority.charAt(0).toUpperCase() +
                      review.priority.slice(1)}
                  </span>
                </td>
                <td>
                  <span className="dash-ann-count">
                    {review.annotations.length}
                  </span>
                </td>
                <td>
                  <span className="dash-due">
                    {new Date(review.dueDate).toLocaleDateString()}
                  </span>
                </td>
                <td>
                  <div className="dash-actions">
                    {review.status !== 'approved' && (
                      <button
                        className={`dash-action-btn approve ${
                          confirmingAction?.id === review.id &&
                          confirmingAction?.action === 'approved'
                            ? 'confirming'
                            : ''
                        }`}
                        onClick={() => handleAction(review.id, 'approved')}
                        title="Approve"
                      >
                        {confirmingAction?.id === review.id &&
                        confirmingAction?.action === 'approved' ? (
                          <>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Confirm
                          </>
                        ) : (
                          'Approve'
                        )}
                      </button>
                    )}
                    {review.status !== 'rejected' && (
                      <button
                        className={`dash-action-btn reject ${
                          confirmingAction?.id === review.id &&
                          confirmingAction?.action === 'rejected'
                            ? 'confirming'
                            : ''
                        }`}
                        onClick={() => handleAction(review.id, 'rejected')}
                        title="Reject"
                      >
                        {confirmingAction?.id === review.id &&
                        confirmingAction?.action === 'rejected' ? (
                          <>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            Confirm
                          </>
                        ) : (
                          'Reject'
                        )}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="dash-empty">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <p>No reviews match the current filter.</p>
        </div>
      )}
    </div>
  );
}
