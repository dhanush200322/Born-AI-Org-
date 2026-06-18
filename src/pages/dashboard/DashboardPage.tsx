import { Sparkles, Plus, Download, ChevronRight, HardDrive, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KpiSection } from "../../components/dashboard/KpiSection";
import { AgentsTable } from "../../components/dashboard/AgentsTable";
import { KnowledgeHub } from "../../components/dashboard/KnowledgeHub";

export function DashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
            Welcome back <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="mt-2 text-lg text-text-secondary max-w-2xl">
            Build, train, deploy, and monitor AI agents from one intelligent platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-text-main bg-surface hover:bg-surface-hover border border-border rounded-xl transition-colors">
            Import Knowledge
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 shadow-[0_0_15px_-3px_rgba(91,140,255,0.4)] rounded-xl transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Agent
          </button>
        </div>
      </div>

      {/* KPIs */}
      <KpiSection />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Agents Table */}
           <AgentsTable />
           
           {/* Knowledge Hub */}
           <KnowledgeHub />
           
           {/* Workflow Builder Teaser */}
           <div className="rounded-2xl border border-border bg-surface p-8 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none transition-transform group-hover:scale-110" />
             <div className="relative z-10 max-w-md">
               <h3 className="text-xl font-bold text-text-main mb-2">Workflow Builder</h3>
               <p className="text-text-secondary mb-6">Create complex reasoning paths and multi-agent systems using our visual node editor.</p>
               <button className="px-5 py-2.5 text-sm font-medium text-white bg-surface-hover border border-border rounded-xl transition-colors hover:border-primary/50 flex items-center gap-2 group/btn relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                 Open Canvas <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform relative z-10" />
               </button>
             </div>
             {/* Mock visual nodes */}
             <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block select-none pointer-events-none">
                <div className="flex items-center gap-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface/80 to-surface z-10 pointer-events-none" />
                  <div className="w-24 h-16 bg-surface-hover border border-border rounded-xl flex items-center justify-center shadow-lg"><MessageSquare className="w-5 h-5 text-text-muted" /></div>
                  <div className="w-8 h-[2px] bg-border relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-border" /></div>
                  <div className="w-24 h-16 bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_-3px_rgba(91,140,255,0.2)]"><Sparkles className="w-5 h-5 text-primary" /></div>
                  <div className="w-8 h-[2px] bg-border relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-border" /></div>
                  <div className="w-24 h-16 bg-surface-hover border border-border rounded-xl flex items-center justify-center shadow-lg"><HardDrive className="w-5 h-5 text-text-muted" /></div>
                </div>
             </div>
           </div>
        </div>
        
        <div className="space-y-8">
          {/* Right Panel - Memory & Context */}
          <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="p-6 border-b border-border bg-surface-hover/30">
              <h3 className="text-base font-semibold text-text-main mb-1">Memory Center</h3>
              <p className="text-xs text-text-muted">Context window usage across all agents</p>
            </div>
            <div className="p-6">
              <div className="flex items-end justify-between font-medium mb-2">
                <span className="text-text-main text-sm">Active Session Context</span>
                <span className="text-primary text-sm">64%</span>
              </div>
              <div className="h-2 w-full bg-surface-hover rounded-full overflow-hidden mb-6">
                 <div className="h-full bg-primary rounded-full" style={{ width: '64%' }}></div>
              </div>
              
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Short-term Memory</span>
                    <span className="text-sm font-medium text-text-main">1.2M tokens</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Long-term Memory</span>
                    <span className="text-sm font-medium text-text-main">8.4B vectors</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Cache Hit Rate</span>
                    <span className="text-sm font-medium text-success">98.2%</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-base font-semibold text-text-main mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[
                { time: '10m ago', text: 'Alex deployed Support Engineer v2.1', icon: Sparkles, color: 'text-primary', bg: 'bg-primary/10' },
                { time: '1h ago', text: 'Stripe Knowledge Base sync completed', icon: Download, color: 'text-success', bg: 'bg-success/10' },
                { time: '3h ago', text: 'API usage threshold reached (80%)', icon: Plus, color: 'text-warning', bg: 'bg-warning/10' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-text-main font-medium">{item.text}</p>
                    <p className="text-xs text-text-muted mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm text-text-muted hover:text-text-main border-t border-border transition-colors">
              View all activity
            </button>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-6 relative overflow-hidden group hover:border-primary/40 transition-colors">
            <div className="relative z-10">
              <Sparkles className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-base font-semibold text-text-main mb-2">Upgrade to Enterprise</h3>
              <p className="text-sm text-text-secondary mb-4">Get custom LLM fine-tuning, SOC2 compliance, and unlimited automations.</p>
              <button className="w-full px-4 py-2 text-sm font-medium text-brand-950 bg-white hover:bg-gray-100 rounded-xl transition-colors shadow-sm">
                Contact Sales
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/30 transition-colors" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-secondary/30 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}
