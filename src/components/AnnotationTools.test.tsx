import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AnnotationTools from './AnnotationTools';
import { mockUsers } from '../lib/mockData';
import type { Annotation } from '../lib/mockData';

const makeAnnotation = (id: string, comment: string): Annotation => ({
  id,
  x: 100,
  y: 200,
  comment,
  author: mockUsers[0],
  createdAt: new Date().toISOString(),
});

describe('AnnotationTools', () => {
  it('shows empty state when no annotations', () => {
    render(
      <AnnotationTools annotations={[]} onRemove={vi.fn()} onUpdate={vi.fn()} />,
    );

    expect(
      screen.getByText('Click on the image to add annotation pins.'),
    ).toBeInTheDocument();
  });

  it('renders annotation list with numbered pins', () => {
    const annotations = [
      makeAnnotation('a1', 'First comment'),
      makeAnnotation('a2', 'Second comment'),
    ];

    render(
      <AnnotationTools
        annotations={annotations}
        onRemove={vi.fn()}
        onUpdate={vi.fn()}
      />,
    );

    // Pin numbers are in .annotation-number elements
    const numbers = screen.getAllByText('1');
    expect(numbers.length).toBeGreaterThanOrEqual(1);
    const twos = screen.getAllByText('2');
    expect(twos.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('Second comment')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = vi.fn();
    const annotations = [makeAnnotation('a1', 'Test')];

    render(
      <AnnotationTools
        annotations={annotations}
        onRemove={onRemove}
        onUpdate={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByLabelText('Remove annotation 1'));
    expect(onRemove).toHaveBeenCalledWith('a1');
  });
});
