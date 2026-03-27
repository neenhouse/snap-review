import { useRef, useState, useEffect } from 'react';
import type { Annotation } from '../lib/mockData';
import { mockUsers } from '../lib/mockData';
import './PixelDiff.css';

type ViewMode = 'side-by-side' | 'overlay' | 'diff-only';

interface Props {
  beforeSrc: string;
  afterSrc: string;
  annotations: Annotation[];
  onAddAnnotation: (annotation: Annotation) => void;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function PixelDiff({
  beforeSrc,
  afterSrc,
  annotations,
  onAddAnnotation,
}: Props) {
  const canvasBeforeRef = useRef<HTMLCanvasElement>(null);
  const canvasAfterRef = useRef<HTMLCanvasElement>(null);
  const canvasDiffRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const [mode, setMode] = useState<ViewMode>('side-by-side');
  const [sliderPos, setSliderPos] = useState(50);
  const [diffStats, setDiffStats] = useState<{
    changed: number;
    total: number;
    pct: string;
  } | null>(null);
  const [sensitivity, setSensitivity] = useState(10);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  // Compute diff when sources or sensitivity change
  useEffect(() => {
    let cancelled = false;

    async function computeDiff() {
      try {
        const [beforeImg, afterImg] = await Promise.all([
          loadImage(beforeSrc),
          loadImage(afterSrc),
        ]);
        if (cancelled) return;

        const width = Math.max(beforeImg.width, afterImg.width);
        const height = Math.max(beforeImg.height, afterImg.height);
        setCanvasSize({ width, height });

        // Draw before
        const cBefore = canvasBeforeRef.current;
        if (cBefore) {
          cBefore.width = width;
          cBefore.height = height;
          const ctx = cBefore.getContext('2d')!;
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(beforeImg, 0, 0);
        }

        // Draw after
        const cAfter = canvasAfterRef.current;
        if (cAfter) {
          cAfter.width = width;
          cAfter.height = height;
          const ctx = cAfter.getContext('2d')!;
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(afterImg, 0, 0);
        }

        // Compute diff
        const cDiff = canvasDiffRef.current;
        if (cDiff && cBefore && cAfter) {
          cDiff.width = width;
          cDiff.height = height;
          const ctxBefore = cBefore.getContext('2d')!;
          const ctxAfter = cAfter.getContext('2d')!;
          const ctxDiff = cDiff.getContext('2d')!;

          const dataBefore = ctxBefore.getImageData(0, 0, width, height);
          const dataAfter = ctxAfter.getImageData(0, 0, width, height);
          const diffImage = ctxDiff.createImageData(width, height);
          const threshold = sensitivity * 2.55; // 0-255 scale

          let changedPixels = 0;
          const totalPixels = width * height;

          for (let i = 0; i < dataBefore.data.length; i += 4) {
            const dr = Math.abs(dataBefore.data[i] - dataAfter.data[i]);
            const dg = Math.abs(dataBefore.data[i + 1] - dataAfter.data[i + 1]);
            const db = Math.abs(dataBefore.data[i + 2] - dataAfter.data[i + 2]);
            const diff = (dr + dg + db) / 3;

            if (diff > threshold) {
              // Magenta highlight for changed pixels
              diffImage.data[i] = 236;
              diffImage.data[i + 1] = 72;
              diffImage.data[i + 2] = 153;
              diffImage.data[i + 3] = 220;
              changedPixels++;
            } else {
              // Dim the unchanged pixels
              diffImage.data[i] = dataAfter.data[i];
              diffImage.data[i + 1] = dataAfter.data[i + 1];
              diffImage.data[i + 2] = dataAfter.data[i + 2];
              diffImage.data[i + 3] = 40;
            }
          }

          ctxDiff.putImageData(diffImage, 0, 0);
          if (!cancelled) {
            setDiffStats({
              changed: changedPixels,
              total: totalPixels,
              pct: ((changedPixels / totalPixels) * 100).toFixed(2),
            });
          }
        }

        // Setup overlay canvas for annotations
        const overlay = overlayCanvasRef.current;
        if (overlay) {
          overlay.width = width;
          overlay.height = height;
        }
      } catch {
        // Images may still be loading
      }
    }

    computeDiff();
    return () => { cancelled = true; };
  }, [beforeSrc, afterSrc, sensitivity]);

  // Draw annotation pins on overlay
  useEffect(() => {
    const overlay = overlayCanvasRef.current;
    if (!overlay) return;
    const ctx = overlay.getContext('2d')!;
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    annotations.forEach((ann, i) => {
      const pinNum = i + 1;
      const radius = 14;

      // Glow shadow
      ctx.beginPath();
      ctx.arc(ann.x, ann.y, radius + 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(236, 72, 153, 0.25)';
      ctx.fill();

      // Circle
      ctx.beginPath();
      ctx.arc(ann.x, ann.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(236, 72, 153, 0.95)';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Number
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(pinNum), ann.x, ann.y);
    });
  }, [annotations]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const displayCanvas =
      mode === 'diff-only'
        ? canvasDiffRef.current
        : mode === 'overlay'
          ? canvasAfterRef.current
          : null;

    const canvas = displayCanvas ?? canvasAfterRef.current;
    if (!canvas) return;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);

    const newAnnotation: Annotation = {
      id: `ann-${Date.now()}`,
      x,
      y,
      comment: '',
      author: mockUsers[0],
      createdAt: new Date().toISOString(),
    };
    onAddAnnotation(newAnnotation);
  };

  const displayStyle = canvasSize.width > 0
    ? { maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' as const }
    : {};

  const modeLabels: Record<ViewMode, string> = {
    'side-by-side': 'Side by Side',
    'overlay': 'Overlay',
    'diff-only': 'Diff Only',
  };

  const modeIcons: Record<ViewMode, React.ReactNode> = {
    'side-by-side': (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="18" rx="1" />
        <rect x="14" y="3" width="7" height="18" rx="1" />
      </svg>
    ),
    'overlay': (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="12" r="6" />
        <circle cx="15" cy="12" r="6" />
      </svg>
    ),
    'diff-only': (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  };

  return (
    <div className="pixel-diff" data-testid="pixel-diff">
      {/* Controls bar */}
      <div className="diff-controls">
        <div className="diff-modes">
          {(['side-by-side', 'overlay', 'diff-only'] as ViewMode[]).map((m) => (
            <button
              key={m}
              className={`diff-mode-btn ${mode === m ? 'active' : ''}`}
              onClick={() => setMode(m)}
            >
              {modeIcons[m]}
              {modeLabels[m]}
            </button>
          ))}
        </div>

        <div className="diff-sensitivity">
          <label>
            <span className="sensitivity-label">Sensitivity</span>
            <span className="sensitivity-value">{sensitivity}%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
            />
          </label>
        </div>

        {diffStats && (
          <div className="diff-stats">
            <span className="stat">
              <strong>{diffStats.changed.toLocaleString()}</strong> px
            </span>
            <span className="stat-sep"></span>
            <span className="stat">
              <strong>{diffStats.pct}%</strong> diff
            </span>
          </div>
        )}
      </div>

      {/* Canvas area */}
      <div className="diff-viewport">
        {mode === 'side-by-side' && (
          <div className="diff-side-by-side" onClick={handleCanvasClick}>
            <div className="diff-panel">
              <span className="diff-panel-label">Before</span>
              <canvas ref={canvasBeforeRef} style={displayStyle} />
            </div>
            <div className="diff-panel">
              <span className="diff-panel-label diff-panel-label--after">After</span>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <canvas ref={canvasAfterRef} style={displayStyle} />
                <canvas
                  ref={overlayCanvasRef}
                  className="annotation-overlay"
                  style={displayStyle}
                />
              </div>
            </div>
          </div>
        )}

        {mode === 'overlay' && (
          <div className="diff-overlay-container" onClick={handleCanvasClick}>
            <div className="diff-overlay-stack" style={{ position: 'relative' }}>
              <canvas ref={canvasBeforeRef} style={displayStyle} />
              <canvas
                ref={canvasAfterRef}
                className="overlay-after"
                style={{
                  ...displayStyle,
                  opacity: sliderPos / 100,
                }}
              />
              <canvas
                ref={overlayCanvasRef}
                className="annotation-overlay"
                style={displayStyle}
              />
            </div>
            <div className="slider-control">
              <span className="slider-label">Before</span>
              <div className="slider-track">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="overlay-slider"
                />
                <span className="slider-value">{sliderPos}%</span>
              </div>
              <span className="slider-label">After</span>
            </div>
          </div>
        )}

        {mode === 'diff-only' && (
          <div className="diff-only-container" onClick={handleCanvasClick}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <canvas ref={canvasDiffRef} style={displayStyle} />
              <canvas
                ref={overlayCanvasRef}
                className="annotation-overlay"
                style={displayStyle}
              />
            </div>
            {/* Hidden canvases still needed for diff computation */}
            <canvas ref={canvasBeforeRef} style={{ display: 'none' }} />
            <canvas ref={canvasAfterRef} style={{ display: 'none' }} />
          </div>
        )}
      </div>

      <p className="diff-hint">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: 6 }}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        Click on the image to add annotation pins
      </p>
    </div>
  );
}
