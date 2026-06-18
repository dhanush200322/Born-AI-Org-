import { motion } from "motion/react";
import { StaggerTestimonials } from "./ui/stagger-testimonials";

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mb-6"
          >
            Loved by industry leaders
          </motion.h2>
        </div>

        <StaggerTestimonials />
      </div>
    </section>
  );
}
