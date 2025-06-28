
export interface User {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  status: 'available' | 'busy' | 'offline';
}

export interface Ticket {
  id: string;
  userId: string;
  userName: string;
  description: string;
  comment: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
}

export interface TicketStats {
  week: string;
  count: number;
}
