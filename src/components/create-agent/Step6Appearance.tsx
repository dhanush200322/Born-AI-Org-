import { useState } from "react";
import { Bot, User, Send, Paperclip, X } from "lucide-react";

interface Step6Props {
  data: any;
  updateData: (updates: any) => void;
}

export function Step6Appearance({ data, updateData }: Step6Props) {
  const [chatTheme, setChatTheme] = useState<'light' | 'dark' | 'glass'>('dark');

  const addQuestion = () => {
    updateData({ suggestedQuestions: [...(data.suggestedQuestions || []), ''] });
  };

  const updateQuestion = (index: number, val: string) => {
    const arr = [...(data.suggestedQuestions || [])];
    arr[index] = val;
    updateData({ suggestedQuestions: arr });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Settings */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-text-main mb-6">Chat Widget Appearance</h3>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1.5">Welcome Message</label>
            <textarea
              rows={2}
              value={data.welcomeMessage || `Hi there! 👋 I'm ${data.name || 'the AI Support Assistant'}. How can I help you today?`}
              onChange={(e) => updateData({ welcomeMessage: e.target.value })}
              className="w-full bg-brand-950 border border-border rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary/50 transition-colors resize-none custom-scrollbar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-1.5">Widget Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {(['dark', 'light', 'glass'] as const).map(theme => (
                <button
                  key={theme}
                  onClick={() => setChatTheme(theme)}
                  className={`py-2 px-4 rounded-xl border text-sm font-medium capitalize transition-all text-center
                    ${chatTheme === theme 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border bg-surface text-text-muted hover:text-text-main hover:bg-surface-hover'}`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-text-main mb-1.5">Suggested Questions</label>
             <div className="space-y-2">
                {(data.suggestedQuestions || []).map((q: string, i: number) => (
                  <div key={i} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. How can I help?" 
                      className="flex-1 bg-brand-950 border border-border rounded-xl px-4 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50" 
                      value={q}
                      onChange={(e) => updateQuestion(i, e.target.value)}
                    />
                    <button 
                      onClick={() => {
                        const arr = [...(data.suggestedQuestions || [])];
                        arr.splice(i, 1);
                        updateData({ suggestedQuestions: arr });
                      }}
                      className="p-2 text-text-muted hover:text-danger rounded-xl border border-transparent hover:bg-danger/10 hover:border-danger/20 transition-all shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button onClick={addQuestion} className="text-xs text-primary font-medium hover:underline px-1">+ Add another</button>
             </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex items-center justify-center bg-brand-950/50 border border-border rounded-2xl p-8 relative overflow-hidden backdrop-blur-sm">
        {/* Widget Preview Wrapper */}
        <div className={`w-full max-w-[360px] rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[500px] border transition-colors
          ${chatTheme === 'light' ? 'bg-white border-gray-200' : ''}
          ${chatTheme === 'dark' ? 'bg-[#0f111a] border-border' : ''}
          ${chatTheme === 'glass' ? 'bg-[#0f111a]/60 backdrop-blur-xl border-white/10' : ''}
        `}>
           {/* Header */}
           <div className="px-5 py-4 flex items-center gap-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
             <div className="h-10 w-10 bg-gradient-to-br transition-colors rounded-full flex items-center justify-center shrink-0 overflow-hidden" style={{ backgroundColor: data.brandColor || '#5B8CFF' }}>
               {data.avatarUrl ? (
                 <img src={data.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
               ) : (
                 <Bot className="w-5 h-5 text-white" />
               )}
             </div>
             <div>
                <h4 className={`text-sm font-semibold ${chatTheme === 'light' ? 'text-gray-900' : 'text-white'}`}>{data.name || 'Untitled Agent'}</h4>
                <p className={`text-xs ${chatTheme === 'light' ? 'text-gray-500' : 'text-white/60'} flex items-center gap-1`}><span className="w-1.5 h-1.5 rounded-full bg-success"></span> Online typically replies instantly</p>
             </div>
           </div>
           
           {/* Auto-scroll body container */}
           <div className={`flex-1 p-5 space-y-4 font-sans ${chatTheme === 'light' ? 'bg-gray-50' : ''}`}>
             <div className="flex gap-2.5 max-w-[85%]">
               <div className="h-7 w-7 bg-gradient-to-br transition-colors rounded-full flex items-center justify-center shrink-0 mt-0.5 overflow-hidden" style={{ backgroundColor: data.brandColor || '#5B8CFF' }}>
                 {data.avatarUrl ? (
                   <img src={data.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                 ) : (
                   <Bot className="w-3.5 h-3.5 text-white" />
                 )}
               </div>
               <div className={`rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm
                 ${chatTheme === 'light' ? 'bg-white text-gray-800 shadow-sm border border-gray-100' : 'bg-white/5 text-white/90 border border-white/5'}
               `}>
                 {data.welcomeMessage || `Hi there! 👋 I'm ${data.name || 'the AI Support Assistant'}. How can I help you today?`}
               </div>
             </div>
             
             <div className="flex flex-col gap-2 mt-4 ml-9 items-start">
                {(data.suggestedQuestions || []).filter((q: string) => q.trim()).map((q: string, i: number) => (
                  <button key={i} className={`text-xs font-medium text-left px-4 py-2 hover:bg-opacity-80 transition-opacity rounded-xl border w-fit max-w-[90%]
                    ${chatTheme === 'light' ? 'bg-white text-brand-500 border-gray-200' : 'bg-white/5 text-white border-white/10'}`}>
                    {q}
                  </button>
                ))}
             </div>
           </div>

           {/* Input Area */}
           <div className={`p-4 border-t ${chatTheme === 'light' ? 'bg-white border-gray-200' : 'bg-transparent border-white/10'}`}>
             <div className={`relative flex items-center gap-2 rounded-xl border p-1 pl-3 transition-all
               ${chatTheme === 'light' ? 'bg-gray-50 border-gray-200' : 'bg-black/20 border-white/10'}
             `}>
               <button className={`p-1.5 rounded-lg transition-colors ${chatTheme === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-white/40 hover:text-white/80'}`}>
                 <Paperclip className="w-4 h-4" />
               </button>
               <input 
                 type="text"
                 placeholder="Type a message..."
                 className={`w-full bg-transparent text-sm focus:outline-none ${chatTheme === 'light' ? 'text-gray-800 placeholder-gray-400' : 'text-white placeholder-white/40'}`}
               />
               <button className="p-2 text-white rounded-lg transition-colors shrink-0" style={{ backgroundColor: data.brandColor || '#5B8CFF' }}>
                 <Send className="w-4 h-4" />
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
