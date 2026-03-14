import { Gift, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoyaltyBadgeProps {
  points?: number;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
}

const tierColors = {
  bronze: 'from-orange-400 to-amber-600',
  silver: 'from-gray-300 to-gray-500',
  gold: 'from-amber-400 to-yellow-500',
  platinum: 'from-purple-400 to-indigo-500',
};

const LoyaltyBadge = ({ points = 2350, tier = 'gold' }: LoyaltyBadgeProps) => {
  return (
    <Link
      to="/dashboard"
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${tierColors[tier]} text-white text-xs font-semibold hover:shadow-gold transition-all hover:scale-105`}
      title={`${tier.charAt(0).toUpperCase() + tier.slice(1)} Member - ${points} points`}
    >
      {tier === 'gold' || tier === 'platinum' ? (
        <Star className="h-3.5 w-3.5 fill-current" />
      ) : (
        <Gift className="h-3.5 w-3.5" />
      )}
      <span>{points.toLocaleString()}</span>
    </Link>
  );
};

export default LoyaltyBadge;
