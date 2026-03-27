import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AppPage = lazy(() => import('./pages/AppPage'));

function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: 'var(--text-muted)',
        fontSize: '16px',
      }}
    >
      Loading...
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<AppPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
