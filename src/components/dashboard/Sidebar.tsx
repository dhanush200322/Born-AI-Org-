import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabaseClient";
import { 
  Bot, 
  BrainCircuit, 
  Database, 
  Workflow, 
  Zap, 
  MessageSquare, 
  Phone, 
  Cable, 
  LineChart, 
  Store, 
  CloudRain, 
  CreditCard, 
  Settings, 
  HelpCircle,
  Menu,
  X,
  Sparkles
} from "lucide-react";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Bot },
  { name: 'AI Agents', href: '/dashboard/agents', icon: BrainCircuit },
  { name: 'Knowledge Base', href: '/dashboard/knowledge', icon: Database },
  { name: 'Memory', href: '/dashboard/memory', icon: Zap },
  { name: 'Workflow Builder', href: '/dashboard/workflows', icon: Workflow },
  { name: 'Automations', href: '/dashboard/automations', icon: Cable },
  { name: 'Website Chat', href: '/dashboard/chat', icon: MessageSquare },
  { name: 'Voice', href: '/dashboard/voice', icon: Phone },
  { name: 'API', href: '/dashboard/api', icon: CloudRain },
  { name: 'Analytics', href: '/dashboard/analytics', icon: LineChart },
  { name: 'Marketplace', href: '/dashboard/marketplace', icon: Store },
];

const secondaryNavigation = [
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || "John Doe";
  const displayEmail = user?.email || "Admin workspace";
  const initials = displayName.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();

  const renderNavItems = (items: typeof navigation) => (
    <ul className="space-y-1">
      {items.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <li key={item.name}>
            <Link
              to={item.href}
              className={`group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-text-secondary hover:bg-surface-hover hover:text-text-main'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-primary' : 'text-text-muted group-hover:text-text-main'}`} />
                {item.name}
              </div>
              {isActive && (
                <motion.div 
                  layoutId="active-nav-indicator"
                  className="w-1 h-4 bg-primary rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col border-r border-border bg-sidebar/50 backdrop-blur-xl">
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-[1px]">
              <div className="w-full h-full bg-brand-950 rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
            </div>
            <span className="font-semibold text-lg tracking-tight group-hover:text-primary transition-colors">BORN AI</span>
          </Link>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4 custom-scrollbar">
          <nav className="flex-1 space-y-8">
            <div>
              <div className="px-3 text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Core Platform</div>
              {renderNavItems(navigation)}
            </div>
            <div>
              <div className="px-3 text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Account & Workspace</div>
              {renderNavItems(secondaryNavigation)}
            </div>
          </nav>
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-surface">
             {user?.user_metadata?.avatar_url ? (
               <img src={user.user_metadata.avatar_url} alt={displayName} className="w-8 h-8 rounded-full shadow-sm ring-1 ring-white/10 object-cover" />
             ) : (
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-xs font-bold shadow-sm ring-1 ring-white/10 uppercase">
                 {initials}
               </div>
             )}
             <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-text-main truncate">{displayName}</p>
               <p className="text-xs text-text-muted truncate">{displayEmail}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-border shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-border">
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-[1px]">
                    <div className="w-full h-full bg-brand-950 rounded-[7px] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <span className="font-semibold text-lg tracking-tight group-hover:text-primary transition-colors">BORN AI</span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="text-text-muted hover:text-text-main p-1 rounded-md hover:bg-surface-hover">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
                <nav className="flex-1 space-y-8">
                  <div>
                    <div className="px-3 text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Core Platform</div>
                    {renderNavItems(navigation)}
                  </div>
                  <div>
                    <div className="px-3 text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Account & Workspace</div>
                    {renderNavItems(secondaryNavigation)}
                  </div>
                </nav>
              </div>
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-surface">
                   {user?.user_metadata?.avatar_url ? (
                     <img src={user.user_metadata.avatar_url} alt={displayName} className="w-8 h-8 rounded-full shadow-sm ring-1 ring-white/10 object-cover" />
                   ) : (
                     <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-xs font-bold shadow-sm ring-1 ring-white/10 uppercase">
                       {initials}
                     </div>
                   )}
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-text-main truncate">{displayName}</p>
                     <p className="text-xs text-text-muted truncate">{displayEmail}</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
