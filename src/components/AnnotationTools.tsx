import { useState } from 'react';
import type { Annotation } from '../lib/mockData';
import './AnnotationTools.css';

interface Props {
  annotations: Annotation[];
  onRemove: (id: string) => void;
  onUpdate: (id: string, comment: string) => void;
}

export default function AnnotationTools({ annotations, onRemove, onUpdate }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const startEdit = (ann: Annotation) => {
    setEditingId(ann.id);
    setEditText(ann.comment);
  };

  const saveEdit = (id: string) => {
    onUpdate(id, editText);
    setEditingId(null);
    setEditText('');
  };

  const scrollToPin = (ann: Annotation) => {
    // In a real app we'd scroll the canvas viewport.
    // For now, we'll highlight the pin via a brief visual flash.
    const el = document.getElementById(`pin-${ann.id}`);
    if (el) {
      el.classList.add('pin-flash');
      setTimeout(() => el.classList.remove('pin-flash'), 600);
    }
  };

  return (
    <div className="annotation-tools" data-testid="annotation-tools">
      <div className="annotation-header">
        <h3>Annotations</h3>
        <span className="annotation-count">{annotations.length}</span>
      </div>

      {annotations.length === 0 ? (
        <p className="annotation-empty">
          Click on the image to add annotation pins.
        </p>
      ) : (
        <ul className="annotation-list">
          {annotations.map((ann, i) => (
            <li
              key={ann.id}
              id={`pin-${ann.id}`}
              className="annotation-item"
              onClick={() => scrollToPin(ann)}
            >
              <div className="annotation-item-header">
                <span className="annotation-number">{i + 1}</span>
                <span className="annotation-coords">
                  ({ann.x}, {ann.y})
                </span>
                <button
                  className="annotation-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(ann.id);
                  }}
                  aria-label={`Remove annotation ${i + 1}`}
                >
                  x
                </button>
              </div>

              {editingId === ann.id ? (
                <div className="annotation-edit">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="Add a comment..."
                    rows={2}
                    autoFocus
                  />
                  <div className="annotation-edit-actions">
                    <button
                      className="btn-sm-save"
                      onClick={(e) => {
                        e.stopPropagation();
                        saveEdit(ann.id);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="btn-sm-cancel"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="annotation-comment"
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(ann);
                  }}
                >
                  {ann.comment || (
                    <span className="annotation-placeholder">
                      Click to add comment...
                    </span>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
