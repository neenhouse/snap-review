import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ScreenshotUpload from './ScreenshotUpload';

describe('ScreenshotUpload', () => {
  it('renders upload title and both upload zones', () => {
    render(
      <ScreenshotUpload
        beforeImage={null}
        afterImage={null}
        onBeforeChange={vi.fn()}
        onAfterChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Upload Screenshots')).toBeInTheDocument();
    expect(screen.getByText('Before')).toBeInTheDocument();
    expect(screen.getByText('After')).toBeInTheDocument();
  });

  it('shows preview when images are provided', () => {
    // Use a tiny valid data URL
    const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQABNjN9GQAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAA0lEQVQI12P4z8BQDwAEgAF/QualzQAAAABJRU5ErkJggg==';

    render(
      <ScreenshotUpload
        beforeImage={dataUrl}
        afterImage={null}
        onBeforeChange={vi.fn()}
        onAfterChange={vi.fn()}
      />,
    );

    // Should show the "BEFORE" label in the preview
    expect(screen.getByAltText('Before screenshot')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });
});
