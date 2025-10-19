import React from 'react';
import { TrendingUp } from 'lucide-react';

import { StatisticDto } from '@/constants/interfaces';
import { statistics } from '@/constants/statistics';

interface StatisticsCardProps {
  statistic: StatisticDto;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ statistic }) => {
  const { name, value, goal, unit } = statistic;

  // Calculate percentage of progress if there is a goal
  const percentage = goal && goal > 0 ? Math.min((value / goal) * 100) : 100;
  const hasGoal = goal && goal > 0;

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-card dark:bg-dk_card shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-text dark:text-dk_text">
          {statistics.find((stat) => stat.value === name)?.label || name}
        </h3>
        <div className="flex text-primary dark:text-dk_primary">
          <TrendingUp size={18} />
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-primary dark:text-dk_primary">
          {value.toLocaleString()}
        </span>
        {unit && (
          <span className="text-lg text-gray-600 dark:text-gray-400">
            {unit}
          </span>
        )}
      </div>

      {/* Meta y progreso */}
      {hasGoal && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Meta:</span>
            <span className="font-semibold text-text dark:text-dk_text">
              {goal.toLocaleString()} {unit}
            </span>
          </div>

          {/* Barra de progreso */}
          <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-primary dark:bg-dk_primary transition-all duration-300 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Porcentaje */}
          <div className="flex items-center justify-end">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {percentage.toFixed(0)}% completado
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsCard;
