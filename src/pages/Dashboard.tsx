
import { useState, useEffect } from "react";
import { Ticket, TicketStats } from "@/types";
import { loadTicketsFromStorage } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { format, startOfWeek, endOfWeek, eachWeekOfInterval, subWeeks } from "date-fns";
import { fr } from "date-fns/locale";

const Dashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<TicketStats[]>([]);

  useEffect(() => {
    const loadedTickets = loadTicketsFromStorage();
    setTickets(loadedTickets);
    
    // Generate weekly stats
    const now = new Date();
    const eightWeeksAgo = subWeeks(now, 7);
    const weeks = eachWeekOfInterval({ start: eightWeeksAgo, end: now });
    
    const stats = weeks.map(weekStart => {
      const weekEnd = endOfWeek(weekStart);
      const weekTickets = loadedTickets.filter(ticket => {
        const ticketDate = new Date(ticket.createdAt);
        return ticketDate >= weekStart && ticketDate <= weekEnd;
      });
      
      return {
        week: format(weekStart, 'dd/MM', { locale: fr }),
        count: weekTickets.length
      };
    });
    
    setWeeklyStats(stats);
  }, []);

  const statusData = [
    { name: 'Ouverts', value: tickets.filter(t => t.status === 'open').length, color: '#3b82f6' },
    { name: 'En cours', value: tickets.filter(t => t.status === 'in-progress').length, color: '#eab308' },
    { name: 'Fermés', value: tickets.filter(t => t.status === 'closed').length, color: '#22c55e' },
  ];

  const priorityData = [
    { name: 'Urgente', value: tickets.filter(t => t.priority === 'urgent').length, color: '#ef4444' },
    { name: 'Élevée', value: tickets.filter(t => t.priority === 'high').length, color: '#f97316' },
    { name: 'Moyenne', value: tickets.filter(t => t.priority === 'medium').length, color: '#eab308' },
    { name: 'Faible', value: tickets.filter(t => t.priority === 'low').length, color: '#22c55e' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de l'activité des tickets d'intervention
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-effect rounded-xl p-6 text-center card-hover">
          <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-lg mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-accent" />
          </div>
          <div className="text-2xl font-bold text-foreground">{tickets.length}</div>
          <div className="text-sm text-muted-foreground">Total Tickets</div>
        </div>

        <div className="glass-effect rounded-xl p-6 text-center card-hover">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-4">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {tickets.filter(t => t.status === 'open').length}
          </div>
          <div className="text-sm text-muted-foreground">Tickets Ouverts</div>
        </div>

        <div className="glass-effect rounded-xl p-6 text-center card-hover">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-lg mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {tickets.filter(t => t.status === 'in-progress').length}
          </div>
          <div className="text-sm text-muted-foreground">En Traitement</div>
        </div>

        <div className="glass-effect rounded-xl p-6 text-center card-hover">
          <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">
            {tickets.filter(t => t.status === 'closed').length}
          </div>
          <div className="text-sm text-muted-foreground">Tickets Fermés</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Chart */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span>Tickets par Semaine</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="week" 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  axisLine={{ stroke: '#374151' }}
                />
                <YAxis 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  axisLine={{ stroke: '#374151' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="url(#gradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            <span>Distribution par Statut</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-accent" />
          <span>Distribution par Priorité</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {priorityData.map((item, index) => (
            <div key={index} className="bg-muted/20 rounded-lg p-4 text-center">
              <div 
                className="w-8 h-8 rounded-full mx-auto mb-2"
                style={{ backgroundColor: item.color }}
              />
              <div className="text-xl font-bold" style={{ color: item.color }}>
                {item.value}
              </div>
              <div className="text-sm text-muted-foreground">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
