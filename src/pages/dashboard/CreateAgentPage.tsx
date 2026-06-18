import { useState } from "react";
import { Check, ChevronRight, Sparkles, Save, X, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Step1ChooseType } from "../../components/create-agent/Step1ChooseType";
import { Step2BasicInfo } from "../../components/create-agent/Step2BasicInfo";
import { Step3AIConfig } from "../../components/create-agent/Step3AIConfig";
import { Step4Knowledge } from "../../components/create-agent/Step4Knowledge";
import { Step5Channels } from "../../components/create-agent/Step5Channels";
import { Step6Appearance } from "../../components/create-agent/Step6Appearance";
import { Step10Testing } from "../../components/create-agent/Step10Testing";
import { Step8Deployment } from "../../components/create-agent/Step8Deployment";
import { SuccessStep } from "../../components/create-agent/SuccessStep";
import { useNavigate } from "react-router-dom";

const steps = [
  { id: 1, name: 'Choose Type' },
  { id: 2, name: 'Basic Info' },
  { id: 3, name: 'AI Config' },
  { id: 4, name: 'Knowledge Base' },
  { id: 5, name: 'Channels' },
  { id: 6, name: 'Appearance' },
  { id: 7, name: 'Testing' },
  { id: 8, name: 'Deployment' },
];

export function CreateAgentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const [agentData, setAgentData] = useState({
    typeId: '',
    name: 'Customer Support Rep',
    description: 'Handles tier 1 and tier 2 technical support inquiries for our SaaS platform.',
    avatarUrl: '',
    brandColor: '#5B8CFF',
    language: 'English (US)',
    timezone: 'UTC (Default)',
    model: 'gemini-1.5-pro',
    temperature: 0.7,
    maxTokens: 4096,
    systemPrompt: `You are a helpful and professional customer support agent for BORN AI.\nYour primary goal is to assist users with technical queries, account issues, and general product questions.\n\nGuidelines:\n- Always be polite, concise, and professional.\n- If you don't know the answer, escalate to a human agent.\n- Use formatting (bullet points, bold text) to make instructions clear.\n- Do not make up features that don't exist.\n- Tone: Friendly but technical.\n\nVariables available:\n{{user_name}} - The name of the user chatting.\n{{kb_context}} - Relevant context injected from the knowledge base.`,
    suggestedQuestions: ['How do I get started?', 'Tell me about your features'],
    channels: ['website']
  });

  const updateAgentData = (updates: Partial<typeof agentData>) => {
    setAgentData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < 9) {
      setCurrentStep(c => c + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(c => c - 1);
    }
  };

    if (currentStep === 9) {
      return <SuccessStep data={agentData} />;
    }

  return (
    <div className="flex flex-col h-full space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
            Create AI Agent
          </h1>
          <p className="mt-2 text-lg text-text-secondary max-w-2xl">
            Build, train, customize, test and deploy your AI agent in minutes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="px-4 py-2 text-sm font-medium text-text-main hover:text-white transition-colors flex items-center gap-2">
            <X className="w-4 h-4" /> Cancel
          </button>
          <button className="px-4 py-2 text-sm font-medium text-text-main bg-surface hover:bg-surface-hover border border-border rounded-xl transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button onClick={() => setCurrentStep(12)} className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 shadow-[0_0_15px_-3px_rgba(91,140,255,0.4)] rounded-xl transition-all flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Create Agent
          </button>
        </div>
      </div>

      {/* Stepper */}
      <div className="rounded-2xl border border-border bg-surface p-6 overflow-hidden">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                <div className="flex items-center">
                  <div
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                      step.id < currentStep
                        ? 'bg-primary text-white shadow-[0_0_10px_rgba(91,140,255,0.4)]'
                        : step.id === currentStep
                        ? 'border-2 border-primary bg-surface text-primary shadow-[0_0_10px_rgba(91,140,255,0.2)]'
                        : 'border-2 border-border bg-surface text-text-muted'
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <span className="text-xs font-semibold">{step.id}</span>
                    )}
                  </div>
                  <div className="absolute top-0 mt-10 hidden w-32 -translate-x-1/2 text-center sm:block left-4">
                    <span
                      className={`text-xs font-medium tracking-wide ${
                        step.id <= currentStep ? 'text-primary' : 'text-text-muted'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {stepIdx !== steps.length - 1 ? (
                    <div className="absolute top-4 left-8 hidden w-full h-[2px] bg-border sm:block">
                      <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ width: step.id < currentStep ? '100%' : '0%' }}
                      />
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
         <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {currentStep === 1 && <Step1ChooseType onSelect={(id) => { updateAgentData({ typeId: id }); handleNext(); }} />}
              {currentStep === 2 && <Step2BasicInfo data={agentData} updateData={updateAgentData} />}
              {currentStep === 3 && <Step3AIConfig data={agentData} updateData={updateAgentData} />}
              {currentStep === 4 && <Step4Knowledge data={agentData} />}
              {currentStep === 5 && <Step5Channels data={agentData} updateData={updateAgentData} />}
              {currentStep === 6 && <Step6Appearance data={agentData} updateData={updateAgentData} />}
              {currentStep === 7 && <Step10Testing data={agentData} />}
              {currentStep === 8 && <Step8Deployment />}
            </motion.div>
         </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-6 py-2.5 text-sm font-medium text-text-main bg-surface hover:bg-surface-hover border border-border rounded-xl transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2.5 text-sm font-medium text-brand-950 bg-white hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2"
        >
          {currentStep === 8 ? 'Finish' : 'Continue'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
