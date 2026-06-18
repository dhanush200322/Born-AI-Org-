import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  { question: "How does the knowledge base integration work?", answer: "We use state-of-the-art vector embeddings to index your documents (PDFs, Notion, Websites). When an agent receives a query, it performs an initial semantic search against your data to provide grounded, highly accurate answers." },
  { question: "What AI models do you use?", answer: "By default we utilize the latest Gemini Pro models for the deepest reasoning and context windows. For custom Enterprise plans, we support multi-model routing depending on your specific use-case." },
  { question: "Can I self-host or deploy to my own cloud?", answer: "Yes, our Business tier provides options for virtual private cloud (VPC) deployments and strictly isolated computing environments for compliance-heavy industries." },
  { question: "How is memory managed?", answer: "Agents maintain both short-term session memory (context window) and long-term memory via database persistence. The agent conditionally retrieves past interactions based on user identity or session ID." },
  { question: "Do you support custom actions like API calls?", answer: "Absolutely. You can define custom OpenAPI schemas or webhooks that your agent can trigger mid-conversation to perform actions like booking meetings, querying databases, or updating CRMs." },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel border-border rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-text-main">{faq.question}</span>
                {openIndex === i ? (
                  <Minus className="w-5 h-5 text-primary shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-text-muted shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-text-muted leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
