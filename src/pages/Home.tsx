
import { useState } from "react";
import { User, Ticket } from "@/types";
import { mockUsers, loadTicketsFromStorage, saveTicketsToStorage } from "@/data/mockData";
import UserCard from "@/components/UserCard";
import TicketModal from "@/components/TicketModal";
import { Users, Sparkles } from "lucide-react";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTicket = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    const tickets = loadTicketsFromStorage();
    const newTicket: Ticket = {
      ...ticketData,
      id: `ticket-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    tickets.unshift(newTicket);
    saveTicketsToStorage(tickets);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="w-8 h-8 text-accent" />
          <h1 className="text-4xl font-bold gradient-text">
            Centre d'Intervention
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Sélectionnez un intervenant pour créer un nouveau ticket d'intervention
        </p>
      </div>

      {/* Stats */}
      <div className="glass-effect rounded-xl p-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Users className="w-5 h-5 text-accent" />
          <span className="text-2xl font-bold">{mockUsers.length}</span>
        </div>
        <p className="text-muted-foreground">Intervenants disponibles</p>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockUsers.map((user, index) => (
          <div 
            key={user.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <UserCard
              user={user}
              onCreateTicket={handleCreateTicket}
            />
          </div>
        ))}
      </div>

      {/* Ticket Modal */}
      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveTicket}
      />
    </div>
  );
};

export default Home;
