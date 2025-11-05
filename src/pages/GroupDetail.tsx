import { useState } from "react";
import { ArrowLeft, Users, Settings, UserPlus, MoreHorizontal, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { useNavigate, useParams } from "react-router-dom";

// Mock group data
const mockGroup = {
  id: "1",
  name: "Emprendedores Tech",
  description: "Comunidad de emprendedores tecnológicos compartiendo ideas, experiencias y oportunidades de negocio. Aquí encontrarás recursos, networking y apoyo para hacer crecer tu startup.",
  cover_image_url: "",
  category: "Tecnología",
  privacy: 'public' as const,
  member_count: 234,
  created_by: {
    username: "maria_dev",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  },
};

const mockMembers = [
  {
    id: "1",
    username: "maria_dev",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    role: "admin",
  },
  {
    id: "2",
    username: "carlos_code",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    role: "moderator",
  },
  {
    id: "3",
    username: "ana_design",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    role: "member",
  },
  {
    id: "4",
    username: "luis_startup",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
    role: "member",
  },
];

const GroupDetail = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [isMember, setIsMember] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="container max-w-6xl mx-auto px-4 pt-16">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-4 gap-2"
          onClick={() => navigate("/groups")}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Grupos
        </Button>

        {/* Group Header */}
        <div className="mb-6">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20 rounded-t-lg relative overflow-hidden">
            {mockGroup.cover_image_url ? (
              <img 
                src={mockGroup.cover_image_url} 
                alt={mockGroup.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl opacity-20">
                📁
              </div>
            )}
          </div>

          {/* Group Info */}
          <Card className="rounded-t-none">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{mockGroup.name}</h1>
                    <Badge variant="secondary">{mockGroup.category}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {mockGroup.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {mockGroup.member_count} miembros
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={mockGroup.created_by.avatar_url} />
                        <AvatarFallback>{mockGroup.created_by.username[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        Creado por @{mockGroup.created_by.username}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={isMember ? "outline" : "default"}
                    onClick={() => setIsMember(!isMember)}
                    className="gap-2"
                  >
                    {isMember ? (
                      <>
                        <Users className="h-4 w-4" />
                        Miembro
                      </>
                    ) : (
                      "Unirse"
                    )}
                  </Button>
                  <Button variant="outline" size="icon">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="posts">Publicaciones</TabsTrigger>
            <TabsTrigger value="members">Miembros ({mockMembers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div className="space-y-4">
              <div className="text-center py-12 text-muted-foreground">
                <p>Aún no hay publicaciones en este grupo</p>
                <p className="text-sm mt-2">Sé el primero en compartir algo</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="members">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockMembers.map((member) => (
                <Card key={member.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar_url} />
                          <AvatarFallback>{member.username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">@{member.username}</p>
                            {member.role === 'admin' && (
                              <Badge variant="default" className="text-xs gap-1">
                                <Crown className="h-3 w-3" />
                                Admin
                              </Badge>
                            )}
                            {member.role === 'moderator' && (
                              <Badge variant="secondary" className="text-xs">
                                Moderador
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default GroupDetail;
