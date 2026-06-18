import { Bot, User, Send, PhoneCall, Image as ImageIcon, Paperclip, Settings2, Activity, PlayCircle, RefreshCcw, Database, Mic, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Step10Props {
  data: any;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function Step10Testing({ data }: Step10Props) {
  const [isListening, setIsListening] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hi! I'm ${data.name}. I'm ready to test. You can ask me questions about the uploaded documents or test my tools.` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsListening(true);
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setTestMessage(prev => prev ? prev + ' ' + transcript : transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } else {
        // Fallback for browsers that don't support SpeechRecognition
        setIsListening(true);
        setTimeout(() => {
          setTestMessage("Do you have documentation for the API?");
          setIsListening(false);
        }, 2000);
      }
    }
  };

  const handleSend = async () => {
    if (!testMessage.trim() || isLoading) return;

    const userMsg = testMessage.trim();
    setTestMessage("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agentId: data.id || 'test-agent',
          message: userMsg,
          history,
          model: data.model,
          systemPrompt: data.systemPrompt
        }),
      });

      if (!res.ok) throw new Error('API error');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n\n');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.text) {
                  setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    lastMessage.content += data.text;
                    return newMessages;
                  });
                }
              } catch (e) {
                console.error("Error parsing SSE data", e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Make sure Groq API key is set.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[700px]">
      {/* Left: Chat Simulator */}
      <div className="rounded-2xl border border-border bg-surface flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-brand-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 bg-gradient-to-br transition-colors rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: data.brandColor || '#5B8CFF' }}>
                 {data.avatarUrl ? (
                   <img src={data.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                 ) : (
                   <Bot className="w-5 h-5 text-white" />
                 )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-success border-2 border-surface rounded-full"></div>
            </div>
            <div>
               <h3 className="text-sm font-semibold text-text-main">{data.name || 'Simulator'}</h3>
               <p className="text-xs text-text-muted">Testing {data.model}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-text-muted hover:text-text-main hover:bg-surface-hover rounded-lg transition-colors border border-border bg-brand-950" onClick={() => setMessages([{ role: 'assistant', content: `Hi! I'm ${data.name}. I'm ready to test.` }])}>
               <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-brand-950 p-6 overflow-y-auto space-y-6 custom-scrollbar">
           {/* Date Divider */}
           <div className="flex justify-center">
             <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider bg-surface px-3 py-1 rounded-full border border-border">Session Started</span>
           </div>
           
           {messages.map((msg, i) => (
             <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
               {msg.role === 'assistant' ? (
                 <div className="h-8 w-8 bg-gradient-to-br transition-colors rounded-full flex items-center justify-center shrink-0 mt-1 overflow-hidden" style={{ backgroundColor: data.brandColor || '#5B8CFF' }}>
                    {data.avatarUrl ? (
                      <img src={data.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                 </div>
               ) : (
                 <div className="h-8 w-8 bg-brand-950 border border-border rounded-lg flex items-center justify-center shrink-0 mt-1">
                   <User className="w-4 h-4 text-text-muted" />
                 </div>
               )}
               <div className={`${msg.role === 'user' ? 'bg-primary/20 border border-primary/30 rounded-2xl rounded-tr-sm' : 'bg-surface border border-border rounded-2xl rounded-tl-sm'} px-4 py-3 text-sm text-text-main space-y-2 whitespace-pre-wrap`}>
                 <p>{msg.content}</p>
                 {msg.role === 'assistant' && msg.content === '' && isLoading && (
                   <div className="flex gap-1 items-center h-5">
                       <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                       <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                       <div className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                   </div>
                 )}
               </div>
             </div>
           ))}
           <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-brand-950/50 border-t border-border">
           <div className="relative flex items-end gap-2 bg-surface border border-border rounded-xl p-2 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
             <button className="p-2 text-text-muted hover:text-text-main rounded-lg transition-colors">
               <Paperclip className="w-5 h-5" />
             </button>
             <button 
                onClick={toggleListening}
                className={`p-2 rounded-lg transition-colors ${isListening ? 'text-primary bg-primary/10 animate-pulse' : 'text-text-muted hover:text-text-main'}`}
             >
                <Mic className="w-5 h-5" />
             </button>
             <textarea 
               ref={inputRef}
               value={testMessage}
               onChange={(e) => setTestMessage(e.target.value)}
               onKeyDown={handleKeyDown}
               rows={1}
               placeholder={isListening ? "Listening..." : "Type a message to test..."}
               className="w-full bg-transparent text-sm text-text-main focus:outline-none resize-none py-2 max-h-32 custom-scrollbar"
             />
             <button 
                onClick={handleSend}
                disabled={isLoading || (!testMessage.trim() && !isListening)}
                className="p-2 text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
             >
               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
             </button>
           </div>
        </div>
      </div>

      {/* Right: Debug Panel */}
      <div className="rounded-2xl border border-border bg-surface flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-brand-950/50 flex items-center justify-between">
           <h3 className="text-sm font-semibold text-text-main flex items-center gap-2">
             <Activity className="w-4 h-4 text-primary" /> Debug Traces
           </h3>
        </div>
        
        <div className="flex-1 p-0 overflow-y-auto custom-scrollbar bg-brand-950">
          <div className="divide-y divide-border/50">
             {messages.filter(m => m.role === 'user').map((m, i) => (
                <div key={i} className="p-4 bg-surface hover:bg-surface-hover transition-colors cursor-pointer border-l-2 border-secondary">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-secondary flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5" /> Retrieval (RAG)
                    </span>
                  </div>
                  <div className="bg-brand-950 p-3 rounded-lg border border-border mt-2">
                    <p className="text-[10px] text-text-muted uppercase mb-1">Vector Search Query</p>
                    <p className="text-xs text-text-main font-mono mb-3">"{m.content}"</p>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// Needs RefreshCcw import, adding it via the creation.
