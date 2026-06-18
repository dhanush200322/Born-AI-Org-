import { ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Link as LinkIcon, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const features = [
    "AI Agent Builder",
    "Knowledge Base",
    "Long-Term Memory",
    "WhatsApp Deployment",
    "Voice AI",
    "Analytics",
  ];

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#04070D] text-white overflow-hidden relative">
      {/* Dynamic Background Noise */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay flex justify-center items-center">
         <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      {/* Left Side (Marketing) */}
      <div className="hidden md:flex md:w-1/2 p-12 lg:p-24 flex-col justify-center relative z-10 border-r border-[#1a1f2e] bg-gradient-to-br from-[#04070D] to-[#0a1020]">
        
        {/* Glow Effects */}
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#4F8CFF] rounded-full blur-[120px] opacity-20" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-[#9F5CFF] rounded-full blur-[150px] opacity-20" />

        <div className="flex items-center gap-4 mb-16 relative z-10 w-fit">
          <Link to="/" className="flex items-center gap-2 group">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4F8CFF] to-[#9F5CFF] flex items-center justify-center p-[1px]">
               <div className="w-full h-full bg-[#04070D] rounded-[7px] flex items-center justify-center">
                 <Sparkles className="w-4 h-4 text-[#4F8CFF]" />
               </div>
             </div>
             <span className="font-semibold text-lg tracking-tight group-hover:text-[#4F8CFF] transition-colors">BORN AI</span>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F8CFF]/10 text-[#4F8CFF] text-sm font-medium border border-[#4F8CFF]/20 mb-8 backdrop-blur-md">
             <Sparkles className="w-4 h-4" />
             Enterprise Grade AI
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-tight">
            Welcome to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F8CFF] to-[#9F5CFF]">Future of AI Agents</span>
          </h1>
          
          <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
            Create AI agents powered by RAG, Memory, Knowledge Bases, and Business Automations in minutes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-3 text-gray-300 group"
              >
                <div className="w-5 h-5 rounded-full bg-[#4F8CFF]/10 flex items-center justify-center group-hover:bg-[#4F8CFF]/20 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4F8CFF]" />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Abstract Floating UI Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute right-12 bottom-24 p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-xl hidden lg:flex items-center gap-4 group hover:bg-white/10 transition-colors shadow-2xl"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#9F5CFF] shrink-0" />
          <div>
            <div className="h-2 w-24 bg-white/20 rounded-full mb-2" />
            <div className="h-2 w-16 bg-white/10 rounded-full" />
          </div>
        </motion.div>

      </div>

      {/* Right Side (Auth Form) */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10 min-h-screen">
        {/* Glow Effects for right side on mobile */}
        <div className="absolute top-[10%] left-[20%] w-[50%] h-[50%] bg-[#4F8CFF] rounded-full blur-[120px] opacity-10 md:hidden" />
        
        <div className="w-full max-w-[420px] relative">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to website
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
