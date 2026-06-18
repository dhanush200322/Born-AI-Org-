import { motion } from "motion/react";
import { Bot, Database, BrainCircuit, Globe, MessageCircle, Mic, LineChart, Code2, Users, Wand2 } from "lucide-react";
import { cn } from "../lib/utils";

const features = [
  { icon: Bot, title: "AI Agent Builder", description: "Design custom agent personas with specific goals, tones, and behavioral guardrails." },
  { icon: Database, title: "Knowledge Base (RAG)", description: "Securely ground your agents in your own documents, wikis, and website data." },
  { icon: BrainCircuit, title: "Long-Term Memory", description: "Agents remember past interactions, user preferences, and context across sessions." },
  { icon: Globe, title: "Website Chatbot", description: "Embed intelligent support directly into your React, Next.js, or HTML site in minutes." },
  { icon: MessageCircle, title: "WhatsApp Integration", description: "Deploy agents to WhatsApp Business to engage customers where they already are." },
  { icon: Mic, title: "Voice Assistant", description: "Seamless real-time voice capabilities with ultra-low latency speech-to-speech." },
  { icon: LineChart, title: "Analytics Dashboard", description: "Track token usage, resolution rates, and conversation sentiment in real-time." },
  { icon: Code2, title: "API Deployment", description: "Headless API access to integrate your custom agents into any backend system." },
  { icon: Users, title: "CRM Automation", description: "Automatically update Salesforce or HubSpot based on agent conversations." },
  { icon: Wand2, title: "Agent Actions", description: "Give agents tools to trigger external APIs, send emails, or query databases." },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mb-6"
          >
            Capabilities that scale with your vision
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Everything you need to build, deploy, and monitor production-grade AI agents without writing complex orchestration code.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="group relative glass-panel p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-surface-hover hover:border-primary/30"
            >
              {/* Dynamic Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[50px]"></div>
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-surface border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-text-muted group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-text-main mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
