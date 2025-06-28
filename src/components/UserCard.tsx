
import { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Circle } from "lucide-react";

interface UserCardProps {
  user: User;
  onCreateTicket: (user: User) => void;
}

const UserCard = ({ user, onCreateTicket }: UserCardProps) => {
  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'available':
        return 'text-green-400';
      case 'busy':
        return 'text-yellow-400';
      case 'offline':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = (status: User['status']) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'busy':
        return 'En intervention';
      case 'offline':
        return 'Indisponible';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="glass-effect rounded-xl p-6 card-hover animate-fade-in">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-blue-400 rounded-full flex items-center justify-center text-white text-xl font-semibold">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <Circle className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(user.status)} fill-current`} />
        </div>

        {/* Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-lg">{user.name}</h3>
          <p className="text-muted-foreground text-sm">{user.role}</p>
          <Badge variant="secondary" className="text-xs">
            {user.department}
          </Badge>
        </div>

        {/* Status */}
        <div className="flex items-center space-x-2 text-sm">
          <Circle className={`w-2 h-2 ${getStatusColor(user.status)} fill-current`} />
          <span className="text-muted-foreground">{getStatusText(user.status)}</span>
        </div>

        {/* Action Button */}
        <Button 
          onClick={() => onCreateTicket(user)}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 hover:shadow-lg hover:shadow-accent/20"
          disabled={user.status === 'offline'}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Créer une intervention
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
