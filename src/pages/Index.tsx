import { useState, useEffect } from "react";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { ProjectCard } from "@/components/ProjectCard";
import { QuickActions } from "@/components/QuickActions";
import { CreatePostPrompt } from "@/components/CreatePostPrompt";
import { SuggestedUsers } from "@/components/SuggestedUsers";
import { SuggestedGroups } from "@/components/SuggestedGroups";
import { Card } from "@/components/ui/card";
import { TrendingUp, Loader2 } from "lucide-react";
import { usePosts } from "@/hooks/usePosts";
import { useInView } from "react-intersection-observer";

type FilterType = "all" | "ideas" | "projects" | "events" | "teams";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = usePosts(activeFilter);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page.posts) || [];
  const projects = [
    // VIP GOLD - Post Destacado - IDEA
    {
      author: {
        name: "Alejandra Morales ⭐",
        role: "Ing. en Computación • MIT • Usuario VIP Gold",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlejandraVIP",
      },
      title: "🚀 Plataforma de IA para Optimizar Horarios Universitarios",
      description:
        "¿Cansado de horarios que se empalman? Estoy desarrollando una IA que crea el horario perfecto considerando tus preferencias, tiempo de traslado y carga académica. Ya tengo 3 universidades interesadas. Busco: 1 desarrollador Python, 1 especialista en ML, 1 diseñador UI/UX. Como VIP Gold tengo acceso prioritario a inversionistas. ¿Te unes? 💎",
      category: "Tecnología",
      type: "idea" as const,
      likes: 284,
      comments: 67,
      timeAgo: "Hace 45 min",
      participants: ["Alejandra Morales", "Diego Fernández", "Valentina Castro", "Miguel Herrera", "Sofia Mendez", "Luis Torres", "Carla Reyes"],
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop",
      isVipUser: true,
      vipTier: "gold" as const,
      isHighlighted: true,
    },
    
    // VIP SILVER - Post Destacado - TEXTO
    {
      author: {
        name: "Daniel Ruiz ⭐",
        role: "Economía • Stanford • Usuario VIP Silver",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DanielVIP",
      },
      title: "Conseguí mi primera inversión de $50K USD 💰",
      description:
        "Hace 3 meses era solo un estudiante con una idea. Hoy cerré mi primera ronda con un VC de Silicon Valley. El cambio clave fue hacerme VIP: acceso a eventos exclusivos, perfil destacado que vieron inversores y mentoría 1-a-1 con fundadores exitosos. A todos los que dudan si vale la pena: TOTALMENTE SÍ. La membresía se pagó sola en 2 semanas. Si están construyendo algo serio, háganlo. No es gasto, es inversión en ustedes. 🚀✨",
      category: "Emprendimiento",
      type: "text" as const,
      likes: 531,
      comments: 142,
      timeAgo: "Hace 1 hora",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop",
      isVipUser: true,
      vipTier: "silver" as const,
      isHighlighted: true,
    },

    // Usuario Normal
    {
      author: {
        name: "Emprendedores Tech UNAM",
        role: "Grupo • 342 miembros",
        avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=tech",
        isGroup: true,
      },
      title: "Meetup: Pitch Night este Viernes",
      description:
        "🎤 ¡Únete a nuestra noche de pitches! Estudiantes presentarán sus ideas de startup. Habrá networking, pizza y premios para las mejores presentaciones. Cupos limitados, regístrate en el link.",
      category: "Evento",
      type: "evento" as const,
      likes: 156,
      comments: 34,
      timeAgo: "Hace 2 horas",
      groupName: "Emprendedores Tech UNAM",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop",
    },

    // VIP GOLD - PROYECTO
    {
      author: {
        name: "Valentina Torres ⭐",
        role: "Bioinformática • Harvard • Usuario VIP Gold",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ValentinaVIP",
      },
      title: "Startup de Diagnóstico Médico con IA",
      description:
        "Desarrollamos un sistema de IA que detecta enfermedades raras a partir de imágenes médicas. Ya tenemos 2 hospitales piloto y estamos en conversaciones con 5 más. Buscamos CTO con experiencia en Computer Vision y Deep Learning. Financiamiento asegurado. Este es el momento de unirte a algo que salvará vidas. 🏥🤖",
      category: "Salud",
      type: "proyecto" as const,
      likes: 412,
      comments: 89,
      timeAgo: "Hace 2 horas",
      teamMembers: 6,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
      isVipUser: true,
      vipTier: "gold" as const,
      isHighlighted: true,
    },

    // Usuario Normal
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
      timeAgo: "Hace 3 horas",
    },

    // VIP SILVER - IDEA
    {
      author: {
        name: "Ricardo Mendoza ⭐",
        role: "Ing. de Software • Berkeley • Usuario VIP Silver",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RicardoVIP",
      },
      title: "App de Trading de NFTs Educativos",
      description:
        "Imagina un marketplace donde estudiantes crean y venden NFTs de sus mejores apuntes, proyectos y recursos. Los compradores obtienen acceso exclusivo a material de calidad verificado. Gamificación + blockchain + educación. Ya tengo el whitepaper y el smart contract. Busco: frontend dev (React), designer UI/UX. Los early adopters serán co-founders. 🎓⛓️",
      category: "Web3",
      type: "idea" as const,
      likes: 198,
      comments: 54,
      timeAgo: "Hace 3 horas",
      participants: ["Ricardo Mendoza", "Laura Kim", "Andrés Vargas", "Paula Santos"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop",
      isVipUser: true,
      vipTier: "silver" as const,
    },

    // VIP GOLD - TEXTO
    {
      author: {
        name: "María González ⭐",
        role: "Ingeniería en Sistemas • MIT • Usuario VIP Gold",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MariaVIP",
      },
      title: "Cómo pasé de 0 a 10K seguidores en LinkedIn en 3 meses",
      description:
        "Les comparto mi estrategia exacta: 1) Publicar valor diario (no selfies), 2) Comentar en posts de líderes de tu industria, 3) Crear contenido original con datos, 4) Ser consistente. Resultado: 10K seguidores, 5 ofertas de trabajo, 2 oportunidades de speaking. El networking digital es el nuevo currículum. Si quieren crecer en LinkedIn, DM y les paso mi guía completa gratis. 📈🔥",
      category: "Marketing Personal",
      type: "text" as const,
      likes: 723,
      comments: 201,
      timeAgo: "Hace 4 horas",
      isVipUser: true,
      vipTier: "gold" as const,
      isHighlighted: true,
    },

    // VIP BRONZE - PROYECTO
    {
      author: {
        name: "Carlos Ruiz ⭐",
        role: "Administración de Empresas • Tec • Usuario VIP Bronze",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosVIP",
      },
      title: "Startup de Sostenibilidad Urbana",
      description:
        "Proyecto en desarrollo para reducir residuos plásticos en universidades. Ya tenemos MVP funcionando y estamos escalando. Piloto en 3 campus, próximo objetivo: 10 más. Busco growth hacker y especialista en fundraising.",
      category: "Emprendimiento",
      type: "proyecto" as const,
      likes: 167,
      comments: 43,
      timeAgo: "Hace 5 horas",
      teamMembers: 8,
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop",
      isVipUser: true,
      vipTier: "bronze" as const,
    },

    // Usuario Normal
    {
      author: {
        name: "Sostenibilidad Campus",
        role: "Grupo • 203 miembros",
        avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=sustain",
        isGroup: true,
      },
      title: "Nueva iniciativa: Huertos Universitarios",
      description:
        "🌱 Estamos lanzando un proyecto para crear huertos comunitarios en el campus. Ya tenemos el apoyo de la facultad de Biología. Buscamos voluntarios y patrocinadores. ¡Ayúdanos a hacer más verde nuestra universidad!",
      category: "Sustentabilidad",
      type: "proyecto" as const,
      likes: 92,
      comments: 28,
      timeAgo: "Hace 6 horas",
      teamMembers: 15,
      groupName: "Sostenibilidad Campus",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop",
    },

    // VIP SILVER - IDEA
    {
      author: {
        name: "Sofia Ramírez ⭐",
        role: "Diseño UX • Stanford • Usuario VIP Silver",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SofiaVIP",
      },
      title: "Plataforma de Mentoría Estudiantil 1-on-1",
      description:
        "App que conecte estudiantes senior con juniors mediante matching por intereses, carrera y objetivos. Sistema de reputación, sesiones por video, y marketplace de servicios. Busco: React dev, backend (Node.js), y marketing growth. Ya tengo investor interesado para seed round. 🎯",
      category: "Tecnología",
      type: "idea" as const,
      likes: 245,
      comments: 78,
      timeAgo: "Hace 7 horas",
      participants: ["Sofia Ramírez", "Carlos Ruiz", "Ana Martínez", "Pedro López", "Laura Torres", "Diego Reyes"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop",
      isVipUser: true,
      vipTier: "silver" as const,
      isHighlighted: true,
    },

    // VIP GOLD - TEXTO MOTIVACIONAL
    {
      author: {
        name: "Roberto Sánchez ⭐",
        role: "Ingeniería Mecatrónica • MIT • Usuario VIP Gold",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RobertoVIP",
      },
      title: "Dejé mi trabajo de $120K para construir mi startup 🚀",
      description:
        "Hace 6 meses renuncié a Google. Todos dijeron que estaba loco. Hoy mi startup tiene 50K usuarios activos y revenue de $30K MRR. ¿Lo mejor? Trabajo en lo que amo, con mi propio horario, construyendo MI visión. No todo es color de rosa: hubo noches sin dormir, rechazos, y casi me quedo sin ahorros. Pero cada día valió la pena. Si tienes una idea que no te deja dormir, este es tu sign para empezar. La vida es una sola. 🔥💪",
      category: "Motivación",
      type: "text" as const,
      likes: 892,
      comments: 267,
      timeAgo: "Hace 8 horas",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop",
      isVipUser: true,
      vipTier: "gold" as const,
    },

    // Usuario Normal
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

    // VIP BRONZE - PROYECTO
    {
      author: {
        name: "Diego Fernández ⭐",
        role: "Ciencias de la Computación • UNAM • Usuario VIP Bronze",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DiegoVIP",
      },
      title: "Robot Asistente para Laboratorios Universitarios",
      description:
        "Proyecto en fase de prototipado. Robot móvil autónomo que ayuda en laboratorios: organiza materiales, asiste en experimentos y lleva registro automatizado. Presentando en competencia nacional el próximo mes. Busco sponsor y mentor en robótica avanzada. 🤖⚙️",
      category: "Robótica",
      type: "proyecto" as const,
      likes: 189,
      comments: 51,
      timeAgo: "Hace 1 día",
      teamMembers: 5,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop",
      isVipUser: true,
      vipTier: "bronze" as const,
    },
  ];

  const trending = [
    "IA en educación",
    "Fintech estudiantil",
    "Sostenibilidad",
    "Web3 y blockchain",
  ];

  const filteredProjects = projects;

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="max-w-screen-xl mx-auto pt-4">
        <div className="px-4 md:px-6">
          <QuickActions activeFilter={activeFilter} onFilterChange={setActiveFilter} />

          <CreatePostPrompt />

          <Card className="mb-4 p-4 border-border">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-sm text-foreground">Tendencias</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {trending.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-muted text-foreground rounded text-xs font-medium hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Card>

          <SuggestedUsers />

          <SuggestedGroups />

          {activeFilter !== "all" && (
            <div className="mb-4 flex items-center justify-between bg-primary/10 text-primary px-4 py-2 rounded">
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
        </div>

        <div className="space-y-0 mt-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : posts.length > 0 ? (
            <>
              {posts.map((post: any) => (
                <ProjectCard
                  key={post.id}
                  postId={post.id}
                  author={{
                    name: post.profiles?.username || 'Usuario',
                    role: post.profiles?.career || 'Estudiante',
                    avatar: post.profiles?.avatar_url || '',
                  }}
                  title={post.idea?.title || ''}
                  description={post.content || post.idea?.description || ''}
                  category={post.idea?.category || 'General'}
                  type={post.post_type}
                  likes={post.reactions_count || 0}
                  comments={post.comments_count || 0}
                  timeAgo={new Date(post.created_at).toLocaleDateString()}
                  image={post.media_url || undefined}
                  videoUrl={post.media_type === 'video' ? post.media_url : undefined}
                  userHasReacted={post.user_has_reacted}
                  userId={post.user_id}
                />
              ))}
              {hasNextPage && (
                <div ref={ref} className="flex justify-center py-8">
                  {isFetchingNextPage && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
                </div>
              )}
            </>
          ) : filteredProjects.length > 0 ? (
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
