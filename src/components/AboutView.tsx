import { ShieldCheck, Info, Heart, BookOpen, AlertTriangle } from 'lucide-react';

export function AboutView() {
  return (
    <div id="about-pregnancy-calculator-view" className="max-w-4xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 text-xs font-semibold mb-3">
          <Info className="w-3.5 h-3.5" />
          <span>About &amp; Clinical Methodology</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About Pregnancy Calculator
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Designed with medical precision, compassionate guidance, and modern evidence-based obstetrical standards.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6 text-slate-700">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-rose-500" />
            <span>Our Mission</span>
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">
            <strong>Pregnancy Calculator</strong> was crafted to provide expecting parents, partners, and healthcare educators with an accessible, reliable, and beautifully designed digital tool to track their pregnancy timeline. We turn complex obstetrical calendar calculations into clear, actionable, and comforting insights.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Scientific &amp; Mathematical Calculation Standards</span>
          </h3>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                1. Standard Last Menstrual Period (LMP) &amp; Naegele&apos;s Rule
              </h4>
              <p>
                In clinical obstetrics, gestational age is measured from the first day of your last normal menstrual period (LMP). Standard human pregnancy averages 280 days (40 full weeks or 10 lunar months).
              </p>
              <div className="mt-2 p-2.5 bg-white rounded-xl border border-slate-200 font-mono text-xs text-rose-700">
                Estimated Due Date = LMP + 280 days + (Cycle Length − 28 days)
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                2. Average Menstrual Cycle Length Adjustment
              </h4>
              <p>
                Standard formulas assume a 28-day cycle with ovulation on day 14. If a mother has a 32-day cycle, ovulation usually occurs on day 18 (4 days later). Our tool automatically shifts the estimated due date by adding or subtracting the variance to prevent premature induction anxiety.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                3. Conception Date Calculation
              </h4>
              <p>
                When the exact conception or ovulation date is known, pregnancy is calculated as 266 days (38 weeks) from conception date to delivery.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                4. IVF / Assisted Reproductive Technology (ART)
              </h4>
              <p>
                For embryo transfers, calculation accounts for the exact age of the embryo: Day 3 transfer adds 263 days, Day 5 blastocyst transfer adds 261 days, and Day 6 blastocyst adds 260 days.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span>Why Only ~4% Deliver on Their Exact Due Date</span>
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">
            A due date is best understood as a central guidepost rather than an exact deadline. A normal, healthy full-term birth naturally occurs anywhere between 37 weeks, 0 days and 41 weeks, 6 days. First-time mothers frequently deliver a few days past 40 weeks.
          </p>
        </div>
      </div>

      {/* Mandatory Medical Disclaimer Card */}
      <div className="bg-amber-50/70 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-2xl bg-amber-200/70 text-amber-800 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-amber-950">
              Medical Disclaimer &amp; Terms of Use
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              This pregnancy calculator provides an estimated due date and pregnancy timeline for informational purposes only. It is not a medical diagnosis or a substitute for professional medical advice. Due dates are estimates, and actual delivery dates may vary. Please consult a qualified healthcare professional for medical guidance and pregnancy care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
