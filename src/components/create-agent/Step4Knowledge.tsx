import { UploadCloud, FileText, Globe, Link as LinkIcon, Database, HardDrive, RefreshCw, X, MessageCircleQuestion, Plus, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

interface Step4Props {
  data?: any;
}

export function Step4Knowledge({ data }: Step4Props) {
  const [sources, setSources] = useState([
    { id: 1, name: 'product_manual_v2.pdf', type: 'PDF Document', size: '2.4 MB', icon: FileText, color: 'text-danger', status: 'Synced' },
  ]);
  
  const [activeTab, setActiveTab] = useState<'upload'|'url'|'faq'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState('');
  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const newSources = Array.from(files).map((f, i) => ({
        id: Date.now() + i,
        name: f.name,
        type: 'File',
        size: (f.size / 1024 / 1024).toFixed(2) + ' MB',
        icon: FileText,
        color: 'text-primary',
        status: 'Processing...'
      }));
      
      setSources(prev => [...prev, ...newSources]);
      
      // Upload each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('agentId', data?.id || 'test-agent');
        
        try {
          const res = await fetch('/api/v1/knowledge/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!res.ok) throw new Error('Upload failed');
          
          setSources(prev => prev.map(s => 
            s.name === file.name ? { ...s, status: 'Synced' } : s
          ));
        } catch (err) {
          console.error(err);
          setSources(prev => prev.map(s => 
            s.name === file.name ? { ...s, status: 'Error', color: 'text-danger' } : s
          ));
        }
      }
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const addUrl = () => {
    if (!urlInput.trim()) return;
    setSources([...sources, {
      id: Date.now(),
      name: urlInput,
      type: 'Website URL',
      size: 'Pending scan',
      icon: Globe,
      color: 'text-success',
      status: 'Synced'
    }]);
    setUrlInput('');
  };

  const addFaq = () => {
    if (!faqQ.trim() || !faqA.trim()) return;
    setSources([...sources, {
      id: Date.now(),
      name: faqQ,
      type: 'FAQ Entry',
      size: 'Text',
      icon: MessageCircleQuestion,
      color: 'text-warning',
      status: 'Synced'
    }]);
    setFaqQ('');
    setFaqA('');
  };

  return (
    <div className="space-y-6">
      {/* Upload Tabs */}
      <div className="flex gap-2 mb-4 border-b border-border pb-4">
        {[
          { id: 'upload', icon: FileText, label: 'Upload Files' },
          { id: 'url', icon: LinkIcon, label: 'Add Website URL' },
          { id: 'faq', icon: MessageCircleQuestion, label: 'Add FAQ' }
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 text-sm font-medium rounded-xl flex items-center gap-2 transition-colors ${activeTab === t.id ? 'bg-primary text-white shadow-md' : 'bg-surface text-text-main hover:bg-surface-hover border border-border'}`}
          >
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'upload' && (
        <div 
          className="rounded-2xl border-2 border-dashed border-border hover:border-primary/50 bg-gradient-to-br from-surface to-brand-950 transition-colors p-12 text-center cursor-pointer group relative"
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          
          {isUploading ? (
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <h3 className="text-lg font-semibold text-text-main mb-2">Processing Documents...</h3>
              <p className="text-sm text-text-secondary">Extracting text, generating embeddings, and building index.</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-main mb-2">Upload Knowledge Sources</h3>
              <p className="text-sm text-text-secondary mb-2 max-w-md mx-auto">
                Drag and drop files or click to browse.
              </p>
              <div className="text-xs text-text-muted">
                Supported: PDF, DOCX, TXT, CSV. Max 100MB per file.
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'url' && (
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h3 className="text-lg font-semibold text-text-main mb-2">Import from Website</h3>
          <p className="text-sm text-text-secondary mb-4">We'll crawl the URL and extract readable content.</p>
          <div className="flex gap-3">
            <input 
              type="url" 
              placeholder="https://example.com/docs" 
              className="flex-1 bg-brand-950 border border-border rounded-xl px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary/50 transition-colors"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addUrl()}
            />
            <button 
              onClick={addUrl}
              className="px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors"
            >
              Add URL
            </button>
          </div>
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-surface p-8 space-y-4">
            <h3 className="text-lg font-semibold text-text-main mb-2">Add Manual Q&A</h3>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">Question</label>
              <input 
                type="text" 
                placeholder="e.g. How do I reset my password?" 
                className="w-full bg-brand-950 border border-border rounded-xl px-4 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 transition-colors"
                value={faqQ}
                onChange={e => setFaqQ(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">Answer</label>
              <textarea 
                rows={3}
                placeholder="The precise answer to provide..." 
                className="w-full bg-brand-950 border border-border rounded-xl px-4 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 transition-colors resize-none custom-scrollbar"
                value={faqA}
                onChange={e => setFaqA(e.target.value)}
              />
            </div>
            <button 
              onClick={addFaq}
              className="w-full py-2.5 text-sm font-medium text-brand-950 bg-white rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add FAQ Entry
            </button>
          </div>

          <div className="rounded-2xl border-2 border-dashed border-border bg-transparent hover:border-primary/50 transition-colors p-8 flex flex-col items-center justify-center text-center cursor-pointer group relative" onClick={() => fileInputRef.current?.click()}>
            <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileUpload} accept=".csv,.txt,.xlsx" />
            <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Database className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-text-main mb-2">Bulk Import FAQ</h3>
            <p className="text-sm text-text-secondary">Upload a CSV or Excel file containing your Questions and Answers.</p>
            <div className="mt-4 text-xs font-mono text-text-muted bg-brand-950 p-2 rounded border border-border w-full">
              Format: Column A (Question), Column B (Answer)
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Sources */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-main">Processed Sources ({sources.length})</h3>
          <button className="text-sm text-primary hover:text-primary/80 flex items-center gap-1.5">
            <RefreshCw className="w-4 h-4" /> Sync All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sources.map((item) => (
             <div key={item.id} className="rounded-xl border border-border bg-surface p-4 flex flex-col group">
               <div className="flex items-start justify-between mb-3">
                 <div className="flex items-center gap-3 min-w-0">
                   <div className="w-10 h-10 rounded-lg bg-brand-950 border border-border flex items-center justify-center shrink-0">
                     <item.icon className={`w-5 h-5 ${item.color}`} />
                   </div>
                   <div className="min-w-0 flex-1">
                     <h4 className="text-sm font-medium text-text-main truncate" title={item.name}>{item.name}</h4>
                     <p className="text-xs text-text-muted mt-0.5">{item.type} • {item.size}</p>
                   </div>
                 </div>
                 <button 
                   onClick={() => setSources(sources.filter(s => s.id !== item.id))}
                   className="text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0"
                 >
                   <X className="w-4 h-4" />
                 </button>
               </div>
               <div className="mt-auto pt-3 border-t border-border flex items-center justify-between text-xs">
                 <div className="flex items-center gap-1.5">
                   <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Synced' ? 'bg-success' : item.status === 'Error' ? 'bg-danger' : 'bg-warning animate-pulse'}`}></div>
                   <span className={`${item.status === 'Synced' ? 'text-success' : item.status === 'Error' ? 'text-danger' : 'text-warning'} font-medium`}>{item.status}</span>
                 </div>
               </div>
             </div>
          ))}
          {sources.length === 0 && (
            <div className="col-span-full py-8 text-center text-sm text-text-muted border border-dashed border-border rounded-xl">
              No sources added yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
