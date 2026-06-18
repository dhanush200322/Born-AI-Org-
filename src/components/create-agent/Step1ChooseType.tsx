import { MessageSquare, Phone, Users, Stethoscope, ShoppingCart, GraduationCap, Code, Briefcase, FileText, Search, Sparkles, Scale, Landmark } from "lucide-react";

const templates = [
  { id: 'support', name: 'Customer Support Agent', description: 'Handles tier 1 & 2 support tickets, FAQs, and product guidance automatically.', time: '5 mins setup', icon: MessageSquare, color: 'from-primary to-blue-600', popular: true },
  { id: 'sales', name: 'Sales SDR', description: 'Qualifies leads, books meetings, and handles initial sales inquiries 24/7.', time: '10 mins setup', icon: Briefcase, color: 'from-secondary to-purple-600', popular: true },
  { id: 'marketing', name: 'Marketing Assistant', description: 'Drafts copy, schedules posts, and analyzes campaign metrics.', time: '8 mins setup', icon: Sparkles, color: 'from-amber-400 to-orange-500' },
  { id: 'voice', name: 'Voice Agent', description: 'Inbound or outbound phone calls with sub-500ms latency natural voice.', time: '15 mins setup', icon: Phone, color: 'from-emerald-400 to-teal-500', popular: true },
  { id: 'hr', name: 'HR Recruiter', description: 'Screens resumes, schedules interviews, and answers candidate questions.', time: '10 mins setup', icon: Users, color: 'from-rose-400 to-pink-500' },
  { id: 'document', name: 'Document Analyzer', description: 'Extracts data, summarizes, and answers questions from massive documents.', time: '5 mins setup', icon: FileText, color: 'from-slate-400 to-gray-600' },
  { id: 'legal', name: 'Legal Assistant', description: 'Reviews contracts, flags anomalies, and assists with case research.', time: '20 mins setup', icon: Scale, color: 'from-indigo-400 to-cyan-500' },
  { id: 'healthcare', name: 'Healthcare Assistant', description: 'Patient triage, appointment booking, and HIPAA-compliant routing.', time: '30 mins setup', icon: Stethoscope, color: 'from-red-400 to-rose-600' },
  { id: 'finance', name: 'Finance Assistant', description: 'Reconciles invoices, answers financial queries, and tracks expenses.', time: '15 mins setup', icon: Landmark, color: 'from-green-400 to-emerald-600' },
  { id: 'ecommerce', name: 'E-Commerce Assistant', description: 'Product recommendations, order tracking, and returns processing.', time: '10 mins setup', icon: ShoppingCart, color: 'from-orange-400 to-amber-600' },
  { id: 'education', name: 'Education Tutor', description: 'Personalized tutoring, grading assistance, and student support.', time: '12 mins setup', icon: GraduationCap, color: 'from-blue-400 to-cyan-600' },
  { id: 'developer', name: 'Developer Assistant', description: 'Code review, pair programming, and documentation generation.', time: '5 mins setup', icon: Code, color: 'from-violet-400 to-fuchsia-600' },
];

export function Step1ChooseType({ onSelect }: { onSelect?: (id: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h2 className="text-xl font-semibold text-text-main">Choose an Agent Template</h2>
         <div className="relative w-64">
           <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
           <input 
             type="text" 
             placeholder="Search templates..." 
             className="w-full bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 transition-colors"
           />
         </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <button 
          onClick={() => onSelect?.('custom')}
          className="relative group text-left rounded-2xl border-2 border-dashed border-border bg-transparent hover:border-primary/50 hover:bg-primary/5 transition-all p-6 flex flex-col items-center justify-center min-h-[220px]">
           <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Sparkles className="w-8 h-8 text-text-muted group-hover:text-primary transition-colors" />
           </div>
           <h3 className="text-base font-semibold text-text-main mb-1">Custom Agent</h3>
           <p className="text-sm text-text-secondary text-center">Start from scratch with a blank canvas.</p>
        </button>

        {templates.map((template) => (
          <button 
            key={template.id}
            onClick={() => onSelect?.(template.id)}
            className="relative group text-left rounded-2xl border border-border bg-surface hover:border-primary/50 transition-all p-6 min-h-[220px] overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-brand-950"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${template.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
            
            {template.popular && (
              <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">
                Popular
              </span>
            )}

            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
              <template.icon className="w-6 h-6 text-white" />
            </div>

            <h3 className="text-base font-semibold text-text-main mb-2 relative z-10">{template.name}</h3>
            <p className="text-sm text-text-secondary mb-4 relative z-10 leading-relaxed line-clamp-2">
              {template.description}
            </p>
            
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-medium text-text-muted mt-auto pt-4 border-t border-border/50">
              <span>{template.time}</span>
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Select &rarr;
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
