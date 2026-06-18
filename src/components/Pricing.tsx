import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

const plans = [
  {
    name: "Starter",
    priceMonthly: "49",
    priceYearly: "39",
    description: "Perfect for small projects and individual developers.",
    features: ["1 Custom AI Agent", "1,000 Messages/mo", "Basic Analytics", "Website Integration", "Community Support"],
  },
  {
    name: "Pro",
    priceMonthly: "149",
    priceYearly: "119",
    description: "For teams building production-grade AI agents.",
    popular: true,
    features: [
      "5 Custom AI Agents",
      "10,000 Messages/mo",
      "Advanced Analytics",
      "WhatsApp & Slack",
      "API Access",
      "Priority Support"
    ],
  },
  {
    name: "Business",
    priceMonthly: "499",
    priceYearly: "399",
    description: "Enterprise-grade security and unlimited scaling.",
    features: [
      "Unlimited AI Agents",
      "100,000+ Messages/mo",
      "Custom Fine-Tuning",
      "Dedicated Success Manager",
      "SSO & SLA",
      "White-label options"
    ],
  }
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mb-6"
          >
            Simple, transparent pricing
          </motion.h2>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={cn("text-sm font-medium", !isYearly ? "text-text-main" : "text-text-muted")}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-8 rounded-full bg-surface-hover p-1 transition-colors"
            >
              <motion.div 
                layout
                className="w-6 h-6 bg-primary rounded-full"
                animate={{ x: isYearly ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={cn("text-sm font-medium flex items-center gap-2", isYearly ? "text-text-main" : "text-text-muted")}>
              Yearly <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative p-8 rounded-3xl glass-panel flex flex-col",
                plan.popular ? "border-primary/50 shadow-glow-primary scale-105 z-10 bg-brand-950/90" : "border-border"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-primary to-secondary text-text-main text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-text-main mb-2">{plan.name}</h3>
              <p className="text-sm text-text-muted mb-6 h-10">{plan.description}</p>
              <div className="mb-8 flex items-end gap-1">
                <span className="text-4xl font-bold text-text-main">
                  ${isYearly ? plan.priceYearly : plan.priceMonthly}
                </span>
                <span className="text-text-muted mb-1">/mo</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm text-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={cn(
                "w-full py-4 rounded-xl font-bold transition-transform hover:scale-[1.02]",
                plan.popular 
                  ? "bg-gradient-to-r from-primary to-secondary text-text-main shadow-glow-primary" 
                  : "bg-surface border border-border text-text-main hover:bg-surface-hover"
              )}>
                {plan.popular ? 'Start Free Trial' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
