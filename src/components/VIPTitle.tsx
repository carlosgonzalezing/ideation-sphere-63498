import { Badge } from "@/components/ui/badge";
import { Star, Zap, TrendingUp, Users } from "lucide-react";

interface VIPTitleProps {
  title: 'Innovador Serial' | 'Connector Elite' | 'Mentor Destacado' | 'Rising Star';
  size?: 'sm' | 'md' | 'lg';
}

export const VIPTitle = ({ title, size = 'md' }: VIPTitleProps) => {
  const titleConfig = {
    'Innovador Serial': {
      icon: Zap,
      gradient: 'from-yellow-400 via-orange-500 to-red-500',
      description: 'Ha lanzado 3+ proyectos exitosos',
    },
    'Connector Elite': {
      icon: Users,
      gradient: 'from-blue-400 via-purple-500 to-pink-500',
      description: 'Conectó 50+ personas con oportunidades',
    },
    'Mentor Destacado': {
      icon: Star,
      gradient: 'from-green-400 via-emerald-500 to-teal-500',
      description: 'Ayudó a 10+ estudiantes a crecer',
    },
    'Rising Star': {
      icon: TrendingUp,
      gradient: 'from-pink-400 via-rose-500 to-red-500',
      description: 'Top 5% en crecimiento este mes',
    },
  };

  const config = titleConfig[title];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  };

  return (
    <Badge 
      className={`bg-gradient-to-r ${config.gradient} text-white border-0 shadow-lg ${sizeClasses[size]} font-bold`}
      title={config.description}
    >
      <Icon className={`${iconSizes[size]} mr-1`} />
      {title}
    </Badge>
  );
};
