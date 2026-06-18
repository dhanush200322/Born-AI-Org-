import { Sliders, Zap, Sparkles, Cpu, Loader2 } from "lucide-react";
import { useState } from "react";

interface Step3Props {
  data: any;
  updateData: (updates: any) => void;
}

export function Step3AIConfig({ data, updateData }: Step3Props) {
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleOptimize = async () => {
    if (!data.systemPrompt) return;
    setIsOptimizing(true);
    try {
      const response = await fetch('/api/optimize-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: data.systemPrompt })
      });
      if (response.ok) {
        const resData = await response.json();
        if (resData.optimizedPrompt) {
          updateData({ systemPrompt: resData.optimizedPrompt });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Model & Settings */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold text-text-main mb-6">Generation Parameters</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-text-main">Temperature</label>
                <span className="text-sm text-text-muted">{data.temperature}</span>
              </div>
              <input 
                type="range" 
                min="0" max="2" step="0.1" 
                value={data.temperature} 
                onChange={(e) => updateData({ temperature: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-brand-950 rounded-lg appearance-none cursor-pointer accent-primary" 
              />
              <div className="flex justify-between mt-2 text-xs text-text-muted">
                <span>Deterministic</span>
                <span>Creative</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-text-main">Max Tokens</label>
                <span className="text-sm text-text-muted">{data.maxTokens}</span>
              </div>
              <input 
                type="range" 
                min="256" max="8192" step="256" 
                value={data.maxTokens}
                onChange={(e) => updateData({ maxTokens: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-brand-950 rounded-lg appearance-none cursor-pointer accent-primary" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right: System Prompt */}
      <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-text-main">System Prompt</h3>
            <p className="text-sm text-text-secondary">Define how your agent behaves and responds.</p>
          </div>
          <button 
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            {isOptimizing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} 
            {isOptimizing ? 'Optimizing...' : 'Optimize'}
          </button>
        </div>
        
        <div className="flex-1 min-h-[300px]">
          <textarea 
            className="w-full h-full bg-brand-950 border border-border rounded-xl p-4 text-sm text-text-main font-mono focus:outline-none focus:border-primary/50 transition-colors resize-none custom-scrollbar"
            value={data.systemPrompt}
            onChange={(e) => updateData({ systemPrompt: e.target.value })}
          />
        </div>
        <div className="mt-4 flex gap-2">
           {['Professional', 'Friendly', 'Direct', 'Creative'].map(tone => (
             <button 
               key={tone} 
               onClick={() => updateData({ systemPrompt: data.systemPrompt + `\n- Tone: ${tone}` })}
               className="px-3 py-1 bg-surface-hover hover:bg-border border border-border rounded-lg text-xs text-text-main transition-colors"
             >
               {tone}
             </button>
           ))}
        </div>
      </div>
    </div>
  );
}
