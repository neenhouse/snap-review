export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface Annotation {
  id: string;
  x: number;
  y: number;
  comment: string;
  author: User;
  createdAt: string;
}

export type Priority = 'low' | 'medium' | 'high';
export type ReviewStatus = 'pending' | 'in-review' | 'approved' | 'rejected';

export interface Review {
  id: string;
  title: string;
  beforeUrl: string;
  afterUrl: string;
  assignee: User;
  reporter: User;
  status: ReviewStatus;
  priority: Priority;
  dueDate: string;
  annotations: Annotation[];
  createdAt: string;
  updatedAt: string;
}

export const mockUsers: User[] = [
  { id: 'u1', name: 'Alice Chen', avatar: 'AC', email: 'alice@snapreview.io' },
  { id: 'u2', name: 'Bob Martinez', avatar: 'BM', email: 'bob@snapreview.io' },
  { id: 'u3', name: 'Carol Patel', avatar: 'CP', email: 'carol@snapreview.io' },
  { id: 'u4', name: 'Dan Kim', avatar: 'DK', email: 'dan@snapreview.io' },
  { id: 'u5', name: 'Eve Larson', avatar: 'EL', email: 'eve@snapreview.io' },
  { id: 'u6', name: 'Frank Zhao', avatar: 'FZ', email: 'frank@snapreview.io' },
];

function makeAnnotations(count: number): Annotation[] {
  const annotations: Annotation[] = [];
  for (let i = 0; i < count; i++) {
    annotations.push({
      id: `a${i + 1}`,
      x: 100 + Math.floor(Math.random() * 500),
      y: 80 + Math.floor(Math.random() * 300),
      comment: `Annotation note #${i + 1}`,
      author: mockUsers[i % mockUsers.length],
      createdAt: new Date(2026, 2, 20 + i).toISOString(),
    });
  }
  return annotations;
}

export const mockReviews: Review[] = [
  {
    id: 'r1',
    title: 'Homepage hero redesign',
    beforeUrl: '',
    afterUrl: '',
    assignee: mockUsers[0],
    reporter: mockUsers[1],
    status: 'pending',
    priority: 'high',
    dueDate: '2026-04-01',
    annotations: makeAnnotations(3),
    createdAt: '2026-03-20T10:00:00Z',
    updatedAt: '2026-03-20T10:00:00Z',
  },
  {
    id: 'r2',
    title: 'Checkout flow button alignment',
    beforeUrl: '',
    afterUrl: '',
    assignee: mockUsers[1],
    reporter: mockUsers[0],
    status: 'in-review',
    priority: 'medium',
    dueDate: '2026-04-03',
    annotations: makeAnnotations(5),
    createdAt: '2026-03-19T09:00:00Z',
    updatedAt: '2026-03-21T14:30:00Z',
  },
  {
    id: 'r3',
    title: 'Dashboard sidebar spacing',
    beforeUrl: '',
    afterUrl: '',
    assignee: mockUsers[2],
    reporter: mockUsers[3],
    status: 'approved',
    priority: 'low',
    dueDate: '2026-03-28',
    annotations: makeAnnotations(1),
    createdAt: '2026-03-18T08:00:00Z',
    updatedAt: '2026-03-22T11:00:00Z',
  },
  {
    id: 'r4',
    title: 'Mobile nav menu overlap',
    beforeUrl: '',
    afterUrl: '',
    assignee: mockUsers[3],
    reporter: mockUsers[2],
    status: 'rejected',
    priority: 'high',
    dueDate: '2026-03-25',
    annotations: makeAnnotations(7),
    createdAt: '2026-03-17T12:00:00Z',
    updatedAt: '2026-03-23T09:45:00Z',
  },
  {
    id: 'r5',
    title: 'Settings page dark mode',
    beforeUrl: '',
    afterUrl: '',
    assignee: mockUsers[4],
    reporter: mockUsers[0],
    status: 'pending',
    priority: 'medium',
    dueDate: '2026-04-05',
    annotations: makeAnnotations(2),
    createdAt: '2026-03-21T15:00:00Z',
    updatedAt: '2026-03-21T15:00:00Z',
  },
  {
    id: 'r6',
    title: 'Profile avatar crop regression',
    beforeUrl: '',
    afterUrl: '',
    assignee: mockUsers[5],
    reporter: mockUsers[1],
    status: 'in-review',
    priority: 'high',
    dueDate: '2026-03-30',
    annotations: makeAnnotations(4),
    createdAt: '2026-03-16T11:00:00Z',
    updatedAt: '2026-03-24T08:20:00Z',
  },
  {
    id: 'r7',
    title: 'Footer link color contrast',
    beforeUrl: '',
    afterUrl: '',
    assignee: mockUsers[0],
    reporter: mockUsers[4],
    status: 'approved',
    priority: 'low',
    dueDate: '2026-03-27',
    annotations: makeAnnotations(0),
    createdAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-03-25T16:00:00Z',
  },
  {
    id: 'r8',
    title: 'Search results card layout',
    beforeUrl: '',
    afterUrl: '',
    assignee: mockUsers[2],
    reporter: mockUsers[5],
    status: 'pending',
    priority: 'medium',
    dueDate: '2026-04-08',
    annotations: makeAnnotations(6),
    createdAt: '2026-03-22T09:30:00Z',
    updatedAt: '2026-03-22T09:30:00Z',
  },
  {
    id: 'r9',
    title: 'Tooltip z-index issue on modal',
    beforeUrl: '',
    afterUrl: '',
    assignee: mockUsers[1],
    reporter: mockUsers[3],
    status: 'in-review',
    priority: 'low',
    dueDate: '2026-04-02',
    annotations: makeAnnotations(2),
    createdAt: '2026-03-14T13:00:00Z',
    updatedAt: '2026-03-26T10:10:00Z',
  },
  {
    id: 'r10',
    title: 'Login form responsive breakpoint',
    beforeUrl: '',
    afterUrl: '',
    assignee: mockUsers[4],
    reporter: mockUsers[2],
    status: 'rejected',
    priority: 'high',
    dueDate: '2026-03-26',
    annotations: makeAnnotations(8),
    createdAt: '2026-03-13T14:00:00Z',
    updatedAt: '2026-03-26T07:00:00Z',
  },
];

export function getStatusColor(status: ReviewStatus): string {
  switch (status) {
    case 'pending': return 'var(--yellow)';
    case 'in-review': return 'var(--blue)';
    case 'approved': return 'var(--green)';
    case 'rejected': return 'var(--red)';
  }
}

export function getPriorityColor(priority: Priority): string {
  switch (priority) {
    case 'low': return 'var(--text-muted)';
    case 'medium': return 'var(--yellow)';
    case 'high': return 'var(--red)';
  }
}
