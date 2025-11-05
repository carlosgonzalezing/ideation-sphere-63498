import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, Volume2 } from "lucide-react";
import { VIPBadge } from "./VIPBadge";
import { useNavigate } from "react-router-dom";

interface LeaderboardCardProps {
  rank: number;
  user: {
    id: string;
    username: string;
    avatar_url: string;
    bio: string;
    points: number;
    is_premium: boolean;
    premium_tier: 'gold' | 'silver' | 'bronze' | null;
  };
  followers: number;
}

export const LeaderboardCard = ({ rank, user, followers }: LeaderboardCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const getRankColor = () => {
    if (rank === 1) return "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white";
    if (rank === 2) return "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-white";
    if (rank === 3) return "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white";
    return "bg-primary text-primary-foreground";
  };

  const getCardBackground = () => {
    if (rank <= 3) return "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20 border-yellow-300 dark:border-yellow-700";
    if (rank <= 10) return "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-300 dark:border-gray-700";
    return "bg-card border-border";
  };

  const getAvatarRing = () => {
    if (user.premium_tier === 'gold') return "ring-4 ring-yellow-400 ring-offset-2 ring-offset-background";
    if (user.premium_tier === 'silver') return "ring-4 ring-gray-300 ring-offset-2 ring-offset-background";
    if (user.premium_tier === 'bronze') return "ring-4 ring-orange-400 ring-offset-2 ring-offset-background";
    return "";
  };

  const playSound = () => {
    if (user.is_premium && isHovering) {
      // Mock sound effect
      console.log("🔊 VIP sound playing...");
    }
  };

  return (
    <Card
      className={`${getCardBackground()} cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
      onMouseEnter={() => {
        setIsHovering(true);
        playSound();
      }}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => navigate(`/profile/${user.username}`)}
    >
      <div className="p-4 flex items-center gap-4">
        {/* Rank Badge */}
        <div className={`flex-shrink-0 h-12 w-12 rounded-full ${getRankColor()} flex items-center justify-center font-bold text-lg shadow-lg`}>
          #{rank}
        </div>

        {/* Avatar with VIP badge */}
        <div className="relative flex-shrink-0">
          <Avatar className={`h-16 w-16 ${getAvatarRing()}`}>
            <AvatarImage src={user.avatar_url} alt={user.username} />
            <AvatarFallback>{user.username[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          {user.is_premium && user.premium_tier && (
            <VIPBadge tier={user.premium_tier} />
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg truncate">{user.username}</h3>
            {user.is_premium && (
              <Volume2 className={`h-4 w-4 ${isHovering ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
            )}
          </div>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <Zap className="h-3 w-3" />
                {user.points.toLocaleString()} pts
              </Badge>
              {user.is_premium && user.premium_tier && (
                <Badge className={`text-[10px] px-1.5 py-0 h-5 ${
                  user.premium_tier === 'gold' ? 'bg-yellow-500/20 text-yellow-600 border border-yellow-400' :
                  user.premium_tier === 'silver' ? 'bg-gray-400/20 text-gray-600 border border-gray-400' :
                  'bg-orange-500/20 text-orange-600 border border-orange-400'
                }`}>
                  {user.premium_tier === 'gold' ? 'x3' : user.premium_tier === 'silver' ? 'x2' : 'x1.5'}
                </Badge>
              )}
            </div>
            <Badge variant="outline" className="gap-1">
              <Users className="h-3 w-3" />
              {followers}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-1">
            {user.bio || "Sin descripción"}
          </p>
        </div>
      </div>
    </Card>
  );
};
