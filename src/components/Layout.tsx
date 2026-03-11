import React from 'react';
import { TrendingUp, TrendingDown, Activity, PieChart, Briefcase, Search, Bell, User, Menu, X, History as HistoryIcon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-left",
      active 
        ? "bg-emerald-500/10 text-emerald-500 font-medium" 
        : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
    )}
  >
    <Icon size={20} />
    <span className="text-sm">{label}</span>
  </button>
);

export const Layout: React.FC<{ children: React.ReactNode; activeTab: string; setActiveTab: (tab: string) => void }> = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 transition-transform duration-300 lg:translate-x-0",
        !isSidebarOpen && "-translate-x-full"
      )}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Activity className="text-zinc-950" size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">TradeWise AI</h1>
        </div>

        <nav className="px-4 space-y-2 mt-4">
          <NavItem icon={TrendingUp} label="Market" active={activeTab === 'market'} onClick={() => setActiveTab('market')} />
          <NavItem icon={Briefcase} label="Portfolio" active={activeTab === 'portfolio'} onClick={() => setActiveTab('portfolio')} />
          <NavItem icon={HistoryIcon} label="Backtesting" active={activeTab === 'trading'} onClick={() => setActiveTab('trading')} />
          <NavItem icon={PieChart} label="AI Insights" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} />
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-4">
          <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm font-medium">Guest User</p>
                <p className="text-xs text-zinc-500">Free Account</p>
              </div>
            </div>
            <button className="w-full py-2 bg-emerald-500 text-zinc-950 text-xs font-bold rounded-lg hover:bg-emerald-400 transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-bottom border-zinc-800 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="lg:hidden p-2 text-zinc-400 hover:text-zinc-100"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="Search stocks, indices..." 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-400 hover:text-zinc-100 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-zinc-950"></span>
            </button>
            <div className="h-8 w-[1px] bg-zinc-800"></div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-emerald-500">₹1,000,000.00</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Virtual</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
