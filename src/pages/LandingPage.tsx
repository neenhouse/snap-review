import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    ),
    title: 'Screenshot Upload',
    description:
      'Drag-and-drop or pick files to upload before/after screenshots. Side-by-side preview with synchronized pan and zoom.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
    title: 'Pixel Diff Engine',
    description:
      'Canvas-based pixel comparison with adjustable sensitivity. View diffs in side-by-side, overlay, or diff-only mode.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M12 7v2M12 13h.01" />
      </svg>
    ),
    title: 'Annotation Tools',
    description:
      'Click anywhere to drop annotation pins with comments. Numbered markers link to a sidebar for quick navigation.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: 'Approval Workflows',
    description:
      'Assign reviews to team members with priority and due dates. Track status from pending through approval or rejection.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav-brand">
          <div className="landing-logo">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <circle cx="14" cy="14" r="8" stroke="#ec4899" strokeWidth="2.5" fill="none"/>
              <circle cx="14" cy="14" r="2" fill="#ec4899"/>
              <line x1="20" y1="20" x2="27" y2="27" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="landing-brand-text">SnapReview</span>
        </div>
        <button
          className="landing-nav-cta"
          onClick={() => navigate('/app')}
        >
          Open App
        </button>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-badge">Visual QA Platform</div>
        <h1 className="landing-hero-title">
          Catch every{' '}
          <span className="landing-hero-accent">pixel.</span>
        </h1>
        <p className="landing-hero-sub">
          Screenshot comparison, pixel-level diffs, annotation pins, and approval workflows
          — everything your team needs to ship pixel-perfect UIs.
        </p>
        <div className="landing-hero-actions">
          <button
            className="btn-primary"
            onClick={() => navigate('/app')}
          >
            Start Reviewing
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            className="btn-secondary"
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            See Features
          </button>
        </div>

        {/* Before / After Preview */}
        <div className="landing-preview">
          <div className="landing-preview-window">
            <div className="preview-titlebar">
              <div className="preview-dots">
                <span></span><span></span><span></span>
              </div>
              <span className="preview-titlebar-text">visual-diff.png</span>
            </div>
            <div className="preview-content">
              <div className="preview-side preview-before">
                <div className="preview-label">Before</div>
                <div className="preview-mockup">
                  <div className="mock-nav"></div>
                  <div className="mock-hero">
                    <div className="mock-title"></div>
                    <div className="mock-subtitle"></div>
                  </div>
                  <div className="mock-cards">
                    <div className="mock-card"></div>
                    <div className="mock-card"></div>
                    <div className="mock-card"></div>
                  </div>
                </div>
              </div>
              <div className="preview-divider">
                <div className="preview-divider-line"></div>
                <div className="preview-divider-handle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3l4 4 4-4M8 21l4-4 4 4M3 8l4 4-4 4M21 8l-4 4 4 4"/>
                  </svg>
                </div>
              </div>
              <div className="preview-side preview-after">
                <div className="preview-label">After</div>
                <div className="preview-mockup">
                  <div className="mock-nav"></div>
                  <div className="mock-hero">
                    <div className="mock-title mock-changed"></div>
                    <div className="mock-subtitle"></div>
                  </div>
                  <div className="mock-cards">
                    <div className="mock-card"></div>
                    <div className="mock-card mock-changed"></div>
                    <div className="mock-card"></div>
                  </div>
                  {/* Diff annotations */}
                  <div className="mock-pin mock-pin-1">1</div>
                  <div className="mock-pin mock-pin-2">2</div>
                </div>
              </div>
            </div>
            <div className="preview-stats-bar">
              <span className="preview-stat"><strong>1,247</strong> px changed</span>
              <span className="preview-stat-sep"></span>
              <span className="preview-stat"><strong>2.4%</strong> different</span>
              <span className="preview-stat-sep"></span>
              <span className="preview-stat"><strong>2</strong> annotations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="landing-features">
        <div className="landing-features-header">
          <h2 className="landing-section-title">
            Everything you need for visual QA
          </h2>
          <p className="landing-section-sub">
            From upload to approval, SnapReview covers the entire visual review workflow.
          </p>
        </div>
        <div className="landing-features-grid">
          {features.map((f) => (
            <div key={f.title} className="landing-feature-card">
              <div className="landing-feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <div className="landing-cta-glow"></div>
        <h2>Ready to ship pixel-perfect UIs?</h2>
        <p>Start comparing screenshots in seconds. No sign-up required.</p>
        <button className="btn-primary" onClick={() => navigate('/app')}>
          Launch SnapReview
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2026 SnapReview. Built for design &amp; engineering teams.</p>
      </footer>
    </div>
  );
}
