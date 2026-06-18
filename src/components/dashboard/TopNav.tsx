import { Search, Bell, Menu, Crown, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface TopNavProps {
  setSidebarOpen: (open: boolean) => void;
}

export function TopNav({ setSidebarOpen }: TopNavProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-brand-950/80 backdrop-blur-xl px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-text-muted hover:text-text-main lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-border lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center">
        <form className="relative flex flex-1" action="#" method="GET" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full max-w-md">
            <Search
              className="absolute inset-y-0 left-0 h-full w-4 text-text-muted pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="search-field"
              className="block h-full w-full border-0 py-0 pl-7 pr-0 text-text-main placeholder:text-text-muted focus:ring-0 sm:text-sm bg-transparent outline-none transition-colors"
              placeholder="Search or jump to... (Press ⌘K)"
              type="search"
              name="search"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none hidden sm:flex">
                <kbd className="inline-flex items-center rounded border border-border px-1.5 font-sans text-xs text-text-muted">
                    <abbr title="Command" className="no-underline">⌘</abbr> K
                </kbd>
            </div>
          </div>
        </form>
        
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-warning/30 bg-warning/5 text-warning text-xs font-medium">
            <Crown className="w-3.5 h-3.5" />
            <span>2,405,291 Credits</span>
          </div>
          
          <button type="button" className="-m-2.5 p-2.5 text-text-muted hover:text-text-main relative group">
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5 hover:scale-110 transition-transform" aria-hidden="true" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-danger rounded-full ring-2 ring-brand-950"></span>
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true" />

          {/* Quick Create Button */}
          <Link 
             to="/dashboard/agents/new" 
             className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-[0_0_15px_-3px_rgba(91,140,255,0.4)]"
          >
            <Plus className="w-4 h-4" />
            Create
          </Link>
        </div>
      </div>
    </header>
  );
}
