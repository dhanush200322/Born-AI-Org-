import { ArrowUpRight, ArrowDownRight, Users, MessageSquare, Code, Cpu, Database, Activity, GitBranch } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

const data = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 6890 },
  { name: 'Sat', value: 4390 },
  { name: 'Sun', value: 6490 },
];

const stats = [
  { name: 'Total AI Agents', value: '12', change: '+20%', trend: 'up', icon: Cpu, color: 'text-primary' },
  { name: 'Knowledge Sources', value: '3,491', change: '+12%', trend: 'up', icon: Database, color: 'text-secondary' },
  { name: 'Messages Today', value: '84,293', change: '+34%', trend: 'up', icon: MessageSquare, color: 'text-accent' },
  { name: 'Automation Runs', value: '492,019', change: '-2%', trend: 'down', icon: GitBranch, color: 'text-warning' },
];

export function KpiSection() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div 
          key={stat.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm hover:bg-surface-hover transition-colors group"
        >
          <dt>
             <div className="absolute top-6 right-6 p-2 rounded-xl bg-surface border border-border group-hover:border-primary/30 transition-colors">
               <stat.icon className={`h-5 w-5 ${stat.color}`} aria-hidden="true" />
             </div>
             <p className="truncate text-sm font-medium text-text-muted">{stat.name}</p>
          </dt>
          <dd className="mt-4 flex items-baseline gap-x-3">
            <p className="text-3xl font-semibold tracking-tight text-text-main">{stat.value}</p>
            <p className={`flex items-baseline gap-1 text-sm font-medium ${
               stat.trend === 'up' ? 'text-success' : 'text-danger'
             }`}>
               {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
               {stat.change}
            </p>
          </dd>
          <div className="h-12 mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={stat.trend === 'up' ? 'var(--color-success)' : 'var(--color-danger)'} 
                  fillOpacity={0.1} 
                  fill={stat.trend === 'up' ? 'var(--color-success)' : 'var(--color-danger)'} 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
