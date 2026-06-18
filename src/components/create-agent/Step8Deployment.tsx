import { Rocket, Server, Shield, Globe } from "lucide-react";

export function Step8Deployment() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center max-w-2xl mx-auto space-y-8">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
        <Rocket className="w-10 h-10" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-text-main mb-3">Ready to Deploy</h2>
        <p className="text-text-secondary">
          Your AI agent is fully configured. We will provision the infrastructure, build the memory embeddings, and deploy the endpoints across the selected channels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left">
        <div className="bg-surface border border-border rounded-xl p-4 flex items-start gap-3">
          <Server className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-text-main">Scalable Backend</h4>
            <p className="text-xs text-text-muted mt-1">Serverless autoscaling</p>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-text-main">Secure API</h4>
            <p className="text-xs text-text-muted mt-1">Rate limited & encrypted</p>
          </div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4 flex items-start gap-3">
          <Globe className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-text-main">Global Edge</h4>
            <p className="text-xs text-text-muted mt-1">Low latency responses</p>
          </div>
        </div>
      </div>
    </div>
  );
}
