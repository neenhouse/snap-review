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
            <span className="app-logo">SR</span>
            <span className="app-brand-text">SnapReview</span>
          </button>
          <div className="app-tabs">
            <button
              className={`app-tab ${tab === 'compare' ? 'active' : ''}`}
              onClick={() => setTab('compare')}
            >
              Compare
            </button>
            <button
              className={`app-tab ${tab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setTab('dashboard')}
            >
              Dashboard
            </button>
          </div>
        </div>
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
                  <div className="compare-toolbar">
                    <button
                      className="btn-sm btn-secondary-sm"
                      onClick={() => {
                        setBeforeImage(null);
                        setAfterImage(null);
                        setAnnotations([]);
                      }}
                    >
                      Upload New
                    </button>
                  </div>
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
            <div className="compare-sidebar">
              {bothUploaded && (
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
