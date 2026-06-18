import { motion } from "motion/react";
import { MessageCircle, Globe, PhoneCall, Webhook, Slack, MessageSquare, Code, LayoutTemplate, Network } from "lucide-react";

const channels = [
  { icon: Globe, name: "Website Chat" },
  { icon: MessageCircle, name: "WhatsApp" },
  { icon: Network, name: "Telegram" },
  { icon: PhoneCall, name: "Voice Call" },
  { icon: Webhook, name: "REST API" },
  { icon: Slack, name: "Slack" },
  { icon: MessageSquare, name: "Discord" },
  { icon: Code, name: "React SDK" },
  { icon: LayoutTemplate, name: "WordPress" },
];

export function DeploymentChannels() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full point-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mb-6"
          >
            Deploy Anywhere. Instantly.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            One agent architecture, multiple deployment targets. Reach your users wherever they are.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto mt-20 h-[400px] flex items-center justify-center">
          
          {/* Central Hub */}
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="absolute z-20 w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-primary"
          >
            <div className="w-16 h-16 bg-brand-950 rounded-full flex items-center justify-center">
              <span className="font-bold text-text-main text-xl">AI</span>
            </div>
          </motion.div>

          {/* Orbiting Channels */}
          {channels.map((channel, i) => {
            const angle = (i / channels.length) * Math.PI * 2;
            const radius = 160; // distance from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={channel.name}
                initial={{ opacity: 0, x: 0, y: 0 }}
                whileInView={{ opacity: 1, x, y }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                className="absolute z-10 flex flex-col items-center gap-2"
                style={{ marginLeft: '-2rem', marginTop: '-2rem' }} // Center offset
              >
                <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center hover:bg-surface-hover transition-colors shadow-lg cursor-pointer">
                  <channel.icon className="w-6 h-6 text-text-main/80" />
                </div>
                <span className="text-xs font-medium text-text-muted absolute -bottom-6 w-max">{channel.name}</span>
                
                {/* Connection line hint (SVG could be better, but we use simple styling) */}
              </motion.div>
            );
          })}
          
          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            {channels.map((_, i) => {
              const angle = (i / channels.length) * Math.PI * 2;
              const radius = 160;
              const x2 = 50 + Math.cos(angle) * (radius / 2.5); // Adjust for % relative spacing
              const y2 = 50 + Math.sin(angle) * (radius / 2.5);
              return (
                <line 
                  key={`line-${i}`}
                  x1="50%" y1="50%" 
                  x2={`${x2}%`} y2={`${y2}%`} 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                  className="animate-[pulse_2s_infinite]"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
