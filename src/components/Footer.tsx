import { Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'calculator' | 'week' | 'duedate' | 'guide' | 'about') => void;
}

export function Footer({ setActiveTab }: FooterProps) {
  const handleNav = (tab: 'calculator' | 'week' | 'duedate' | 'guide' | 'about') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 bg-white border-t border-rose-100/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-400 to-purple-400 flex items-center justify-center text-white shadow-xs">
                <Heart className="w-4 h-4 fill-white/30" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                Pregnancy <span className="text-rose-500">Calculator</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md">
              A modern, reliable obstetrical tool helping expecting families calculate their due date, current pregnancy week, trimester, and essential milestones with cycle-adjusted accuracy.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Evidence-based clinical formulas (ACOG &amp; Naegele&apos;s standards)</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Calculators &amp; Tools
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <button
                  onClick={() => handleNav('calculator')}
                  className="hover:text-rose-600 transition-colors text-left"
                >
                  Main Pregnancy Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('week')}
                  className="hover:text-rose-600 transition-colors text-left"
                >
                  Pregnancy Week Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('duedate')}
                  className="hover:text-rose-600 transition-colors text-left"
                >
                  Due Date Calculator (IVF &amp; LMP)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('guide')}
                  className="hover:text-rose-600 transition-colors text-left"
                >
                  Trimester Pregnancy Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Educational Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Resources &amp; Support
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-rose-600 transition-colors text-left"
                >
                  Calculation Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-rose-600 transition-colors text-left"
                >
                  Medical Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('guide')}
                  className="hover:text-rose-600 transition-colors text-left"
                >
                  When to Call Your Doctor
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Medical Disclaimer Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-8 text-xs text-amber-900 leading-relaxed">
          <p>
            <strong className="font-semibold text-amber-950">Disclaimer:</strong> This pregnancy calculator provides an estimated due date and pregnancy timeline for informational purposes only. It is not a medical diagnosis or a substitute for professional medical advice. Due dates are estimates, and actual delivery dates may vary. Please consult a qualified healthcare professional for medical guidance and pregnancy care.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Pregnancy Calculator. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Built with care for mothers and families</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
