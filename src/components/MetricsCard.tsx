import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  trendDirection?: "up" | "down" | "neutral";
}

export const MetricsCard = ({
  title,
  value,
  trend,
  icon,
  trendDirection = "neutral"
}: MetricsCardProps) => {
  return (
    <Card className="p-6 animate-fade-up hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {trend && (
            <p
              className={cn(
                "text-sm mt-1",
                trendDirection === "up" && "text-green-600",
                trendDirection === "down" && "text-red-600",
                trendDirection === "neutral" && "text-muted-foreground"
              )}
            >
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-full">
          {icon}
        </div>
      </div>
    </Card>
  );
};