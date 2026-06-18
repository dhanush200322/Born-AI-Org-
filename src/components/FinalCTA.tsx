import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[800px] h-[500px] bg-gradient-to-r from-primary to-secondary blur-[150px] opacity-20 rounded-full animate-pulse"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-text-main mb-8"
        >
          Start Building Your AI Agent Today
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-text-muted mb-12 max-w-2xl mx-auto"
        >
          Join thousands of forward-thinking teams integrating intelligent AI agents into their products.
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
        >
          <Link to="/signup" className="inline-flex px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-bold text-text-main shadow-glow-primary hover:scale-105 transition-transform items-center gap-2 mx-auto justify-center">
            Create Free Account <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
