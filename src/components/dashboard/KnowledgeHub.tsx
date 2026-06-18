import { FileText, FileSpreadsheet, Globe, Database, HardDrive, Layout, RefreshCw } from "lucide-react";

const sources = [
  { id: 1, name: 'Product Manuals', type: 'PDF', icon: FileText, color: 'text-danger', sync: 'Synced', chunks: '2,401', embeddings: 'Completed', lastSync: '10m ago' },
  { id: 2, name: 'Help Center Docs', type: 'Website', icon: Globe, color: 'text-primary', sync: 'Syncing', chunks: '18,492', embeddings: 'Processing', lastSync: 'In progress' },
  { id: 3, name: 'Support Tickets', type: 'CSV', icon: FileSpreadsheet, color: 'text-success', sync: 'Synced', chunks: '45,190', embeddings: 'Completed', lastSync: '1h ago' },
  { id: 4, name: 'Internal Wiki', type: 'Notion', icon: Layout, color: 'text-text-main', sync: 'Synced', chunks: '8,391', embeddings: 'Completed', lastSync: '5h ago' },
];

export function KnowledgeHub() {
  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="px-6 py-5 border-b border-border flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6 text-text-main">Knowledge Hub</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Sync All
        </button>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((source) => (
          <div key={source.id} className="p-4 rounded-xl border border-border bg-surface-hover/30 hover:bg-surface-hover transition-colors group">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
                 <source.icon className={`w-5 h-5 ${source.color}`} />
               </div>
               <div className="flex-1 min-w-0">
                 <h4 className="text-sm font-medium text-text-main truncate">{source.name}</h4>
                 <p className="text-xs text-text-muted mt-0.5">{source.type}</p>
               </div>
               <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium 
                  ${source.sync === 'Synced' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary animate-pulse'}`}>
                  {source.sync}
               </span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/50">
               <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Chunks</p>
                  <p className="text-sm font-medium text-text-main">{source.chunks}</p>
               </div>
               <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Embeddings</p>
                  <p className="text-sm font-medium text-text-main">{source.embeddings}</p>
               </div>
               <div>
                  <p className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Last Sync</p>
                  <p className="text-sm font-medium text-text-main">{source.lastSync}</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
