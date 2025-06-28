
import { User, Ticket } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sophie Martin",
    role: "Développeuse Full-Stack",
    department: "IT",
    status: "available"
  },
  {
    id: "2", 
    name: "Pierre Dubois",
    role: "Administrateur Système",
    department: "Infrastructure",
    status: "busy"
  },
  {
    id: "3",
    name: "Marie Lefebvre",
    role: "UX/UI Designer",
    department: "Design",
    status: "available"
  },
  {
    id: "4",
    name: "Jean Moreau",
    role: "Chef de Projet",
    department: "Management",
    status: "available"
  },
  {
    id: "5",
    name: "Amélie Rousseau",
    role: "Développeuse Frontend",
    department: "IT",
    status: "offline"
  },
  {
    id: "6",
    name: "Thomas Bernard",
    role: "DevOps Engineer",
    department: "Infrastructure",
    status: "available"
  },
  {
    id: "7",
    name: "Claire Petit",
    role: "Analyste Métier",
    department: "Business",
    status: "busy"
  },
  {
    id: "8",
    name: "Nicolas Durand",
    role: "Tech Lead",
    department: "IT",
    status: "available"
  },
  {
    id: "9",
    name: "Lucie Moreau",
    role: "Product Owner",
    department: "Product",
    status: "available"
  },
  {
    id: "10",
    name: "Alexandre Roux",
    role: "Développeur Backend",
    department: "IT",
    status: "busy"
  },
  {
    id: "11",
    name: "Émilie Blanc",
    role: "QA Engineer",
    department: "Quality",
    status: "available"
  },
  {
    id: "12",
    name: "Julien Vincent",
    role: "Architecte Solution",
    department: "Architecture",
    status: "available"
  }
];

// Fonction pour générer des tickets d'exemple
export const generateMockTickets = (): Ticket[] => {
  const tickets: Ticket[] = [];
  const statuses: Ticket['status'][] = ['open', 'in-progress', 'closed'];
  const priorities: Ticket['priority'][] = ['low', 'medium', 'high', 'urgent'];
  
  // Générer des tickets pour les 8 dernières semaines
  for (let week = 0; week < 8; week++) {
    const ticketsThisWeek = Math.floor(Math.random() * 15) + 5; // 5-20 tickets par semaine
    
    for (let i = 0; i < ticketsThisWeek; i++) {
      const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const date = new Date();
      date.setDate(date.getDate() - (week * 7) - Math.floor(Math.random() * 7));
      
      tickets.push({
        id: `ticket-${week}-${i}`,
        userId: user.id,
        userName: user.name,
        description: `Ticket d'intervention ${week}-${i}`,
        comment: `Commentaire pour le ticket ${week}-${i}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        createdAt: date.toISOString(),
        updatedAt: date.toISOString()
      });
    }
  }
  
  return tickets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Stockage local
export const saveTicketsToStorage = (tickets: Ticket[]) => {
  localStorage.setItem('glpi-tickets', JSON.stringify(tickets));
};

export const loadTicketsFromStorage = (): Ticket[] => {
  const stored = localStorage.getItem('glpi-tickets');
  if (stored) {
    return JSON.parse(stored);
  }
  const mockTickets = generateMockTickets();
  saveTicketsToStorage(mockTickets);
  return mockTickets;
};
