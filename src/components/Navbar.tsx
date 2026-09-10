import { useState } from 'react';
import { Calendar, Heart, BookOpen, Clock, Info, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'calculator' | 'week' | 'duedate' | 'guide' | 'about';
  setActiveTab: (tab: 'calculator' | 'week' | 'duedate' | 'guide' | 'about') => void;
  onQuickSampleClick?: () => void;
}

export function Navbar({ activeTab, setActiveTab, onQuickSampleClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'calculator', label: 'Calculator', icon: Calendar },
    { id: 'week', label: 'Pregnancy Week', icon: Clock },
    { id: 'duedate', label: 'Due Date', icon: Sparkles },
    { id: 'guide', label: 'Pregnancy Guide', icon: BookOpen },
    { id: 'about', label: 'About', icon: Info },
  ] as const;

  const handleNavClick = (id: typeof navItems[number]['id']) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('calculator')}
            className="flex items-center gap-3 text-left group transition-transform focus:outline-none"
            aria-label="Go to Pregnancy Calculator Homepage"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-400 via-pink-400 to-purple-400 flex items-center justify-center text-white shadow-sm shadow-rose-200 group-hover:scale-105 transition-all">
              <Heart className="w-5 h-5 fill-white/30" />
            </div>
            <div>
              <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 block leading-tight">
                Pregnancy <span className="text-rose-500 font-extrabold">Calculator</span>
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:block">
                Clinical-Standard Due Date &amp; Week Guide
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-rose-50 text-rose-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-rose-500' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {onQuickSampleClick && (
              <button
                onClick={onQuickSampleClick}
                className="ml-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/60 transition-colors"
                title="Populate calculator with a sample 24-week date"
              >
                Sample 24-Wk
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-rose-50 text-rose-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-rose-500' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          {onQuickSampleClick && (
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onQuickSampleClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2.5 text-sm font-semibold rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100"
              >
                Load Sample 24-Week Pregnancy
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
