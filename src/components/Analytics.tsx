import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const barData = [
  { name: "Yaman", value: 45, time: "Evening" },
  { name: "Bhairav", value: 32, time: "Morning" },
  { name: "Malkauns", value: 28, time: "Night" },
  { name: "Bihag", value: 22, time: "Evening" },
  { name: "Todi", value: 18, time: "Afternoon" },
];

const lineData = [
  { time: "6AM", energy: 30, tempo: 60 },
  { time: "9AM", energy: 55, tempo: 80 },
  { time: "12PM", energy: 75, tempo: 100 },
  { time: "3PM", energy: 60, tempo: 85 },
  { time: "6PM", energy: 45, tempo: 70 },
  { time: "9PM", energy: 35, tempo: 55 },
];

const pieData = [
  { name: "Calm", value: 35, color: "hsl(180, 100%, 50%)" },
  { name: "Focused", value: 25, color: "hsl(270, 60%, 50%)" },
  { name: "Romantic", value: 20, color: "hsl(330, 100%, 70%)" },
  { name: "Energetic", value: 15, color: "hsl(45, 100%, 60%)" },
  { name: "Sad", value: 5, color: "hsl(240, 30%, 50%)" },
];

const Analytics = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-lg font-playfair font-semibold text-foreground">
        Your Music Analytics
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Most Played Raagas */}
        <div className="glass-strong rounded-3xl p-6">
          <h4 className="text-sm font-medium text-foreground mb-4">Most Played Raagas by Time</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} layout="vertical">
              <XAxis type="number" stroke="hsl(240, 20%, 60%)" fontSize={10} />
              <YAxis dataKey="name" type="category" stroke="hsl(240, 20%, 60%)" fontSize={10} width={60} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(240, 40%, 8%)', 
                  border: '1px solid hsl(240, 30%, 20%)',
                  borderRadius: '12px',
                  color: 'hsl(210, 40%, 98%)'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="url(#barGradient)" 
                radius={[0, 8, 8, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(180, 100%, 50%)" />
                  <stop offset="100%" stopColor="hsl(330, 100%, 70%)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Energy vs Tempo */}
        <div className="glass-strong rounded-3xl p-6">
          <h4 className="text-sm font-medium text-foreground mb-4">Energy vs Tempo Throughout Day</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <XAxis dataKey="time" stroke="hsl(240, 20%, 60%)" fontSize={10} />
              <YAxis stroke="hsl(240, 20%, 60%)" fontSize={10} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(240, 40%, 8%)', 
                  border: '1px solid hsl(240, 30%, 20%)',
                  borderRadius: '12px',
                  color: 'hsl(210, 40%, 98%)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="hsl(180, 100%, 50%)" 
                strokeWidth={2}
                dot={{ fill: 'hsl(180, 100%, 50%)', strokeWidth: 0, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="tempo" 
                stroke="hsl(330, 100%, 70%)" 
                strokeWidth={2}
                dot={{ fill: 'hsl(330, 100%, 70%)', strokeWidth: 0, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Energy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-glow" />
              <span className="text-xs text-muted-foreground">Tempo</span>
            </div>
          </div>
        </div>

        {/* Pie Chart - Mood Distribution */}
        <div className="glass-strong rounded-3xl p-6 lg:col-span-2">
          <h4 className="text-sm font-medium text-foreground mb-4">Mood Distribution Today</h4>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(240, 40%, 8%)', 
                    border: '1px solid hsl(240, 30%, 20%)',
                    borderRadius: '12px',
                    color: 'hsl(210, 40%, 98%)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-2 gap-3">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
