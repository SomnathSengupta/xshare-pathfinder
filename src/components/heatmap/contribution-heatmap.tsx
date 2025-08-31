import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContributionData {
  date: string;
  count: number;
}

interface ContributionHeatmapProps {
  data: ContributionData[];
  year?: number;
  className?: string;
}

const ContributionHeatmap = ({ data, year = new Date().getFullYear(), className }: ContributionHeatmapProps) => {
  const { weeks, maxCount, totalContributions } = useMemo(() => {
    // Create a map for quick lookup
    const contributionMap = new Map(data.map(d => [d.date, d.count]));
    
    // Get first day of year and calculate weeks
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    
    // Adjust start date to Sunday
    const startDay = startDate.getDay();
    const adjustedStart = new Date(startDate);
    adjustedStart.setDate(startDate.getDate() - startDay);
    
    const weeks: Array<Array<{ date: Date; count: number; isCurrentYear: boolean }>> = [];
    let currentDate = new Date(adjustedStart);
    let maxCount = 0;
    let totalContributions = 0;
    
    while (currentDate <= endDate || weeks.length < 53) {
      const week: Array<{ date: Date; count: number; isCurrentYear: boolean }> = [];
      
      for (let day = 0; day < 7; day++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const count = contributionMap.get(dateStr) || 0;
        const isCurrentYear = currentDate.getFullYear() === year;
        
        week.push({
          date: new Date(currentDate),
          count,
          isCurrentYear
        });
        
        if (isCurrentYear) {
          maxCount = Math.max(maxCount, count);
          totalContributions += count;
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      weeks.push(week);
      
      // Stop if we've passed the end of the year by a full week
      if (currentDate.getTime() > endDate.getTime() + (7 * 24 * 60 * 60 * 1000)) {
        break;
      }
    }
    
    return { weeks, maxCount, totalContributions };
  }, [data, year]);

  const getLevel = (count: number): number => {
    if (count === 0) return 0;
    if (maxCount <= 1) return count > 0 ? 4 : 0;
    
    const percentage = count / maxCount;
    if (percentage >= 0.75) return 4;
    if (percentage >= 0.5) return 3;
    if (percentage >= 0.25) return 2;
    return 1;
  };

  const getLevelClass = (level: number): string => {
    switch (level) {
      case 0: return 'heatmap-empty';
      case 1: return 'heatmap-level1';
      case 2: return 'heatmap-level2';
      case 3: return 'heatmap-level3';
      case 4: return 'heatmap-level4';
      default: return 'heatmap-empty';
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const monthLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className={cn("card-hover", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>{totalContributions} contributions in {year}</span>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Less</span>
            <div className="flex space-x-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={cn(
                    "w-3 h-3 rounded-sm",
                    getLevelClass(level)
                  )}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </CardTitle>
        <CardDescription>
          Your contribution activity on XShare - sharing experiences, answering questions, and helping fellow students
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {/* Month labels */}
          <div className="flex">
            <div className="w-8" /> {/* Space for day labels */}
            <div className="flex-1 grid grid-cols-12 gap-1 text-xs text-muted-foreground">
              {monthLabels.map((month, index) => (
                <div key={month} className="text-center">
                  {month}
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap grid */}
          <div className="flex">
            {/* Day labels */}
            <div className="w-8 space-y-1">
              {dayLabels.map((day, index) => (
                index % 2 === 1 ? (
                  <div key={day} className="h-3 text-xs text-muted-foreground text-right pr-1 leading-3">
                    {day}
                  </div>
                ) : (
                  <div key={day} className="h-3" />
                )
              ))}
            </div>

            {/* Contribution squares */}
            <div className="flex-1 overflow-x-auto">
              <div className="inline-flex space-x-1" style={{ minWidth: 'fit-content' }}>
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="space-y-1">
                    {week.map((day, dayIndex) => {
                      const level = day.isCurrentYear ? getLevel(day.count) : 0;
                      return (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={cn(
                            "w-3 h-3 rounded-sm transition-all duration-200 hover:scale-110 cursor-pointer border border-transparent hover:border-primary/30",
                            getLevelClass(level),
                            !day.isCurrentYear && "opacity-30"
                          )}
                          title={`${formatDate(day.date)}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary stats */}
          <div className="flex flex-wrap gap-4 pt-4 text-sm text-muted-foreground border-t">
            <div>
              <span className="font-medium text-foreground">{totalContributions}</span> total contributions
            </div>
            <div>
              <span className="font-medium text-foreground">{data.filter(d => d.count > 0).length}</span> days active
            </div>
            <div>
              <span className="font-medium text-foreground">{Math.max(...data.map(d => d.count), 0)}</span> contributions on your best day
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContributionHeatmap;