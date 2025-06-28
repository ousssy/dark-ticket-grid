
import { User, Ticket } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Ahmed Bennani",
    role: "Chef de Développement Commercial",
    department: "Développement Commercial",
    status: "available"
  },
  {
    id: "2",
    name: "Fatima Alaoui",
    role: "Responsable Clientèle Entreprises",
    department: "Développement Commercial",
    status: "busy"
  },
  {
    id: "3",
    name: "Mohamed Ouali",
    role: "Chargé de Développement",
    department: "Développement Commercial",
    status: "available"
  },
  {
    id: "4",
    name: "Aicha Tazi",
    role: "Analyste Commercial",
    department: "Développement Commercial",
    status: "available"
  },
  {
    id: "5",
    name: "Youssef Idrissi",
    role: "Conseiller Commercial Senior",
    department: "Développement Commercial",
    status: "offline"
  },
  {
    id: "6",
    name: "Khadija Benjelloun",
    role: "Gestionnaire Grands Comptes",
    department: "Développement Commercial",
    status: "available"
  },
  {
    id: "7",
    name: "Rachid Sekkat",
    role: "Chargé d'Affaires",
    department: "Développement Commercial",
    status: "busy"
  },
  {
    id: "8",
    name: "Malika Fassi",
    role: "Responsable Marketing",
    department: "Développement Commercial",
    status: "available"
  },
  {
    id: "9",
    name: "Omar Berrada",
    role: "Conseiller Commercial",
    department: "Développement Commercial",
    status: "available"
  },
  {
    id: "10",
    name: "Zineb Naciri",
    role: "Analyste Marché",
    department: "Développement Commercial",
    status: "available"
  },
  {
    id: "11",
    name: "Hassan Lamrani",
    role: "Responsable Partenariats",
    department: "Développement Commercial",
    status: "busy"
  },
  {
    id: "12",
    name: "Samira Kettani",
    role: "Chargée Communication",
    department: "Développement Commercial",
    status: "available"
  }
];

export const loadTicketsFromStorage = (): Ticket[] => {
  const stored = localStorage.getItem('radema-tickets');
  return stored ? JSON.parse(stored) : [];
};

export const saveTicketsToStorage = (tickets: Ticket[]): void => {
  localStorage.setItem('radema-tickets', JSON.stringify(tickets));
};
