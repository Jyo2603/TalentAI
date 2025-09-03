import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral' | 'warning';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  onClick
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'warning': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} />;
      case 'down': return <TrendingDown size={16} />;
      default: return null;
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
            <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{value}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          {change && (
            <div className={`flex items-center space-x-1 text-xs font-medium ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{change}</span>
            </div>
          )}
        </div>
    </div>
  );
};