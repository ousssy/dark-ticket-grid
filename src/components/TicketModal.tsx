
import { useState } from "react";
import { User, Ticket } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Ticket as TicketIcon, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const TicketModal = ({ isOpen, onClose, user, onSave }: TicketModalProps) => {
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [priority, setPriority] = useState<Ticket['priority']>("medium");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !description.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const ticketData = {
      userId: user.id,
      userName: user.name,
      description: description.trim(),
      comment: comment.trim(),
      status: 'open' as const,
      priority,
    };

    onSave(ticketData);
    
    // Reset form
    setDescription("");
    setComment("");
    setPriority("medium");
    
    toast({
      title: "Ticket créé",
      description: `Le ticket pour ${user.name} a été créé avec succès.`,
    });
    
    onClose();
  };

  const handleClose = () => {
    setDescription("");
    setComment("");
    setPriority("medium");
    onClose();
  };

  if (!user) return null;

  const getPriorityColor = (priority: string) => {
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <TicketIcon className="w-5 h-5 text-accent" />
            <span>Nouveau Ticket</span>
          </DialogTitle>
        </DialogHeader>

        {/* User Info */}
        <div className="glass-effect rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h4 className="font-medium">{user.name}</h4>
              <p className="text-sm text-muted-foreground">{user.role}</p>
            </div>
            <Badge variant="secondary" className="ml-auto">
              {user.department}
            </Badge>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description de la tâche *
            </Label>
            <Textarea
              id="description"
              placeholder="Décrivez la tâche ou le problème à résoudre..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] resize-none bg-muted/50 border-border/50 focus:border-accent/50"
              required
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority" className="text-sm font-medium">
              Priorité
            </Label>
            <Select value={priority} onValueChange={(value: Ticket['priority']) => setPriority(value)}>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="low">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor('low')}`} />
                    <span>Faible</span>
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor('medium')}`} />
                    <span>Moyenne</span>
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor('high')}`} />
                    <span>Élevée</span>
                  </div>
                </SelectItem>
                <SelectItem value="urgent">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor('urgent')}`} />
                    <span>Urgente</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-sm font-medium">
              Commentaire
            </Label>
            <Textarea
              id="comment"
              placeholder="Ajoutez des détails supplémentaires si nécessaire..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[80px] resize-none bg-muted/50 border-border/50 focus:border-accent/50"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-border/50 hover:bg-muted/50"
            >
              <X className="w-4 h-4 mr-2" />
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Save className="w-4 h-4 mr-2" />
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
