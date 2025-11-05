import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Crown, Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VIPDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");

  const vipUsers = [
    {
      id: 1,
      name: "Alejandra Morales",
      role: "Ing. en Computación • MIT",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlejandraVIP",
      vipTier: "gold" as const,
      title: "Innovadora Serial",
      expertise: ["IA", "Startups", "Machine Learning"],
      bio: "3x founder. Apasionada por conectar talento con oportunidades. Siempre abierta a colaborar.",
    },
    {
      id: 2,
      name: "Daniel Ruiz",
      role: "Economía • Stanford",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DanielVIP",
      vipTier: "gold" as const,
      title: "Connector Elite",
      expertise: ["Fintech", "Inversión", "Networking"],
      bio: "Levantó $50K para su startup. Conecto emprendedores con inversores.",
    },
    {
      id: 3,
      name: "María González",
      role: "Diseño UX • Tec de Monterrey",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      vipTier: "gold" as const,
      title: "Rising Star",
      expertise: ["UX/UI", "Product Design", "Figma"],
      bio: "Diseño experiencias que enamoran. Trabajo remoto para startups internacionales.",
    },
    {
      id: 4,
      name: "Carlos Ruiz",
      role: "Ingeniería Software • UNAM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      vipTier: "silver" as const,
      title: "Mentor Destacado",
      expertise: ["Backend", "Cloud", "Microservicios"],
      bio: "Senior Engineer en Google. Mentor de desarrolladores junior.",
    },
    {
      id: 5,
      name: "Ana Martínez",
      role: "Full Stack • Universidad de Chile",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      vipTier: "silver" as const,
      title: "Open Source Contributor",
      expertise: ["React", "Node.js", "PostgreSQL"],
      bio: "Open source lover. 5K+ stars en GitHub. Siempre aprendiendo algo nuevo.",
    },
    {
      id: 6,
      name: "Luis Torres",
      role: "Data Science • MIT",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
      vipTier: "bronze" as const,
      title: "Rising Star",
      expertise: ["Python", "ML", "Deep Learning"],
      bio: "Investigador en IA. Publicando papers y construyendo el futuro.",
    },
  ];

  const filteredUsers = vipUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTier = tierFilter === "all" || user.vipTier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const getTierBadgeStyle = (tier: 'gold' | 'silver' | 'bronze') => {
    switch (tier) {
      case 'gold':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 'silver':
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 'bronze':
        return 'bg-gradient-to-r from-orange-400 to-orange-600';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />
      
      <main className="max-w-screen-xl mx-auto px-4 pt-24">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold">Directorio VIP</h1>
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0">
              Solo para miembros VIP
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            Conecta con otros miembros premium de la comunidad universitaria
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, expertise, universidad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={tierFilter} onValueChange={setTierFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tiers</SelectItem>
              <SelectItem value="gold">🥇 Gold</SelectItem>
              <SelectItem value="silver">🥈 Silver</SelectItem>
              <SelectItem value="bronze">🥉 Bronze</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid de Usuarios VIP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {filteredUsers.map((user) => (
            <Card 
              key={user.id} 
              className="p-5 border-l-4 border-l-yellow-400 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14 ring-2 ring-yellow-400/50 group-hover:ring-yellow-400 transition-all">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{user.name}</h3>
                    <Badge className={`text-[10px] px-2 py-0 ${getTierBadgeStyle(user.vipTier)} text-white border-0`}>
                      <Crown className="h-2.5 w-2.5 mr-0.5" />
                      VIP
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{user.role}</p>
                  <Badge variant="secondary" className="text-xs mb-2">{user.title}</Badge>
                  <p className="text-sm mb-3">{user.bio}</p>
                  <div className="flex flex-wrap gap-1">
                    {user.expertise.map((exp, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card className="p-12 text-center">
            <Crown className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">
              No se encontraron usuarios VIP con esos filtros
            </p>
          </Card>
        )}

        {/* CTA Footer */}
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-400/50 text-center mt-8">
          <h3 className="text-xl font-bold mb-2">¿No eres VIP aún?</h3>
          <p className="text-muted-foreground mb-4">
            Únete al círculo dorado y conecta con los mejores talentos universitarios
          </p>
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-base px-6 py-2 cursor-pointer hover:shadow-lg transition-all">
            Hazte VIP Ahora
          </Badge>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default VIPDirectory;
