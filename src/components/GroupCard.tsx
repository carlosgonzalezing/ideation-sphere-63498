import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, Lock, Globe, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GroupCardProps {
  group: {
    id: string;
    name: string;
    description: string;
    cover_image_url?: string;
    category: string;
    privacy: 'public' | 'private' | 'secret';
    member_count: number;
    created_by: {
      username: string;
      avatar_url: string;
    };
  };
  isMember?: boolean;
}

export const GroupCard = ({ group, isMember = false }: GroupCardProps) => {
  const navigate = useNavigate();

  const getPrivacyIcon = () => {
    switch (group.privacy) {
      case 'private':
        return <Lock className="h-3 w-3" />;
      case 'secret':
        return <EyeOff className="h-3 w-3" />;
      default:
        return <Globe className="h-3 w-3" />;
    }
  };

  const getPrivacyLabel = () => {
    switch (group.privacy) {
      case 'private':
        return 'Privado';
      case 'secret':
        return 'Secreto';
      default:
        return 'Público';
    }
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      onClick={() => navigate(`/groups/${group.id}`)}
    >
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 relative overflow-hidden">
        {group.cover_image_url ? (
          <img 
            src={group.cover_image_url} 
            alt={group.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">
            📁
          </div>
        )}
      </div>

      <CardContent className="pt-4 pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{group.name}</h3>
          <Badge variant="outline" className="gap-1 text-xs flex-shrink-0">
            {getPrivacyIcon()}
            {getPrivacyLabel()}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {group.description}
        </p>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-xs">
            {group.category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            {group.member_count} miembros
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={group.created_by.avatar_url} />
            <AvatarFallback>{group.created_by.username[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            @{group.created_by.username}
          </span>
        </div>

        <Button 
          size="sm" 
          variant={isMember ? "outline" : "default"}
          onClick={(e) => {
            e.stopPropagation();
            // Mock join/leave action
            console.log(isMember ? "Salir del grupo" : "Unirse al grupo");
          }}
        >
          {isMember ? "Miembro" : "Unirse"}
        </Button>
      </CardFooter>
    </Card>
  );
};
