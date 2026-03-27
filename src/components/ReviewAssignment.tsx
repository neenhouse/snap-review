import { useState } from 'react';
import { mockUsers, type Priority, type ReviewStatus } from '../lib/mockData';
import './ReviewAssignment.css';

export default function ReviewAssignment() {
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<ReviewStatus>('pending');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="review-assignment" data-testid="review-assignment">
      <div className="ra-header">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
        <h3 className="ra-title">Review Assignment</h3>
      </div>

      {/* Assignee */}
      <div className="ra-field">
        <label className="ra-label">Assignee</label>
        <select
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="ra-select"
        >
          <option value="">Select team member...</option>
          {mockUsers.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {/* Priority */}
      <div className="ra-field">
        <label className="ra-label">Priority</label>
        <div className="ra-priority-group">
          {(['low', 'medium', 'high'] as Priority[]).map((p) => (
            <button
              key={p}
              className={`ra-priority-btn ra-priority-${p} ${priority === p ? 'active' : ''}`}
              onClick={() => setPriority(p)}
            >
              {p === 'high' && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              )}
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Due date */}
      <div className="ra-field">
        <label className="ra-label">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="ra-date"
        />
      </div>

      {/* Status */}
      <div className="ra-field">
        <label className="ra-label">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ReviewStatus)}
          className="ra-select"
        >
          <option value="pending">Pending</option>
          <option value="in-review">In Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Save */}
      <button
        className={`ra-save ${saved ? 'ra-save--saved' : ''}`}
        onClick={handleSave}
      >
        {saved ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Saved!
          </>
        ) : (
          'Save Assignment'
        )}
      </button>
    </div>
  );
}
