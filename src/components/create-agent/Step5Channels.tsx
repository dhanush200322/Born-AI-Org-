import { Globe, MessageSquare, Mail, Smartphone, Code, Boxes, CheckCircle2 } from "lucide-react";

interface Step5Props {
  data: any;
  updateData: (updates: any) => void;
}

export function Step5Channels({ data, updateData }: Step5Props) {
  const toggleChannel = (id: string) => {
    const prev = data.channels || [];
    updateData({ channels: prev.includes(id) ? prev.filter((c: string) => c !== id) : [...prev, id] });
  };

  const channels = [
    { id: 'website', name: 'Website Widget', description: 'Embed a chat bubble on your site.', icon: Globe, color: 'text-primary' },
    { id: 'whatsapp', name: 'WhatsApp', description: 'Available via Twilio or official API.', icon: MessageSquare, color: 'text-success' },
    { id: 'slack', name: 'Slack', description: 'Internal team assistant in channels.', icon: Boxes, color: 'text-fuchsia-400' },
    { id: 'discord', name: 'Discord', description: 'Community support bot.', icon: MessageSquare, color: 'text-indigo-400' },
    { id: 'messenger', name: 'Messenger', description: 'Facebook page auto-responses.', icon: MessageSquare, color: 'text-blue-500' },
    { id: 'sms', name: 'SMS', description: 'Text message interactions (Twilio).', icon: Smartphone, color: 'text-warning' },
    { id: 'email', name: 'Email', description: 'Automated email drafted responses.', icon: Mail, color: 'text-danger' },
    { id: 'api', name: 'REST API', description: 'Integrate directly into your backend.', icon: Code, color: 'text-text-main' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-text-main mb-2">Connect Channels</h3>
        <p className="text-sm text-text-secondary mb-6">
          Select where you want your AI agent to interact with users. You can enable multiple channels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {channels.map((channel) => {
          const isSelected = (data.channels || []).includes(channel.id);
          return (
            <button
              key={channel.id}
              onClick={() => toggleChannel(channel.id)}
              className={`relative text-left rounded-2xl border p-5 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-brand-950 flex flex-col h-full bg-surface
                ${isSelected ? 'border-primary shadow-[0_0_15px_-3px_rgba(91,140,255,0.3)]' : 'border-border hover:border-primary/50'}`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 animate-in zoom-in duration-200">
                  <CheckCircle2 className="w-5 h-5 text-primary bg-surface rounded-full" />
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center
                ${isSelected ? 'bg-primary/10' : 'bg-brand-950 border border-border'}`}
              >
                <channel.icon className={`w-6 h-6 ${isSelected ? 'text-primary' : channel.color}`} />
              </div>
              
              <h4 className="text-base font-semibold text-text-main mb-1.5">{channel.name}</h4>
              <p className="text-xs text-text-muted mt-auto leading-relaxed">{channel.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
