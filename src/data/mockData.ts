
import { User, Ticket } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Ahmed Bennani",
    role: "Technicien Électricité",
    department: "Distribution Électrique",
    status: "available"
  },
  {
    id: "2",
    name: "Fatima Alaoui",
    role: "Technicienne Eau",
    department: "Distribution Eau",
    status: "busy"
  },
  {
    id: "3",
    name: "Mohamed Ouali",
    role: "Chef d'Équipe",
    department: "Maintenance",
    status: "available"
  },
  {
    id: "4",
    name: "Aicha Tazi",
    role: "Technicienne Réseau",
    department: "Infrastructure",
    status: "available"
  },
  {
    id: "5",
    name: "Youssef Idrissi",
    role: "Électricien Senior",
    department: "Distribution Électrique",
    status: "offline"
  },
  {
    id: "6",
    name: "Khadija Benjelloun",
    role: "Ingénieure Eau",
    department: "Distribution Eau",
    status: "available"
  },
  {
    id: "7",
    name: "Rachid Sekkat",
    role: "Technicien Maintenance",
    department: "Maintenance",
    status: "busy"
  },
  {
    id: "8",
    name: "Malika Fassi",
    role: "Contrôleuse Qualité",
    department: "Qualité",
    status: "available"
  },
  {
    id: "9",
    name: "Omar Berrada",
    role: "Technicien Compteurs",
    department: "Facturation",
    status: "available"
  },
  {
    id: "10",
    name: "Zineb Naciri",
    role: "Ingénieure Réseau",
    department: "Infrastructure",
    status: "available"
  },
  {
    id: "11",
    name: "Hassan Lamrani",
    role: "Chef de Secteur",
    department: "Exploitation",
    status: "busy"
  },
  {
    id: "12",
    name: "Samira Kettani",
    role: "Technicienne Urgence",
    department: "Interventions",
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
