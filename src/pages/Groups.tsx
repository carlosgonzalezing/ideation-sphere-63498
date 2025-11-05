import { useState } from "react";
import { Plus, Search, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GroupCard } from "@/components/GroupCard";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock data for groups
const mockMyGroups = [
  {
    id: "1",
    name: "Emprendedores Tech",
    description: "Comunidad de emprendedores tecnológicos compartiendo ideas y experiencias",
    cover_image_url: "",
    category: "Tecnología",
    privacy: 'public' as const,
    member_count: 234,
    created_by: {
      username: "maria_dev",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    },
  },
  {
    id: "2",
    name: "Diseñadores UX/UI",
    description: "Grupo para diseñadores que buscan mejorar sus habilidades y compartir recursos",
    cover_image_url: "",
    category: "Diseño",
    privacy: 'private' as const,
    member_count: 156,
    created_by: {
      username: "carlos_design",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
  },
];

const mockRecommendedGroups = [
  {
    id: "3",
    name: "Startups Latam",
    description: "Red de startups latinoamericanas buscando escalar y conectar con inversores",
    cover_image_url: "",
    category: "Negocios",
    privacy: 'public' as const,
    member_count: 567,
    created_by: {
      username: "ana_ceo",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
  },
  {
    id: "4",
    name: "Desarrolladores Full Stack",
    description: "Espacio para compartir código, resolver dudas y colaborar en proyectos",
    cover_image_url: "",
    category: "Tecnología",
    privacy: 'public' as const,
    member_count: 789,
    created_by: {
      username: "luis_code",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
    },
  },
  {
    id: "5",
    name: "Marketing Digital Pro",
    description: "Estrategias, tips y tendencias de marketing digital para negocios",
    cover_image_url: "",
    category: "Marketing",
    privacy: 'public' as const,
    member_count: 423,
    created_by: {
      username: "sofia_mkt",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    },
  },
  {
    id: "6",
    name: "Inteligencia Artificial",
    description: "Explorando el futuro de la IA, machine learning y deep learning",
    cover_image_url: "",
    category: "Tecnología",
    privacy: 'public' as const,
    member_count: 891,
    created_by: {
      username: "diego_ai",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diego",
    },
  },
];

const Groups = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="container max-w-6xl mx-auto px-4 pt-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 mt-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Grupos</h1>
            <p className="text-muted-foreground">
              Conecta con comunidades que comparten tus intereses
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Crear Grupo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Grupo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="group-name">Nombre del Grupo</Label>
                  <Input id="group-name" placeholder="Ej: Emprendedores Tech" />
                </div>
                <div>
                  <Label htmlFor="group-description">Descripción</Label>
                  <Textarea 
                    id="group-description" 
                    placeholder="Describe de qué trata el grupo..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="group-category">Categoría</Label>
                  <Select>
                    <SelectTrigger id="group-category">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tecnologia">Tecnología</SelectItem>
                      <SelectItem value="diseno">Diseño</SelectItem>
                      <SelectItem value="negocios">Negocios</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="educacion">Educación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Privacidad</Label>
                  <RadioGroup defaultValue="public" className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public" className="font-normal cursor-pointer">
                        Público - Cualquiera puede unirse
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private" className="font-normal cursor-pointer">
                        Privado - Requiere aprobación
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="secret" id="secret" />
                      <Label htmlFor="secret" className="font-normal cursor-pointer">
                        Secreto - Solo por invitación
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button className="w-full" onClick={() => setIsCreateDialogOpen(false)}>
                  Crear Grupo
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar grupos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="my-groups" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="my-groups" className="gap-2">
              <Users className="h-4 w-4" />
              Mis Grupos ({mockMyGroups.length})
            </TabsTrigger>
            <TabsTrigger value="discover" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Descubrir
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-groups">
            {mockMyGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockMyGroups.map((group) => (
                  <GroupCard key={group.id} group={group} isMember={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Aún no eres miembro de ningún grupo
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  Crear tu Primer Grupo
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="discover">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockRecommendedGroups.map((group) => (
                <GroupCard key={group.id} group={group} isMember={false} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Groups;
