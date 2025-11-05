import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Crown, TrendingUp, Zap, Users } from "lucide-react";

const TopInnovators = () => {
  const topInnovators = [
    {
      id: 1,
      name: "Alejandra Morales ⭐",
      role: "Ing. en Computación • MIT",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlejandraVIP",
      vipTier: "gold" as const,
      title: "Innovadora Serial",
      points: 8500,
      projects: 12,
      followers: "2.3K",
      impact: "Fundó 3 startups exitosas con inversión total de $2M",
    },
    {
      id: 2,
      name: "Daniel Ruiz",
      role: "Economía • Stanford",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DanielVIP",
      vipTier: "gold" as const,
      title: "Connector Elite",
      points: 8200,
      projects: 8,
      followers: "1.9K",
      impact: "Conectó 50+ estudiantes con oportunidades en FAANG",
    },
    {
      id: 3,
      name: "María González",
      role: "Diseño UX • Tec de Monterrey",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      vipTier: "gold" as const,
      title: "Rising Star",
      points: 7800,
      projects: 10,
      followers: "1.7K",
      impact: "Top 1% en crecimiento mensual, mentoría a 15 estudiantes",
    },
    {
      id: 4,
      name: "Carlos Ruiz",
      role: "Ingeniería Software • UNAM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      vipTier: "silver" as const,
      title: "Mentor Destacado",
      points: 7200,
      projects: 9,
      followers: "1.5K",
      impact: "Ayudó a 20+ estudiantes a conseguir su primer empleo tech",
    },
    {
      id: 5,
      name: "Ana Martínez",
      role: "Full Stack • Universidad de Chile",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      vipTier: "silver" as const,
      title: "Innovadora Serial",
      points: 6800,
      projects: 11,
      followers: "1.3K",
      impact: "Contribuidora open source con 5K+ GitHub stars",
    },
    {
      id: 6,
      name: "Luis Torres",
      role: "Data Science • MIT",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
      vipTier: "bronze" as const,
      title: "Rising Star",
      points: 6400,
      projects: 7,
      followers: "1.1K",
      impact: "Publicó 3 papers en conferencias internacionales",
    },
  ];

  const getTierGradient = (tier: 'gold' | 'silver' | 'bronze') => {
    switch (tier) {
      case 'gold':
        return 'from-yellow-400 to-yellow-600';
      case 'silver':
        return 'from-gray-300 to-gray-500';
      case 'bronze':
        return 'from-orange-400 to-orange-600';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />
      
      <main className="max-w-screen-xl mx-auto px-4 pt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Crown className="h-10 w-10 text-yellow-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
              Top Innovadores
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Los miembros VIP con mayor impacto en la comunidad
          </p>
          <Badge className="mt-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0">
            Solo usuarios VIP destacados
          </Badge>
        </div>

        {/* Grid de Innovadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {topInnovators.map((innovator) => (
            <Card 
              key={innovator.id} 
              className="p-6 border-2 border-yellow-400/30 hover:border-yellow-400 transition-all hover:shadow-xl cursor-pointer group"
            >
              <div className="flex items-start gap-4 mb-4">
                <Avatar className={`h-16 w-16 ring-4 ring-yellow-400/50 group-hover:ring-yellow-400 transition-all`}>
                  <AvatarImage src={innovator.avatar} />
                  <AvatarFallback>{innovator.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{innovator.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{innovator.role}</p>
                  <Badge className={`bg-gradient-to-r ${getTierGradient(innovator.vipTier)} text-white text-xs border-0`}>
                    <Crown className="h-3 w-3 mr-1" />
                    {innovator.title}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Puntos</span>
                  <span className="font-bold flex items-center gap-1">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    {innovator.points.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Proyectos</span>
                  <span className="font-bold flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    {innovator.projects}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Seguidores</span>
                  <span className="font-bold flex items-center gap-1">
                    <Users className="h-4 w-4 text-primary" />
                    {innovator.followers}
                  </span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground italic">
                  💡 {innovator.impact}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Card */}
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-400/50 text-center">
          <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">¿Quieres aparecer aquí?</h2>
          <p className="text-muted-foreground mb-4">
            Hazte VIP y destaca tus logros. Los mejores innovadores reciben reconocimiento especial.
          </p>
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-base px-6 py-2 cursor-pointer hover:shadow-lg transition-all">
            Conocer Planes VIP
          </Badge>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default TopInnovators;
