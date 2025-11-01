import { useState } from "react";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { ProjectCard } from "@/components/ProjectCard";
import { QuickActions } from "@/components/QuickActions";
import { CreatePostPrompt } from "@/components/CreatePostPrompt";
import { SuggestedUsers } from "@/components/SuggestedUsers";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

type FilterType = "all" | "proyecto" | "equipo" | "idea" | "evento";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const projects = [
    {
      author: {
        name: "Juan Pérez",
        role: "Estudiante de Ingeniería • UNAM",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan",
      },
      title: "Reflexión sobre el futuro",
      description:
        "Hoy me di cuenta de que la mejor manera de predecir el futuro es creándolo. ¿Están listos para construir algo increíble juntos? 💡",
      category: "Reflexión",
      type: "text" as const,
      likes: 28,
      comments: 7,
      timeAgo: "Hace 30 min",
    },
    {
      author: {
        name: "María González",
        role: "Ingeniería en Sistemas • UNAM",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      },
      title: "App de Mentoría Estudiantil",
      description:
        "Busco desarrolladores y diseñadores para crear una app que conecte estudiantes senior con juniors. ¿Te unes al equipo?",
      category: "Tecnología",
      type: "idea" as const,
      likes: 45,
      comments: 12,
      timeAgo: "Hace 2 horas",
      participants: ["María González", "Carlos Ruiz", "Ana Martínez", "Pedro López", "Laura Torres"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop",
    },
    {
      author: {
        name: "Carlos Ruiz",
        role: "Administración de Empresas • Tec",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      },
      title: "Startup de Sostenibilidad Urbana",
      description:
        "Proyecto en desarrollo para reducir residuos plásticos en universidades. Ya tenemos MVP funcionando y estamos escalando.",
      category: "Emprendimiento",
      type: "proyecto" as const,
      likes: 67,
      comments: 23,
      timeAgo: "Hace 5 horas",
      teamMembers: 8,
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop",
    },
    {
      author: {
        name: "Ana Martínez",
        role: "Diseño Industrial • UAM",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      },
      title: "Plataforma de Freelance Universitario",
      description:
        "Idea: crear un marketplace donde estudiantes ofrezcan sus servicios (diseño, programación, tutorías). ¿Alguien se anima a co-fundar?",
      category: "Diseño",
      type: "idea" as const,
      likes: 34,
      comments: 8,
      timeAgo: "Hace 1 día",
      participants: ["Ana Martínez", "Pedro López", "Sofía Ramírez"],
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop",
    },
    {
      author: {
        name: "Roberto Sánchez",
        role: "Ingeniería Mecatrónica • IPN",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
      },
      title: "Robot Asistente para Laboratorios",
      description:
        "Proyecto en fase de prototipado. Robot móvil que ayuda en laboratorios universitarios. Presentando en competencia nacional próximamente.",
      category: "Tecnología",
      type: "proyecto" as const,
      likes: 89,
      comments: 31,
      timeAgo: "Hace 3 horas",
      teamMembers: 5,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop",
    },
  ];

  const trending = [
    "IA en educación",
    "Fintech estudiantil",
    "Sostenibilidad",
    "Web3 y blockchain",
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.type === activeFilter);

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="max-w-screen-xl mx-auto px-0 md:px-4 pt-4">
        <QuickActions activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        
        <CreatePostPrompt />

        <Card className="mb-4 mx-4 md:mx-0 p-4 border-border" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-foreground">Tendencias</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trending.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium hover:bg-primary/20 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </Card>

        <SuggestedUsers />

        {activeFilter !== "all" && (
          <div className="mb-4 mx-4 md:mx-0 flex items-center justify-between bg-primary/10 text-primary px-4 py-2 rounded-lg">
            <p className="text-sm font-medium">
              Mostrando {filteredProjects.length} {filteredProjects.length === 1 ? "resultado" : "resultados"}
            </p>
            <button 
              onClick={() => setActiveFilter("all")}
              className="text-xs underline hover:no-underline"
            >
              Ver todo
            </button>
          </div>
        )}

        <div className="space-y-4 px-4 md:px-0">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No hay publicaciones de este tipo</p>
            </Card>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
