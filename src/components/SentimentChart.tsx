import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "5 Stars", value: 45, color: "#059669" },
  { name: "4 Stars", value: 30, color: "#10B981" },
  { name: "3 Stars", value: 15, color: "#60A5FA" },
  { name: "2 Stars", value: 7, color: "#F59E0B" },
  { name: "1 Star", value: 3, color: "#DC2626" },
];

export const SentimentChart = () => {
  return (
    <Card className="p-6 animate-fade-up hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Rating Distribution</h2>
        <p className="text-sm text-muted-foreground">Last 30 days</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};