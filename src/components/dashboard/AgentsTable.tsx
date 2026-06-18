import { MoreHorizontal, Bot, CheckCircle2 } from "lucide-react";

const agents = [
  { id: 1, name: 'Support Engineer', status: 'Online', knowledge: '1.2 GB', channels: ['Website', 'Slack'], convos: '42K', speed: '240ms', owner: 'Alex M.', updated: '2m ago' },
  { id: 2, name: 'Sales SDR', status: 'Online', knowledge: '3.4 GB', channels: ['WhatsApp', 'Email'], convos: '18K', speed: '310ms', owner: 'Sarah J.', updated: '1h ago' },
  { id: 3, name: 'Data Analyst', status: 'Training', knowledge: '12 GB', channels: ['Internal API'], convos: '-', speed: '-', owner: 'Mike T.', updated: '5h ago' },
  { id: 4, name: 'Onboarding Agent', status: 'Offline', knowledge: '450 MB', channels: ['Website'], convos: '8K', speed: '190ms', owner: 'Emma W.', updated: '2d ago' },
];

export function AgentsTable() {
  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6 text-text-main">Active Agents</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead>
            <tr className="bg-surface-hover/50">
              <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">Agent</th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-text-muted">Status</th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-text-muted">Knowledge</th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-text-muted">Conversations</th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-text-muted">Speed</th>
              <th scope="col" className="px-3 py-3.5 text-left text-xs font-medium uppercase tracking-wider text-text-muted">Updated</th>
              <th scope="col" className="relative py-3.5 pl-3 pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-transparent">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-surface-hover/50 transition-colors">
                <td className="whitespace-nowrap py-4 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-text-main text-sm">{agent.name}</div>
                      <div className="text-xs text-text-muted">{agent.owner}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium 
                    ${agent.status === 'Online' ? 'bg-success/10 text-success border border-success/20' : 
                      agent.status === 'Training' ? 'bg-warning/10 text-warning border border-warning/20' : 
                      'bg-text-muted/10 text-text-muted border border-text-muted/20'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      agent.status === 'Online' ? 'bg-success' : 
                      agent.status === 'Training' ? 'bg-warning animate-pulse' : 
                      'bg-text-muted'}`} 
                    />
                    {agent.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-text-secondary">{agent.knowledge}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-text-secondary">{agent.convos}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-text-secondary">{agent.speed}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-text-secondary">{agent.updated}</td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                  <button className="text-text-muted hover:text-text-main p-1 rounded-md hover:bg-surface-hover">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
