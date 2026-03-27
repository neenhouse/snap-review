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
      <h3 className="ra-title">Review Assignment</h3>

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
      <button className="ra-save" onClick={handleSave}>
        {saved ? 'Saved!' : 'Save Assignment'}
      </button>
    </div>
  );
}
