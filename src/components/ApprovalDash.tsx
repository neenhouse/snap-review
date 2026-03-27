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
  };

  return (
    <div className="approval-dash" data-testid="approval-dash">
      {/* Summary stats */}
      <div className="dash-header">
        <h2 className="dash-title">Approval Dashboard</h2>
        <div className="dash-stats">
          <div className="dash-stat">
            <span className="dash-stat-value">{counts.all}</span>
            <span className="dash-stat-label">Total</span>
          </div>
          <div className="dash-stat">
            <span className="dash-stat-value" style={{ color: 'var(--yellow)' }}>
              {counts.pending}
            </span>
            <span className="dash-stat-label">Pending</span>
          </div>
          <div className="dash-stat">
            <span className="dash-stat-value" style={{ color: 'var(--blue)' }}>
              {counts['in-review']}
            </span>
            <span className="dash-stat-label">In Review</span>
          </div>
          <div className="dash-stat">
            <span className="dash-stat-value" style={{ color: 'var(--green)' }}>
              {counts.approved}
            </span>
            <span className="dash-stat-label">Approved</span>
          </div>
          <div className="dash-stat">
            <span className="dash-stat-value" style={{ color: 'var(--red)' }}>
              {counts.rejected}
            </span>
            <span className="dash-stat-label">Rejected</span>
          </div>
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
                          rx="4"
                          fill="var(--bg-tertiary)"
                        />
                        <text
                          x="16"
                          y="20"
                          textAnchor="middle"
                          fill="var(--text-muted)"
                          fontSize="10"
                        >
                          IMG
                        </text>
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
                    <span>{review.assignee.name}</span>
                  </div>
                </td>
                <td>
                  <span
                    className="dash-badge"
                    style={{
                      background: `color-mix(in srgb, ${getStatusColor(review.status)} 15%, transparent)`,
                      color: getStatusColor(review.status),
                      borderColor: getStatusColor(review.status),
                    }}
                  >
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
                        className="dash-action-btn approve"
                        onClick={() => updateStatus(review.id, 'approved')}
                        title="Approve"
                      >
                        Approve
                      </button>
                    )}
                    {review.status !== 'rejected' && (
                      <button
                        className="dash-action-btn reject"
                        onClick={() => updateStatus(review.id, 'rejected')}
                        title="Reject"
                      >
                        Reject
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
        <p className="dash-empty">No reviews match the current filter.</p>
      )}
    </div>
  );
}
