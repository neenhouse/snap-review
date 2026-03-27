import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const features = [
  {
    icon: '📸',
    title: 'Screenshot Upload',
    description:
      'Drag-and-drop or pick files to upload before/after screenshots. Side-by-side preview with synchronized pan and zoom.',
  },
  {
    icon: '🔍',
    title: 'Pixel Diff Engine',
    description:
      'Canvas-based pixel comparison with adjustable sensitivity. View diffs in side-by-side, overlay, or diff-only mode.',
  },
  {
    icon: '📝',
    title: 'Annotation Tools',
    description:
      'Click anywhere to drop annotation pins with comments. Numbered markers link to a sidebar for quick navigation.',
  },
  {
    icon: '✅',
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
          <span className="landing-logo">SR</span>
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
        <h1 className="landing-hero-title">
          Visual QA,{' '}
          <span className="landing-hero-accent">pixel-perfect.</span>
        </h1>
        <p className="landing-hero-sub">
          Screenshot comparison, diff annotation, team assignments, and approval
          workflows — all in one place.
        </p>
        <div className="landing-hero-actions">
          <button
            className="btn-primary"
            onClick={() => navigate('/app')}
          >
            Get Started
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
      </section>

      {/* Features */}
      <section id="features" className="landing-features">
        <h2 className="landing-section-title">Everything you need for visual QA</h2>
        <div className="landing-features-grid">
          {features.map((f) => (
            <div key={f.title} className="landing-feature-card">
              <span className="landing-feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <h2>Ready to ship pixel-perfect UIs?</h2>
        <p>Start comparing screenshots in seconds. No sign-up required.</p>
        <button className="btn-primary" onClick={() => navigate('/app')}>
          Launch SnapReview
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2026 SnapReview. Built for design &amp; engineering teams.</p>
      </footer>
    </div>
  );
}
