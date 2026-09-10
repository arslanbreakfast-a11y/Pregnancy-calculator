import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Baby, 
  Sparkles, 
  CheckCircle2, 
  Heart, 
  Share2, 
  Printer, 
  ChevronRight, 
  ChevronLeft, 
  Scale, 
  Ruler, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { CalculationResult } from '../types';
import { formatDate, formatShortDate } from '../utils/calculator';
import { PREGNANCY_WEEKS_DATA } from '../data/pregnancyWeeks';

interface ResultsViewProps {
  result: CalculationResult;
  onExploreWeek?: (weekNumber: number) => void;
}

export const TIMELINE_SEGMENTS = [
  { id: 'early', label: 'Early Pregnancy', weeks: 'Week 1–4', start: 1, end: 4, trimester: 1 },
  { id: 't1_mid', label: 'First Trimester', weeks: 'Week 5–8', start: 5, end: 8, trimester: 1 },
  { id: 't1_late', label: 'First Trimester', weeks: 'Week 9–13', start: 9, end: 13, trimester: 1 },
  { id: 't2', label: 'Second Trimester', weeks: 'Week 14–27', start: 14, end: 27, trimester: 2 },
  { id: 't3', label: 'Third Trimester', weeks: 'Week 28–40', start: 28, end: 40, trimester: 3 },
];

