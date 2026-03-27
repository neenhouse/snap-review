import { describe, it, expect } from 'vitest';
import {
  mockUsers,
  mockReviews,
  getStatusColor,
  getPriorityColor,
} from './mockData';

describe('mockData', () => {
  it('has 6 mock users', () => {
    expect(mockUsers).toHaveLength(6);
    expect(mockUsers[0].name).toBe('Alice Chen');
  });

  it('has 10 mock reviews', () => {
    expect(mockReviews).toHaveLength(10);
  });

  it('all reviews have required fields', () => {
    for (const review of mockReviews) {
      expect(review.id).toBeTruthy();
      expect(review.title).toBeTruthy();
      expect(review.assignee).toBeDefined();
      expect(['pending', 'in-review', 'approved', 'rejected']).toContain(
        review.status,
      );
      expect(['low', 'medium', 'high']).toContain(review.priority);
    }
  });

  it('getStatusColor returns correct colors', () => {
    expect(getStatusColor('approved')).toBe('var(--green)');
    expect(getStatusColor('rejected')).toBe('var(--red)');
    expect(getStatusColor('pending')).toBe('var(--yellow)');
    expect(getStatusColor('in-review')).toBe('var(--blue)');
  });

  it('getPriorityColor returns correct colors', () => {
    expect(getPriorityColor('high')).toBe('var(--red)');
    expect(getPriorityColor('medium')).toBe('var(--yellow)');
    expect(getPriorityColor('low')).toBe('var(--text-muted)');
  });
});
