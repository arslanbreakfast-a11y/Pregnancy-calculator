import { useState, useId, type FormEvent } from 'react';
import { 
  Clock, 
  Calendar, 
  Baby, 
  Ruler, 
  Scale, 
  Heart, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Search 
} from 'lucide-react';
import { PREGNANCY_WEEKS_DATA } from '../data/pregnancyWeeks';
import { parseISODateString, differenceInDays, normalizeDate, toISODateString, addDays } from '../utils/calculator';

export function PregnancyWeekView() {
  const lmpInputId = useId();
  const [lmpDate, setLmpDate] = useState<string>('');
  const [selectedWeek, setSelectedWeek] = useState<number>(24);
  const [calculatedWeek, setCalculatedWeek] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const today = normalizeDate(new Date());
  const maxDate = toISODateString(today);

  const handleCalculateFromLmp = (e: FormEvent) => {
    e.preventDefault();
    if (!lmpDate) {
      setErrorMsg('Please select your last menstrual period date.');
      return;
    }
    const lmp = parseISODateString(lmpDate);
    if (lmp > today) {
      setErrorMsg('The selected date cannot be in the future.');
      return;
    }
    const daysPregnant = differenceInDays(lmp, today);
    if (daysPregnant > 308) {
      setErrorMsg('The selected date is over 44 weeks ago.');
      return;
    }
    setErrorMsg(null);
    const week = Math.min(42, Math.max(1, Math.floor(daysPregnant / 7)));
    setCalculatedWeek(week);
    setSelectedWeek(week);
  };

  const handleQuickSample = () => {
    // 24 weeks ago
    const sample = toISODateString(addDays(today, -168));
    setLmpDate(sample);
    setErrorMsg(null);
    setCalculatedWeek(24);
    setSelectedWeek(24);
  };

  const weekInfo = PREGNANCY_WEEKS_DATA[selectedWeek] || PREGNANCY_WEEKS_DATA[24];

  // Filter weeks by search (e.g. "cantaloupe", "heartbeat", "24")
  const filteredWeeks = Object.values(PREGNANCY_WEEKS_DATA).filter((w) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      w.week.toString() === q ||
      w.fruitComparison.toLowerCase().includes(q) ||
      w.trimesterLabel.toLowerCase().includes(q) ||
      w.milestoneNotes.toLowerCase().includes(q)
    );
  });

  return (
    <div id="pregnancy-week-view" className="max-w-5xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200/80 text-xs font-semibold mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>Week-by-Week Pregnancy Guide</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Pregnancy Week Calculator &amp; Guide
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Calculate your exact pregnancy week from your LMP date, or browse any week from 1 to 42 to explore baby development and bodily changes.
        </p>
      </div>

      {/* Week Calculator Input Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-lg shadow-purple-50 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-600" />
            <span>Calculate Pregnancy Week from LMP</span>
          </h3>
          <button
            type="button"
            onClick={handleQuickSample}
            className="text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-lg border border-purple-200"
          >
            Try Sample (Week 24)
          </button>
        </div>

        <form onSubmit={handleCalculateFromLmp} className="space-y-4">
          <div>
            <label htmlFor={lmpInputId} className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              First Day of Last Menstrual Period
            </label>
            <input
              id={lmpInputId}
              type="date"
              max={maxDate}
              value={lmpDate}
              onChange={(e) => {
                setLmpDate(e.target.value);
                setErrorMsg(null);
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 bg-white focus:ring-3 focus:ring-purple-100 focus:border-purple-400 outline-hidden text-base font-medium"
              required
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Clock className="w-4 h-4" />
            <span>Determine Pregnancy Week</span>
          </button>
        </form>

        {calculatedWeek !== null && (
          <div className="mt-5 p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center animate-in fade-in">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-600">Calculated Gestational Age</div>
            <div className="text-2xl sm:text-3xl font-black text-purple-950 mt-1">
              Week {calculatedWeek} of Pregnancy
            </div>
            <div className="text-xs text-purple-700 mt-0.5">
              Showing detailed development information below for Week {calculatedWeek}
            </div>
          </div>
        )}
      </div>

      {/* Week Selector Ribbon */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">Select Any Pregnancy Week (1–42)</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700">
              Viewing: Week {selectedWeek}
            </span>
          </div>

          {/* Quick search */}
          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search week or fruit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
            />
          </div>
        </div>

        {/* Scrollable / Grid Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {filteredWeeks.map((w) => (
            <button
              key={w.week}
              onClick={() => setSelectedWeek(w.week)}
              className={`shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-2xl border transition-all text-center ${
                selectedWeek === w.week
                  ? 'bg-rose-500 text-white border-rose-500 font-bold shadow-md shadow-rose-200 scale-105'
                  : calculatedWeek === w.week
                  ? 'bg-purple-50 text-purple-800 border-purple-300 font-semibold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className="text-base">{w.fruitEmoji}</span>
              <span className="text-xs mt-0.5">W{w.week}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Week Details Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                {weekInfo.trimesterLabel}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {weekInfo.week <= 13 ? 'Weeks 1–13' : weekInfo.week <= 27 ? 'Weeks 14–27' : 'Weeks 28–42'}
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              Week {weekInfo.week} of Pregnancy
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
              disabled={selectedWeek <= 1}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              aria-label="Previous week"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold text-slate-700 px-2">
              Week {selectedWeek} of 42
            </span>
            <button
              onClick={() => setSelectedWeek(Math.min(42, selectedWeek + 1))}
              disabled={selectedWeek >= 42}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              aria-label="Next week"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Baby size and dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 flex items-center gap-3.5">
            <span className="text-3xl">{weekInfo.fruitEmoji}</span>
            <div>
              <div className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Baby Size Equivalent</div>
              <div className="text-base font-bold text-slate-900">{weekInfo.fruitComparison}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center gap-3.5">
            <Ruler className="w-6 h-6 text-purple-600 shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">Estimated Length</div>
              <div className="text-base font-bold text-slate-900">
                {weekInfo.approxLengthCm} cm ({weekInfo.approxLengthInches} in)
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 flex items-center gap-3.5">
            <Scale className="w-6 h-6 text-pink-600 shrink-0" />
            <div>
              <div className="text-[11px] font-bold text-pink-600 uppercase tracking-wider">Estimated Weight</div>
              <div className="text-base font-bold text-slate-900">
                {weekInfo.approxWeightGrams >= 1000
                  ? `${(weekInfo.approxWeightGrams / 1000).toFixed(1)} kg`
                  : `${weekInfo.approxWeightGrams} g`}{' '}
                ({weekInfo.approxWeightOunces >= 16
                  ? `${(weekInfo.approxWeightOunces / 16).toFixed(1)} lbs`
                  : `${weekInfo.approxWeightOunces} oz`})
              </div>
            </div>
          </div>
        </div>

        {/* Development and Body changes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2 mb-3">
              <Baby className="w-5 h-5 text-rose-500" />
              <span>Baby Development Overview</span>
            </h4>
            <ul className="space-y-2.5">
              {weekInfo.developmentHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-base flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-purple-500" />
              <span>Common Pregnancy Changes (Mom)</span>
            </h4>
            <ul className="space-y-2.5">
              {weekInfo.maternalChanges.map((mc, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                  <span>{mc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Milestone Note */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs sm:text-sm text-amber-950">
          <span className="font-bold">General Milestone Information: </span>
          {weekInfo.milestoneNotes}
        </div>

        {/* Practical tips */}
        {weekInfo.practicalTips && weekInfo.practicalTips.length > 0 && (
          <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Helpful Tips for Week {weekInfo.week}
            </h4>
            <ul className="space-y-1.5">
              {weekInfo.practicalTips.map((tip, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-600 flex items-center gap-2">
                  <span className="text-rose-500">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
