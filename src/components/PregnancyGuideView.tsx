import { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Heart, 
  Stethoscope, 
  ShieldAlert, 
  Clock 
} from 'lucide-react';
import { PREGNANCY_GUIDE_DATA, WHEN_TO_CALL_DOCTOR } from '../data/pregnancyGuide';

export function PregnancyGuideView() {
  const [activeTrimester, setActiveTrimester] = useState<1 | 2 | 3>(1);

  const currentGuide = PREGNANCY_GUIDE_DATA.find((g) => g.trimester === activeTrimester) || PREGNANCY_GUIDE_DATA[0];

  return (
    <div id="pregnancy-guide-view" className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Evidence-Based Pregnancy Education</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Comprehensive Pregnancy Guide
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Explore essential milestones, physical changes, medical screening appointments, and symptom care organized by trimester.
        </p>
      </div>

      {/* Trimester Tabs */}
      <div className="grid grid-cols-3 gap-2.5 max-w-2xl mx-auto p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        {[
          { t: 1 as const, name: '1st Trimester', weeks: 'Weeks 1–13' },
          { t: 2 as const, name: '2nd Trimester', weeks: 'Weeks 14–27' },
          { t: 3 as const, name: '3rd Trimester', weeks: 'Weeks 28–40' },
        ].map((item) => (
          <button
            key={item.t}
            onClick={() => setActiveTrimester(item.t)}
            className={`py-3 px-2 rounded-xl text-center transition-all ${
              activeTrimester === item.t
                ? 'bg-white text-rose-700 font-extrabold shadow-sm border border-rose-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <div className="text-xs sm:text-sm">{item.name}</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">{item.weeks}</div>
          </button>
        ))}
      </div>

      {/* Main Trimester Guide Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-8">
        {/* Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                {currentGuide.weeksSpan}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {currentGuide.theme}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              {currentGuide.name}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 self-start sm:self-auto">
            <Clock className="w-4 h-4" />
            <span>Trimester {currentGuide.trimester} of 3</span>
          </div>
        </div>

        {/* Overview */}
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
          {currentGuide.overview}
        </p>

        {/* Key Highlights */}
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Key Developmental Highlights</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentGuide.keyHighlights.map((hl, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-start gap-2.5 text-xs sm:text-sm text-purple-950">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Symptoms & Doctor-Approved Remedies */}
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Common Symptoms &amp; Safe Remedies</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentGuide.commonSymptoms.map((sym, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200">
                <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>{sym.symptom}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  <strong>Why it happens:</strong> {sym.explanation}
                </p>
                <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 text-xs text-rose-900 bg-rose-50/60 p-2.5 rounded-xl">
                  <strong>Relief Strategy:</strong> {sym.remedy}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Essential Clinical Checkups */}
        <div>
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
            <Stethoscope className="w-4 h-4 text-blue-600" />
            <span>Essential Medical Checkups &amp; Ultrasound Schedule</span>
          </h4>
          <div className="space-y-2.5">
            {currentGuide.essentialMedicalChecks.map((chk, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-100 flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <span>{chk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Do's and Don'ts */}
        <div>
          <h4 className="text-base font-bold text-slate-900 mb-3">
            Evidence-Based Guidelines (Do&apos;s &amp; Don&apos;ts)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Do's */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/70">
              <div className="text-sm font-bold text-emerald-900 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Recommended Practices</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                {currentGuide.doAndDont.do.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/70">
              <div className="text-sm font-bold text-rose-900 flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Things to Avoid</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-rose-950">
                {currentGuide.doAndDont.dont.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Red-Flag Urgent Guidance: When to Call the Doctor */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-sm">
        <div className="flex items-center gap-2.5 text-amber-900 mb-3">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
          <h3 className="text-lg font-bold">When to Call Your Healthcare Provider Immediately</h3>
        </div>
        <p className="text-xs sm:text-sm text-amber-800 mb-4">
          Always trust your instincts. If you experience any of the following warning signs, contact your OB/GYN, midwife, or visit labor &amp; delivery triage right away:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {WHEN_TO_CALL_DOCTOR.map((warning, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white/80 border border-amber-200 flex items-start gap-2 text-xs font-medium text-amber-950">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>{warning}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
