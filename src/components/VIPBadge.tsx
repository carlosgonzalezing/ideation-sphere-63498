import { Crown } from "lucide-react";

interface VIPBadgeProps {
  tier: 'gold' | 'silver' | 'bronze';
}

export const VIPBadge = ({ tier }: VIPBadgeProps) => {
  const colors = {
    gold: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600',
    silver: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500',
    bronze: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600',
  };

  return (
    <div className={`absolute bottom-0 right-0 ${colors[tier]} text-white text-[10px] font-bold px-2 py-1 rounded-tl-lg flex items-center gap-1 shadow-lg`}>
      <Crown className="h-3 w-3" />
      VIP
    </div>
  );
};
