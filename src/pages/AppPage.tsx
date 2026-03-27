import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenshotUpload from '../components/ScreenshotUpload';
import PixelDiff from '../components/PixelDiff';
import AnnotationTools from '../components/AnnotationTools';
import ReviewAssignment from '../components/ReviewAssignment';
import ApprovalDash from '../components/ApprovalDash';
import type { Annotation } from '../lib/mockData';
import './AppPage.css';

type Tab = 'compare' | 'dashboard';

export default function AppPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('compare');

  // Upload state
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);

  // Annotation state
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const bothUploaded = beforeImage !== null && afterImage !== null;

  return (
    <div className="app-page">
      {/* Top nav */}
      <nav className="app-nav">
        <div className="app-nav-left">
          <button className="app-nav-brand" onClick={() => navigate('/')}>
            <span className="app-logo">
              <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                <circle cx="14" cy="14" r="8" stroke="#ec4899" strokeWidth="2.5" fill="none"/>
                <circle cx="14" cy="14" r="2" fill="#ec4899"/>
                <line x1="20" y1="20" x2="27" y2="27" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span className="app-brand-text">SnapReview</span>
          </button>
          <div className="app-tabs">
            <button
              className={`app-tab ${tab === 'compare' ? 'active' : ''}`}
              onClick={() => setTab('compare')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Compare
            </button>
            <button
              className={`app-tab ${tab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setTab('dashboard')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Dashboard
            </button>
          </div>
        </div>
        {bothUploaded && tab === 'compare' && (
          <button
            className="app-nav-action"
            onClick={() => {
              setBeforeImage(null);
              setAfterImage(null);
              setAnnotations([]);
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            New Upload
          </button>
        )}
      </nav>

      {/* Content */}
      <div className="app-content">
        {tab === 'compare' ? (
          <div className="compare-layout">
            {/* Upload + Diff area */}
            <div className="compare-main">
              {!bothUploaded ? (
                <ScreenshotUpload
                  beforeImage={beforeImage}
                  afterImage={afterImage}
                  onBeforeChange={setBeforeImage}
                  onAfterChange={setAfterImage}
                />
              ) : (
                <div className="compare-workspace">
                  <PixelDiff
                    beforeSrc={beforeImage}
                    afterSrc={afterImage}
                    annotations={annotations}
                    onAddAnnotation={(a: Annotation) =>
                      setAnnotations((prev) => [...prev, a])
                    }
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className={`compare-sidebar ${!bothUploaded ? 'sidebar-empty' : ''}`}>
              {bothUploaded ? (
                <>
                  <AnnotationTools
                    annotations={annotations}
                    onRemove={(id: string) =>
                      setAnnotations((prev) => prev.filter((a) => a.id !== id))
                    }
                    onUpdate={(id: string, comment: string) =>
                      setAnnotations((prev) =>
                        prev.map((a) => (a.id === id ? { ...a, comment } : a))
                      )
                    }
                  />
                  <ReviewAssignment />
                </>
              ) : (
                <div className="sidebar-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <p>Upload screenshots to start annotating</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <ApprovalDash />
        )}
      </div>
    </div>
  );
}
