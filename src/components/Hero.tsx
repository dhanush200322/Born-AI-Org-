import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles, Database, MessageSquare, Zap } from "lucide-react";
import { LogoCloud } from "./ui/logo-cloud-4";
import { Link } from "react-router-dom";

const logos = [
  {
    srcLight: "https://svgl.app/library/nvidia-wordmark-light.svg",
    srcDark: "https://svgl.app/library/nvidia-wordmark-dark.svg",
    alt: "Nvidia Logo",
  },
  {
    srcLight: "https://svgl.app/library/supabase_wordmark_light.svg",
    srcDark: "https://svgl.app/library/supabase_wordmark_dark.svg",
    alt: "Supabase Logo",
  },
  {
    srcLight: "https://svgl.app/library/openai_wordmark_light.svg",
    srcDark: "https://svgl.app/library/openai_wordmark_dark.svg",
    alt: "OpenAI Logo",
  },
  {
    srcLight: "https://svgl.app/library/turso-wordmark-light.svg",
    srcDark: "https://svgl.app/library/turso-wordmark-dark.svg",
    alt: "Turso Logo",
  },
  {
    srcLight: "https://svgl.app/library/vercel_wordmark.svg",
    srcDark: "https://svgl.app/library/vercel_wordmark_dark.svg",
    alt: "Vercel Logo",
  },
  {
    srcLight: "https://svgl.app/library/github_wordmark_light.svg",
    srcDark: "https://svgl.app/library/github_wordmark_dark.svg",
    alt: "GitHub Logo",
  },
  {
    srcLight: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
    srcDark: "https://svgl.app/library/claude-ai-wordmark-icon_dark.svg",
    alt: "Claude AI Logo",
  },
  {
    srcLight: "https://svgl.app/library/clerk-wordmark-light.svg",
    srcDark: "https://svgl.app/library/clerk-wordmark-dark.svg",
    alt: "Clerk Logo",
  },
];

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glow & Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] md:w-[600px] md:h-[600px] bg-primary opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-5%] md:w-[500px] md:h-[500px] bg-secondary opacity-10 blur-[100px] rounded-full"></div>
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Next-Gen Knowledge Engine
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-text-main mb-6 max-w-4xl"
          >
            Create AI Agents From <br className="hidden md:block" />
            <span className="text-gradient">Your Knowledge</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-text-muted max-w-2xl mb-10 leading-relaxed"
          >
            Upload documents, connect your knowledge base, enable memory, and deploy intelligent AI agents to websites, WhatsApp, APIs, and voice channels—all without complex infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/signup" className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-text-main shadow-glow-primary hover:scale-105 transition-transform flex items-center justify-center">
              Create Agent Free
            </Link>
            <button className="px-8 py-4 bg-surface border border-border rounded-xl font-bold text-text-main hover:bg-surface-hover flex items-center justify-center gap-2 transition-colors">
              <Play className="w-4 h-4 fill-white flex-shrink-0" /> Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Abstract Interface Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="relative w-full h-[300px] md:h-[500px] border border-border rounded-3xl bg-[#0A0E17]/60 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-10 border-b border-border bg-surface flex items-center px-4 gap-2 z-20">
              <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              <div className="flex-1"></div>
              <div className="text-[10px] text-text-muted font-mono tracking-wider">AGENT-OS v2.4.0</div>
            </div>
            
            <div className="mt-10 flex h-[calc(100%-40px)] relative">
                {/* Sidebar */}
                <div className="w-16 md:w-64 border-r border-border p-4 flex flex-col gap-4">
                  <div className="w-full h-8 max-w-[8rem] bg-surface rounded-md mb-4 hidden md:block"></div>
                  <div className="w-8 md:w-full h-8 bg-primary/20 rounded-md flex items-center gap-3 px-2">
                    <Database className="w-4 h-4 text-primary shrink-0" />
                    <div className="hidden md:block w-16 h-3 bg-primary/40 rounded-full"></div>
                  </div>
                  <div className="w-8 md:w-full h-8 hover:bg-surface rounded-md flex items-center gap-3 px-2 transition-colors">
                    <MessageSquare className="w-4 h-4 text-text-muted shrink-0" />
                    <div className="hidden md:block w-20 h-3 bg-surface-hover rounded-full"></div>
                  </div>
                  <div className="w-8 md:w-full h-8 hover:bg-surface rounded-md flex items-center gap-3 px-2 transition-colors">
                    <Zap className="w-4 h-4 text-text-muted shrink-0" />
                    <div className="hidden md:block w-12 h-3 bg-surface-hover rounded-full"></div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 relative">
                   <div className="w-32 h-6 bg-surface-hover rounded-md mb-8"></div>

                   {/* Mock Graph / Network Animation */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-30 mt-8">
                     <svg className="w-full h-full p-12 shrink-0">
                       <circle cx="50%" cy="50%" r="20%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" strokeDasharray="4 4" className="origin-center animate-[spin_20s_linear_infinite]" />
                       <circle cx="50%" cy="50%" r="30%" stroke="rgba(79,140,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="8 8" className="origin-center animate-[spin_30s_linear_infinite_reverse]" />
                       <circle cx="50%" cy="50%" r="4%" fill="rgba(79,140,255,0.8)" className="animate-pulse" />
                       
                       <line x1="50%" y1="50%" x2="35%" y2="25%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                       <circle cx="35%" cy="25%" r="2%" fill="rgba(159,92,255,0.6)" />
                       
                       <line x1="50%" y1="50%" x2="70%" y2="35%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                       <circle cx="70%" cy="35%" r="2%" fill="rgba(79,140,255,0.6)" />
                       
                       <line x1="50%" y1="50%" x2="60%" y2="75%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                       <circle cx="60%" cy="75%" r="2%" fill="rgba(255,255,255,0.6)" />
                     </svg>
                   </div>
                   
                   {/* Floating Chat Bubbles */}
                   <motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute top-20 right-10 md:right-32 max-w-[200px] glass-panel p-3 rounded-2xl rounded-tr-sm border-border text-xs text-text-main"
                   >
                     Summarizing the latest PDF uploads...
                   </motion.div>
                </div>
              </div>
            </div>
        </motion.div>

        {/* Trusted By */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="mt-20 md:mt-32 pt-10"
        >
          <p className="text-center text-xs font-semibold text-text-muted uppercase tracking-widest mb-8">Trusted by innovators at</p>
          <div className="max-w-4xl mx-auto">
            <LogoCloud logos={logos} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
