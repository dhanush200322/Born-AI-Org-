import { motion } from "motion/react";
import { Activity, MessageCircle, Database, Zap, ArrowUpRight } from "lucide-react";

export function DashboardPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mb-6"
            >
              Enterprise-grade control & observability
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-text-muted mb-8"
            >
              Maintain full visibility into your agent's behavior. Track token usage, monitor live conversations, manage vector databases, and review source citations to ensure absolute accuracy.
            </motion.p>
            
            <ul className="space-y-6">
              {[
                { icon: Activity, title: "Live Analytics", desc: "Monitor resolution rates and sentiment." },
                { icon: Database, title: "Vector Management", desc: "View and edit embedded chunks." },
                { icon: MessageCircle, title: "Conversation Logs", desc: "Review transcripts and debug reasoning." }
              ].map((item, i) => (
                <motion.li 
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center shrink-0 mt-1">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-text-main font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-text-muted">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 w-full relative">
             {/* Fake Dashboard Element Component */}
             <motion.div
               initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
               whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="glass-panel border-border p-6 rounded-3xl shadow-2xl relative"
               style={{ perspective: 1000 }}
             >
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-text-main font-medium">Platform Metrics</h3>
                   <div className="flex gap-2">
                     <span className="text-xs px-2 py-1 bg-surface text-text-muted rounded-md border border-border">7 Days</span>
                     <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-md border border-primary/20">30 Days</span>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-surface p-4 rounded-2xl border border-border">
                    <p className="text-xs text-text-muted mb-2">Total Queries</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-text-main">124.5K</span>
                      <span className="text-xs text-[#00E676] flex items-center"><ArrowUpRight className="w-3 h-3"/> 12%</span>
                    </div>
                  </div>
                  <div className="bg-surface p-4 rounded-2xl border border-border">
                    <p className="text-xs text-text-muted mb-2">Avg Resolution Time</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold text-text-main">4.2s</span>
                      <span className="text-xs text-[#00E676] flex items-center"><ArrowUpRight className="w-3 h-3"/> 3%</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-40 w-full relative mb-4">
                   {/* Abstract chart simulation using SVG */}
                   <svg className="w-full h-full" preserveAspectRatio="none">
                      <path d="M0,80 Q50,60 100,70 T200,40 T300,50 T400,20" fill="none" stroke="#4F8CFF" strokeWidth="3" />
                      <path d="M0,80 Q50,60 100,70 T200,40 T300,50 T400,20 L400,160 L0,160 Z" fill="url(#gradient)" opacity="0.2" />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#4F8CFF" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                   </svg>
                   {/* Pulse dot on line */}
                   <div className="absolute top-[20px] right-0 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#4F8CFF]"></div>
                </div>
             </motion.div>
             
             {/* Floating elements */}
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -bottom-10 -left-10 glass-panel p-4 rounded-2xl border-border flex items-center gap-4"
             >
               <div className="w-10 h-10 rounded-full bg-[#00E676]/20 flex items-center justify-center">
                 <Zap className="w-5 h-5 text-[#00E676]" />
               </div>
               <div>
                 <p className="text-text-main text-sm font-medium">Model fine-tuned</p>
                 <p className="text-text-muted text-xs">2 mins ago</p>
               </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
