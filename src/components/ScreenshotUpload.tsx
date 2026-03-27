import { useCallback, useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import './ScreenshotUpload.css';

interface Props {
  beforeImage: string | null;
  afterImage: string | null;
  onBeforeChange: (dataUrl: string | null) => void;
  onAfterChange: (dataUrl: string | null) => void;
}

function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > 10 * 1024 * 1024) {
      reject(new Error('File exceeds 10 MB limit'));
      return;
    }
    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      reject(new Error('Unsupported format. Use PNG, JPEG, or WebP.'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

function UploadZone({
  label,
  image,
  onChange,
  variant,
}: {
  label: string;
  image: string | null;
  onChange: (dataUrl: string | null) => void;
  variant: 'before' | 'after';
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    async (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        try {
          const dataUrl = await readFile(file);
          onChange(dataUrl);
        } catch (err) {
          alert((err as Error).message);
        }
      }
    },
    [onChange],
  );

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        try {
          const dataUrl = await readFile(file);
          onChange(dataUrl);
        } catch (err) {
          alert((err as Error).message);
        }
      }
    },
    [onChange],
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const zoneClasses = [
    'upload-zone',
    image ? 'has-image' : '',
    isDragging ? 'is-dragging' : '',
    `upload-zone--${variant}`,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={zoneClasses}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onClick={() => !image && inputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label={`Upload ${label} image`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        className="sr-only"
        data-testid={`file-input-${label.toLowerCase()}`}
      />

      {image ? (
        <div className="upload-preview">
          <span className="upload-label">{label}</span>
          <img src={image} alt={`${label} screenshot`} className="upload-img" />
          <button
            className="upload-remove"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            aria-label={`Remove ${label} image`}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Remove
          </button>
        </div>
      ) : (
        <div className="upload-placeholder">
          <div className="upload-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <span className="upload-label-text">{label}</span>
          <span className="upload-hint">
            Drag &amp; drop or click to upload
          </span>
          <span className="upload-formats">PNG, JPEG, WebP (max 10 MB)</span>
        </div>
      )}
    </div>
  );
}

export default function ScreenshotUpload({
  beforeImage,
  afterImage,
  onBeforeChange,
  onAfterChange,
}: Props) {
  return (
    <div className="screenshot-upload" data-testid="screenshot-upload">
      <div className="upload-header">
        <div className="upload-header-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
        <h2 className="upload-title">Upload Screenshots</h2>
        <p className="upload-subtitle">
          Upload a before and after screenshot to begin comparison.
        </p>
      </div>
      <div className="upload-grid">
        <UploadZone label="Before" image={beforeImage} onChange={onBeforeChange} variant="before" />
        <div className="upload-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <UploadZone label="After" image={afterImage} onChange={onAfterChange} variant="after" />
      </div>
    </div>
  );
}
