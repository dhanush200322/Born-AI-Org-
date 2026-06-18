import { CheckCircle, ArrowRight, Share2, Play, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";

interface SuccessStepProps {
  data?: any;
}

export function SuccessStep({ data }: SuccessStepProps) {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const hasWebsite = data?.channels?.includes('website');

  const copyCode = () => {
    navigator.clipboard.writeText(`<script src="https://api.born-ai.com/widget.js" data-agent-id="agt_123456789"></script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] text-center px-4 relative">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} gravity={0.15} colors={['#5B8CFF', '#8B5CF6', '#00D4FF', '#22C55E']} style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }} />}
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mb-8 relative"
      >
        <div className="absolute inset-0 bg-success/20 blur-xl rounded-full" />
        <CheckCircle className="w-12 h-12 text-success relative z-10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold text-text-main mb-4 tracking-tight">Your AI Agent is Live!</h1>
        <p className="text-lg text-text-secondary max-w-xl mx-auto mb-10">
          "Customer Support Rep" has been successfully deployed and is ready to assist your users.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
           <div className="bg-surface border border-border rounded-xl p-4">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Model</p>
              <p className="text-sm font-semibold text-text-main">GPT-4o</p>
           </div>
           <div className="bg-surface border border-border rounded-xl p-4">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Knowledge</p>
              <p className="text-sm font-semibold text-text-main">20,460 Chunks</p>
           </div>
           <div className="bg-surface border border-border rounded-xl p-4">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Channels</p>
              <p className="text-sm font-semibold text-text-main">Web, API</p>
           </div>
           <div className="bg-surface border border-border rounded-xl p-4">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Status</p>
              <p className="text-sm font-semibold text-success flex items-center justify-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success"></span> Online</p>
           </div>
        </div>

        {hasWebsite && (
          <div className="max-w-2xl mx-auto mb-12 text-left bg-surface border border-border rounded-xl p-5">
             <div className="flex items-center justify-between mb-3">
               <h3 className="text-sm font-semibold text-text-main flex items-center gap-2"><Code className="w-4 h-4 text-primary" /> Embed on your website</h3>
               <button 
                 onClick={copyCode}
                 className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
               >
                 {copied ? 'Copied!' : 'Copy Code'}
               </button>
             </div>
             <div className="bg-brand-950 rounded-lg p-4 font-mono text-xs overflow-x-auto">
               <pre className="text-primary/80 leading-relaxed">
{`<script 
  src={"https://api.born-ai.com/widget.js"} 
  data-agent-id={"agt_123456789"}
></script>`}
               </pre>
             </div>
             <p className="text-xs text-text-muted mt-3">Paste this snippet before the closing &lt;/body&gt; tag on your HTML pages.</p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="px-6 py-3 text-sm font-medium text-brand-950 bg-white hover:bg-gray-100 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)] flex items-center gap-2">
            Open Dashboard <ArrowRight className="w-4 h-4" />
          </button>
          
          <button className="px-6 py-3 text-sm font-medium text-text-main bg-surface hover:bg-surface-hover border border-border rounded-xl transition-colors flex items-center gap-2">
            <Play className="w-4 h-4" /> Test Live
          </button>

          <button className="px-6 py-3 text-sm font-medium text-text-main bg-surface hover:bg-surface-hover border border-border rounded-xl transition-colors flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share Agent
          </button>
        </div>
      </motion.div>
    </div>
  );
}
