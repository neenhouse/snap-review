import { useCallback, useRef, type DragEvent, type ChangeEvent } from 'react';
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
}: {
  label: string;
  image: string | null;
  onChange: (dataUrl: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    async (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
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

  return (
    <div
      className={`upload-zone ${image ? 'has-image' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
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
            Remove
          </button>
        </div>
      ) : (
        <div className="upload-placeholder">
          <div className="upload-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      <h2 className="upload-title">Upload Screenshots</h2>
      <p className="upload-subtitle">
        Upload a before and after screenshot to begin comparison.
      </p>
      <div className="upload-grid">
        <UploadZone label="Before" image={beforeImage} onChange={onBeforeChange} />
        <UploadZone label="After" image={afterImage} onChange={onAfterChange} />
      </div>
    </div>
  );
}
