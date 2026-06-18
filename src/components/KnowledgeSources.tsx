import { motion } from "motion/react";
import { FileText, Globe, FileQuestion, FileCode2, Database, Table, NotebookPen } from "lucide-react";

const sources = [
  { icon: FileText, name: "PDF Documents", format: ".pdf" },
  { icon: FileText, name: "Word Files", format: ".docx" },
  { icon: FileText, name: "Text Files", format: ".txt" },
  { icon: Globe, name: "Websites", format: "URL Sync" },
  { icon: FileQuestion, name: "FAQs", format: "Q&A Pairs" },
  { icon: FileCode2, name: "Markdown", format: ".md" },
  { icon: NotebookPen, name: "Notion", format: "Integration" },
  { icon: FileText, name: "Google Docs", format: "Integration" },
  { icon: Table, name: "Spreadsheets", format: ".csv" },
];

export function KnowledgeSources() {
  return (
    <section className="py-24 relative">
       <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
         <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
           <div className="max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold tracking-tight text-text-main mb-4"
              >
                Seamless Knowledge Integration
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-text-muted"
              >
                Your agents are only as smart as their data. Connect any source instantly.
              </motion.p>
           </div>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
           {sources.map((source, i) => (
             <motion.div
               key={source.name}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.05 }}
               whileHover={{ y: -5, scale: 1.02 }}
               className="glass-panel p-5 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer"
             >
               <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                 <source.icon className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
               </div>
               <h4 className="text-text-main font-medium text-sm mb-1">{source.name}</h4>
               <span className="text-xs text-text-muted font-mono bg-surface px-2 py-1 rounded-md">{source.format}</span>
             </motion.div>
           ))}
         </div>
       </div>
    </section>
  );
}
