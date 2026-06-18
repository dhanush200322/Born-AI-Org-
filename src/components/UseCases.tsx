import { motion } from "motion/react";
import { Users, HeadphonesIcon, Briefcase, Stethoscope, GraduationCap, Scale, Landmark } from "lucide-react";

const useCases = [
  { icon: HeadphonesIcon, title: "Customer Support L1/L2", description: "Resolve 80% of support tickets instantly using your historical helpdesk data." },
  { icon: Briefcase, title: "Sales SDR Agent", description: "Qualify leads, answer pricing questions, and book demos directly in chat." },
  { icon: Users, title: "Internal HR Assistant", description: "Answer employee policy questions and automate onboarding workflows." },
  { icon: Stethoscope, title: "Healthcare Intake", description: "Securely collect patient history and schedule appointments." },
  { icon: GraduationCap, title: "Education Tutor", description: "Personalized learning paths based on course materials and student progress." },
  { icon: Scale, title: "Legal Case Researcher", description: "Sift through thousands of legal precedents instantly." },
  { icon: Landmark, title: "Finance Advisor", description: "Provide real-time market insights and personalized budget advice." }
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-24 relative bg-[#060A14]">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mb-6"
          >
            Built for any industry
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-8 rounded-3xl border-border hover:border-white/20 transition-all cursor-crosshair group"
            >
              <useCase.icon className="w-8 h-8 text-text-muted mb-6 group-hover:text-primary transition-colors" />
              <h3 className="text-xl font-bold text-text-main mb-3">{useCase.title}</h3>
              <p className="text-text-muted leading-relaxed">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
