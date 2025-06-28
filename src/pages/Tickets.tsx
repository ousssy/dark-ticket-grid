
import { useState, useEffect } from "react";
import { Ticket } from "@/types";
import { loadTicketsFromStorage } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Clock, User, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  useEffect(() => {
    const loadedTickets = loadTicketsFromStorage();
    setTickets(loadedTickets);
    setFilteredTickets(loadedTickets);
  }, []);

  useEffect(() => {
    let filtered = tickets;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.userName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    // Filter by priority
    if (priorityFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'closed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return 'Ouvert';
      case 'in-progress':
        return 'En cours';
      case 'closed':
        return 'Fermé';
      default:
        return status;
    }
  };

  const getPriorityText = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'Urgente';
      case 'high':
        return 'Élevée';
      case 'medium':
        return 'Moyenne';
      case 'low':
        return 'Faible';
      default:
        return priority;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold gradient-text">Gestion des Tickets</h1>
        <p className="text-muted-foreground">
          Consultez et gérez tous les tickets d'intervention
        </p>
      </div>

      {/* Filters */}
      <div className="glass-effect rounded-xl p-6 space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold">Filtres</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-muted/50 border-border/50">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="open">Ouvert</SelectItem>
              <SelectItem value="in-progress">En cours</SelectItem>
              <SelectItem value="closed">Fermé</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority Filter */}
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="bg-muted/50 border-border/50">
              <SelectValue placeholder="Priorité" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="all">Toutes les priorités</SelectItem>
              <SelectItem value="urgent">Urgente</SelectItem>
              <SelectItem value="high">Élevée</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="low">Faible</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-accent">{tickets.length}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </div>
        <div className="glass-effect rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {tickets.filter(t => t.status === 'open').length}
          </div>
          <div className="text-sm text-muted-foreground">Ouverts</div>
        </div>
        <div className="glass-effect rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {tickets.filter(t => t.status === 'in-progress').length}
          </div>
          <div className="text-sm text-muted-foreground">En cours</div>
        </div>
        <div className="glass-effect rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">
            {tickets.filter(t => t.status === 'closed').length}
          </div>
          <div className="text-sm text-muted-foreground">Fermés</div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="glass-effect rounded-xl p-8 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun ticket trouvé</h3>
            <p className="text-muted-foreground">
              Modifiez vos critères de recherche pour voir plus de résultats.
            </p>
          </div>
        ) : (
          filteredTickets.map((ticket, index) => (
            <div 
              key={ticket.id} 
              className="glass-effect rounded-xl p-6 card-hover animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <Badge 
                          className={`${getStatusColor(ticket.status)} text-white border-0`}
                        >
                          {getStatusText(ticket.status)}
                        </Badge>
                        <Badge 
                          className={`${getPriorityColor(ticket.priority)} text-white border-0`}
                        >
                          {getPriorityText(ticket.priority)}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      #{ticket.id.slice(-8)}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {ticket.description}
                    </h3>
                    {ticket.comment && (
                      <p className="text-muted-foreground text-sm">
                        {ticket.comment}
                      </p>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{ticket.userName}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {format(new Date(ticket.createdAt), 'dd MMM yyyy à HH:mm', { locale: fr })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tickets;
