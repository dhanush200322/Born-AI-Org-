import { Upload, Plus, Bot, Building, Tag } from "lucide-react";
import { useRef } from "react";

interface Step2Props {
  data: any;
  updateData: (updates: any) => void;
}

export function Step2BasicInfo({ data, updateData }: Step2Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateData({ avatarUrl: url });
    }
  };

  const colors = ['#5B8CFF', '#8B5CF6', '#22C55E', '#F59E0B', '#EF4444', '#E2E8F0'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Form */}
      <div className="rounded-2xl border border-border bg-surface p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-text-main mb-1">Basic Information</h3>
          <p className="text-sm text-text-secondary mb-6">Give your agent an identity and purpose.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1.5">Agent Name</label>
            <input 
              type="text" 
              placeholder="e.g. Atlas, Support Bot, Sales Assistant" 
              className="w-full bg-brand-950 border border-border rounded-xl px-4 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 transition-colors"
              value={data.name}
              onChange={(e) => updateData({ name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-1.5">Description</label>
            <textarea 
              rows={3}
              placeholder="What does this agent do?" 
              className="w-full bg-brand-950 border border-border rounded-xl px-4 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 transition-colors resize-none custom-scrollbar"
              value={data.description}
              onChange={(e) => updateData({ description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">Primary Language</label>
              <select 
                className="w-full bg-brand-950 border border-border rounded-xl px-4 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                value={data.language}
                onChange={(e) => updateData({ language: e.target.value })}
              >
                <option>English (US)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">Timezone</label>
              <select 
                className="w-full bg-brand-950 border border-border rounded-xl px-4 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                value={data.timezone}
                onChange={(e) => updateData({ timezone: e.target.value })}
              >
                <option>UTC (Default)</option>
                <option>America/New_York</option>
                <option>America/Los_Angeles</option>
                <option>Europe/London</option>
              </select>
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-text-main mb-1.5">Avatar</label>
             <div className="mt-2 flex items-center gap-x-4">
                <div className="h-16 w-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                   {data.avatarUrl ? (
                     <img src={data.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                   ) : (
                     <Bot className="w-8 h-8 text-white" />
                   )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleAvatarChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-text-main shadow-sm hover:bg-surface-hover transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Change Avatar
                </button>
              </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-main mb-1.5">Brand Color</label>
            <div className="flex items-center gap-3">
              {colors.map((color, idx) => (
                <button 
                   key={idx}
                   onClick={() => updateData({ brandColor: color })}
                   className={`w-8 h-8 rounded-full border-2 ${data.brandColor === color ? 'border-text-main scale-110' : 'border-transparent'} hover:scale-110 transition-transform`}
                   style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Preview */}
      <div className="rounded-2xl bg-gradient-to-br from-surface to-brand-950 border border-border p-6 flex flex-col">
        <h3 className="text-lg font-semibold text-text-main mb-1">Live Preview</h3>
        <p className="text-sm text-text-secondary mb-8">This is how your agent will appear to users.</p>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm rounded-[24px] border border-border bg-surface shadow-xl overflow-hidden shadow-black/50">
             {/* Chat Header */}
             <div className="px-6 py-4 border-b border-border bg-brand-950/50 flex items-center gap-4">
               <div className="relative">
                 <div className="h-12 w-12 bg-gradient-to-br transition-colors rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: data.brandColor }}>
                   {data.avatarUrl ? (
                     <img src={data.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                   ) : (
                     <Bot className="w-6 h-6 text-white" />
                   )}
                 </div>
                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-surface rounded-full"></div>
               </div>
               <div>
                  <h4 className="text-base font-semibold text-text-main">{data.name || 'Untitled Agent'}</h4>
                  <p className="text-xs text-text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success"></span> Online typically replies instantly</p>
               </div>
             </div>
             {/* Chat Body */}
             <div className="p-6 space-y-4 bg-brand-950 min-h-[250px]">
               <div className="flex gap-3 max-w-[85%]">
                 <div className="h-8 w-8 bg-gradient-to-br transition-colors rounded-full flex items-center justify-center shrink-0 mt-1 overflow-hidden" style={{ backgroundColor: data.brandColor }}>
                    {data.avatarUrl ? (
                      <img src={data.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                 </div>
                 <div className="bg-surface border border-border rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-text-main">
                   Hi there! 👋 I'm {data.name || 'the AI Support Assistant'}. How can I help you today?
                 </div>
               </div>
             </div>
             {/* Chat Input */}
             <div className="p-4 bg-brand-950/50 border-t border-border">
                <div className="w-full h-10 bg-surface border border-border rounded-full px-4 flex items-center">
                  <span className="text-sm text-text-muted">Type your message...</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
