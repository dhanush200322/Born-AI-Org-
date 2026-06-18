import { motion } from "motion/react";
import { Bot, UploadCloud, BrainCircuit, Unplug, Rocket } from "lucide-react";
import { cn } from "../lib/utils";

const steps = [
  { icon: Bot, title: "Create Agent", description: "Define personality, goals, and constraints." },
  { icon: UploadCloud, title: "Upload Knowledge", description: "Drag & drop PDFs, or sync Notion and web pages." },
  { icon: BrainCircuit, title: "Enable Memory", description: "Toggle semantic search and user-session recall." },
  { icon: Unplug, title: "Connect Channels", description: "Select platforms like WhatsApp, Website, or Slack." },
  { icon: Rocket, title: "Deploy", description: "Go live instantly with a one-click deployment." },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

       <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
         <div className="text-center mb-20">
           <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mb-6"
           >
             From idea to production in minutes
           </motion.h2>
         </div>

         <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-surface -translate-y-1/2 z-0"></div>
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-secondary to-transparent -translate-y-1/2 z-0 origin-left scale-x-0 animate-[growLine_2s_ease-out_forwards] [animation-timeline:view()] [animation-range:entry_20%_cover_50%]"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.2 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mb-6 relative group overflow-hidden border-border hover:border-primary/50 transition-colors">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <step.icon className="w-8 h-8 text-text-main relative z-10 group-hover:scale-110 transition-transform" />
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-2 md:-top-4 md:right-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-6 bg-brand-950 border border-border text-xs font-mono w-6 h-6 rounded-full flex items-center justify-center text-text-muted z-20">
                    {i + 1}
                  </div>

                  <h3 className="text-xl font-semibold text-text-main mb-2">{step.title}</h3>
                  <p className="text-sm text-text-muted">{step.description}</p>
                </motion.div>
              ))}
            </div>
         </div>
       </div>
    </section>
  );
}