export function ResultsView({ result, onExploreWeek }: ResultsViewProps) {
  const [selectedWeek, setSelectedWeek] = useState<number>(() => {
    // Clamp between 1 and 42
    return Math.min(42, Math.max(1, result.currentWeek || 1));
  });
  const [copied, setCopied] = useState(false);

  // Get week data for selected week
  const currentWeekData = PREGNANCY_WEEKS_DATA[selectedWeek] || PREGNANCY_WEEKS_DATA[24];

  const handleShare = async () => {
    const text = `Pregnancy Due Date: ${formatDate(result.estimatedDueDate)} (${result.currentWeek} Weeks, ${result.currentDay} Days pregnant) - Calculated via Pregnancy Calculator`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isCurrentWeekSelected = selectedWeek === result.currentWeek;

  return (
    <div id="pregnancy-results-section" className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <span className="text-xs font-bold tracking-wider uppercase text-rose-500">
            Calculation Results
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Pregnancy Summary
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            aria-label="Share or copy calculation results"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            aria-label="Print pregnancy summary"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Primary Key Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Estimated Due Date */}
        <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 rounded-3xl p-6 text-white shadow-lg shadow-rose-200/50 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between text-rose-100 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Your Estimated Due Date</span>
              <Calendar className="w-4 h-4 text-rose-100" />
            </div>
            <div className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              {formatDate(result.estimatedDueDate)}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/20 text-xs font-medium text-rose-50 flex items-center justify-between">
            <span>{formatShortDate(result.estimatedDueDate)} (Full Term)</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full font-bold">Week 40</span>
          </div>
        </div>

        {/* Card 2: Current Gestational Age */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>You Are Currently</span>
              <Baby className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              {result.currentWeek} Weeks, {result.currentDay} {result.currentDay === 1 ? 'Day' : 'Days'}
            </div>
            <div className="text-sm font-semibold text-purple-700 mt-1">
              Pregnant
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Total elapsed:</span>
            <span className="font-bold text-slate-700">{result.totalDaysPregnant} days</span>
          </div>
        </div>

        {/* Card 3: Trimester */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Trimester</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              {result.trimesterName}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              {result.currentTrimester === 1 && 'Weeks 1–13 (Organogenesis & Early Growth)'}
              {result.currentTrimester === 2 && 'Weeks 14–27 (The Golden Trimester)'}
              {result.currentTrimester === 3 && 'Weeks 28–40 (Final Growth & Preparation)'}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs flex items-center justify-between">
            <span className="text-slate-500">Trimester Stage:</span>
            <span className="font-bold text-slate-700">Stage {result.currentTrimester} of 3</span>
          </div>
        </div>

        {/* Card 4: Days Remaining */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Days Remaining</span>
              <Clock className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              {result.daysRemaining} Days
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              Until estimated delivery date
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Weeks left:</span>
            <span className="font-bold text-slate-700">~{Math.ceil(result.daysRemaining / 7)} Weeks</span>
          </div>
        </div>

        {/* Card 5: Pregnancy Progress */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Pregnancy Progress</span>
              <span className="text-xs font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                {result.pregnancyProgressPercentage}%
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              {result.pregnancyProgressPercentage}% Complete
            </div>
            {/* Visual Progress bar inside card */}
            <div className="w-full bg-slate-100 rounded-full h-3 mt-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(1, result.pregnancyProgressPercentage))}%` }}
              />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Standard duration:</span>
            <span className="font-bold text-slate-700">280 Days (40 Wks)</span>
          </div>
        </div>

        {/* Card 6: Estimated Conception Date */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Estimated Conception</span>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              {formatDate(result.estimatedConceptionDate)}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              Approximate ovulation &amp; fertilization window
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Cycle length:</span>
            <span className="font-bold text-slate-700">{result.cycleLength} Days</span>
          </div>
        </div>
      </div>

      {/* SECTION 4: Visual Pregnancy Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>Pregnancy Timeline</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                Current: Week {result.currentWeek}
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Visual roadmap of your 40-week pregnancy journey
            </p>
          </div>

          <div className="text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/70 inline-block self-start sm:self-auto">
            Highlighted pin shows your current stage
          </div>
        </div>

        {/* Big visual progress timeline bar */}
        <div className="space-y-4">
          {/* Progress bar container */}
          <div className="relative pt-6 pb-2">
            {/* Current week floating indicator pill */}
            <div
              className="absolute top-0 transform -translate-x-1/2 transition-all duration-300 z-10 hidden sm:block"
              style={{
                left: `${Math.min(97, Math.max(3, (result.currentWeek / 40) * 100))}%`
              }}
            >
              <div className="flex flex-col items-center">
                <span className="bg-rose-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-md whitespace-nowrap">
                  Week {result.currentWeek} (You)
                </span>
                <div className="w-1.5 h-1.5 bg-rose-600 rotate-45 -mt-0.5" />
              </div>
            </div>

            {/* Background track */}
            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden flex shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.max(1, (result.currentWeek / 40) * 100))}%`
                }}
              />
            </div>
          </div>

          {/* Timeline segments according to Requirement 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 pt-2">
            {TIMELINE_SEGMENTS.map((seg) => {
              const isCurrentSegment =
                result.currentWeek >= seg.start && result.currentWeek <= seg.end;
              const isPassed = result.currentWeek > seg.end;

              return (
                <div
                  key={seg.id}
                  className={`p-3 rounded-2xl border transition-all text-left ${
                    isCurrentSegment
                      ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-200 shadow-sm'
                      : isPassed
                      ? 'bg-emerald-50/40 border-emerald-200/60'
                      : 'bg-slate-50/60 border-slate-200/60 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-extrabold text-slate-800">{seg.weeks}</span>
                    {isPassed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : isCurrentSegment ? (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    ) : null}
                  </div>
                  <div className="text-xs font-semibold text-slate-600 truncate">{seg.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {isCurrentSegment ? '★ Current Stage' : isPassed ? 'Completed' : 'Upcoming'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 6: Pregnancy Week Information (for current week or selected week) */}
      <div className="bg-gradient-to-br from-white to-rose-50/30 rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-rose-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                {currentWeekData.trimesterLabel}
              </span>
              {isCurrentWeekSelected && (
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                  Your Current Week
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Week {currentWeekData.week} of Pregnancy
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Educational development overview &amp; body changes
            </p>
          </div>

          {/* Week navigator */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
              disabled={selectedWeek <= 1}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous week"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value, 10))}
              className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-bold text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-300 cursor-pointer"
              aria-label="Select week to view"
            >
              {Array.from({ length: 42 }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w}>
                  Week {w} {w === result.currentWeek ? '(Current)' : ''}
                </option>
              ))}
            </select>

            <button
              onClick={() => setSelectedWeek(Math.min(42, selectedWeek + 1))}
              disabled={selectedWeek >= 42}
              className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next week"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Baby Size Card & Measurements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Fruit/Veggie Comparison */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex items-center gap-4 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-3xl shrink-0">
              {currentWeekData.fruitEmoji}
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Baby Size Comparison
              </div>
              <div className="text-base sm:text-lg font-bold text-slate-900">
                {currentWeekData.fruitComparison}
              </div>
            </div>
          </div>

          {/* Approx Length */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex items-center gap-4 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <Ruler className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Approximate Length
              </div>
              <div className="text-base sm:text-lg font-bold text-slate-900">
                {currentWeekData.approxLengthCm} cm{' '}
                <span className="text-sm font-normal text-slate-500">
                  ({currentWeekData.approxLengthInches} in)
                </span>
              </div>
            </div>
          </div>

          {/* Approx Weight */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 flex items-center gap-4 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 shrink-0">
              <Scale className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Approximate Weight
              </div>
              <div className="text-base sm:text-lg font-bold text-slate-900">
                {currentWeekData.approxWeightGrams >= 1000
                  ? `${(currentWeekData.approxWeightGrams / 1000).toFixed(1)} kg`
                  : `${currentWeekData.approxWeightGrams} g`}{' '}
                <span className="text-sm font-normal text-slate-500">
                  ({currentWeekData.approxWeightOunces >= 16
                    ? `${(currentWeekData.approxWeightOunces / 16).toFixed(1)} lbs`
                    : `${currentWeekData.approxWeightOunces} oz`})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Week Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Baby Development */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Baby className="w-5 h-5 text-rose-500" />
              <span>Baby Development Overview</span>
            </h4>
            <ul className="space-y-2.5">
              {currentWeekData.developmentHighlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mother's Body Changes */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
            <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-purple-500" />
              <span>Common Pregnancy Changes</span>
            </h4>
            <ul className="space-y-2.5">
              {currentWeekData.maternalChanges.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Milestone note callout */}
        <div className="mt-6 p-4 rounded-2xl bg-rose-50/70 border border-rose-200/60 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-rose-950 leading-relaxed">
            <strong>General Milestone Information:</strong> {currentWeekData.milestoneNotes}
          </div>
        </div>
      </div>

      {/* SECTION 5: Important Milestones Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Important Pregnancy Milestones</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700">
              Personalized to Your Dates
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Key medical checkpoints and developmental milestones calculated from your pregnancy start date
          </p>
        </div>

        {/* Milestones Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {result.milestones.map((m) => (
            <div
              key={m.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                m.isCurrent
                  ? 'bg-rose-50/70 border-rose-300 ring-2 ring-rose-200'
                  : m.isCompleted
                  ? 'bg-slate-50/80 border-slate-200/80'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700">
                      Week {m.week}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      T{m.trimester}
                    </span>
                    {m.isCompleted && (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    )}
                    {m.isCurrent && (
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                        Current Window
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1.5">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-slate-900">
                    {formatShortDate(m.estimatedDate)}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {formatDate(m.estimatedDate, true).split(',')[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Date Summary table for quick reference */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Quick Milestone Dates Reference
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="text-[11px] text-slate-500">12-Week Date</div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                {formatShortDate(result.approx12WeekDate)}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="text-[11px] text-slate-500">20-Week Scan</div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                {formatShortDate(result.approx20WeekDate)}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="text-[11px] text-slate-500">28-Week (T3 Start)</div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                {formatShortDate(result.approx28WeekDate)}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="text-[11px] text-slate-500">37-Week (Early Term)</div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                {formatShortDate(result.approx37WeekDate)}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80">
              <div className="text-[11px] text-rose-700 font-semibold">Estimated Due Date</div>
              <div className="text-xs sm:text-sm font-bold text-rose-950 mt-0.5">
                {formatShortDate(result.estimatedDueDate)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 14: Mandatory Medical Disclaimer */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <span className="font-bold">Disclaimer:</span> This pregnancy calculator provides an estimated due date and pregnancy timeline for informational purposes only. It is not a medical diagnosis or a substitute for professional medical advice. Due dates are estimates, and actual delivery dates may vary. Please consult a qualified healthcare professional for medical guidance and pregnancy care.
        </div>
      </div>
    </div>
  );
}
