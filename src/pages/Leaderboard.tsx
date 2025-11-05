import { Trophy, TrendingUp, Star, Zap } from "lucide-react";
import { LeaderboardCard } from "@/components/LeaderboardCard";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";

// Mock data for leaderboard
const mockLeaderboardData = [
  {
    rank: 1,
    user: {
      id: "1",
      username: "María González",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      bio: "Diseñadora UX apasionada por crear experiencias digitales memorables",
      points: 8500,
      is_premium: true,
      premium_tier: 'gold' as const,
    },
    followers: 47,
  },
  {
    rank: 2,
    user: {
      id: "2",
      username: "Carlos Ruiz",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      bio: "Emprendedor tech | Co-founder de 3 startups exitosas",
      points: 7800,
      is_premium: true,
      premium_tier: 'silver' as const,
    },
    followers: 42,
  },
  {
    rank: 3,
    user: {
      id: "3",
      username: "Ana Martínez",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      bio: "Desarrolladora Full Stack | Open source contributor",
      points: 7200,
      is_premium: true,
      premium_tier: 'bronze' as const,
    },
    followers: 38,
  },
  {
    rank: 4,
    user: {
      id: "4",
      username: "Luis Fernández",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
      bio: "Product Manager en BigTech | Mentor de startups",
      points: 6500,
      is_premium: true,
      premium_tier: 'silver' as const,
    },
    followers: 35,
  },
  {
    rank: 5,
    user: {
      id: "5",
      username: "Sofía López",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      bio: "Marketing Digital | Growth Hacker | Speaker",
      points: 6200,
      is_premium: true,
      premium_tier: 'bronze' as const,
    },
    followers: 31,
  },
  {
    rank: 6,
    user: {
      id: "6",
      username: "Diego Torres",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego",
      bio: "Ingeniero de Software | AI enthusiast",
      points: 5800,
      is_premium: false,
      premium_tier: null,
    },
    followers: 28,
  },
  {
    rank: 7,
    user: {
      id: "7",
      username: "Paula Castro",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paula",
      bio: "Content Creator | Influencer Tech",
      points: 5400,
      is_premium: false,
      premium_tier: null,
    },
    followers: 52,
  },
  {
    rank: 8,
    user: {
      id: "8",
      username: "Javier Ramírez",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Javier",
      bio: "Data Scientist | ML Engineer",
      points: 5100,
      is_premium: false,
      premium_tier: null,
    },
    followers: 24,
  },
  {
    rank: 9,
    user: {
      id: "9",
      username: "Carmen Díaz",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carmen",
      bio: "CEO & Founder | Angel Investor",
      points: 4900,
      is_premium: false,
      premium_tier: null,
    },
    followers: 45,
  },
  {
    rank: 10,
    user: {
      id: "10",
      username: "Roberto Silva",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
      bio: "Blockchain Developer | Web3 Pioneer",
      points: 4700,
      is_premium: false,
      premium_tier: null,
    },
    followers: 22,
  },
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="container max-w-4xl mx-auto px-4 pt-20">
        {/* Header */}
        <div className="text-center mb-8 mt-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Tabla Coquitos
          </h1>
          <p className="text-muted-foreground text-lg">
            Los usuarios más influyentes de la comunidad
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Usuarios</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="bg-yellow-500/10 p-3 rounded-lg">
              <Trophy className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Usuarios VIP</p>
              <p className="text-2xl font-bold">127</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <Star className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Puntos Totales</p>
              <p className="text-2xl font-bold">58.4K</p>
            </div>
          </div>
        </div>

        {/* Info sobre Multiplicadores VIP */}
        <Card className="mb-6 p-4 border-yellow-400/30 bg-gradient-to-r from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/10 dark:to-orange-900/10">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm mb-1">⚡ Multiplicadores VIP Activos</h3>
              <p className="text-xs text-muted-foreground">
                Los miembros VIP obtienen puntos más rápido: 
                <span className="font-semibold text-yellow-600"> Gold x3</span>, 
                <span className="font-semibold text-gray-600"> Silver x2</span>, 
                <span className="font-semibold text-orange-600"> Bronze x1.5</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Leaderboard List */}
        <div className="space-y-3">
          {mockLeaderboardData.map((entry) => (
            <LeaderboardCard
              key={entry.user.id}
              rank={entry.rank}
              user={entry.user}
              followers={entry.followers}
            />
          ))}
        </div>

        {/* Info Footer */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center text-sm text-muted-foreground">
          <p>
            Los puntos se calculan basándose en la actividad: publicaciones, reacciones recibidas,
            comentarios y participantes en ideas. ¡Sigue creando contenido valioso para subir en el ranking! 🚀
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Leaderboard;
