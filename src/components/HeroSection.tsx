import { CalendarDays, Sparkles, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative py-8 md:py-12 text-center max-w-3xl mx-auto px-4">
      {/* Decorative subtle backdrop glows */}
      <div 
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-r from-rose-200/40 via-purple-200/30 to-pink-200/40 blur-3xl rounded-full -z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/70 text-rose-700 text-xs font-semibold mb-4 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-rose-500" />
        <span>Evidence-Based Pregnancy Calculator</span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600">Pregnancy Due Date</span>
      </h1>

      <p className="mt-3.5 sm:mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
        Estimate your due date, pregnancy week, trimester, and important milestones in seconds.
      </p>

      {/* Trust badges */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>ACOG Clinical Standard</span>
        </div>
        <div className="hidden sm:inline text-slate-300">•</div>
        <div className="flex items-center gap-1.5">
          <CalendarDays className="w-4 h-4 text-rose-400" />
          <span>Adjusts for Menstrual Cycle</span>
        </div>
        <div className="hidden sm:inline text-slate-300">•</div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Week 1 to 42 Baby Milestones</span>
        </div>
      </div>
    </div>
  );
}
