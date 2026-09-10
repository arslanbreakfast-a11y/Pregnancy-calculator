import { useState, useId, type FormEvent } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  HelpCircle, 
  Baby, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';
import { CalculationMethod, IvfTransferType } from '../types';
import { 
  parseISODateString, 
  addDays, 
  formatDate, 
  formatShortDate, 
  toISODateString, 
  normalizeDate 
} from '../utils/calculator';

export function DueDateView() {
  const lmpId = useId();
  const cycleId = useId();
  const conceptionId = useId();
  const transferId = useId();

  const [method, setMethod] = useState<CalculationMethod>('lmp');
  const [lmpDate, setLmpDate] = useState<string>('');
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [conceptionDate, setConceptionDate] = useState<string>('');
  const [transferDate, setTransferDate] = useState<string>('');
  const [ivfType, setIvfType] = useState<IvfTransferType>('day5');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [calculatedResult, setCalculatedResult] = useState<{
    dueDate: Date;
    earlyTermDate: Date; // 37 weeks
    fullTermWindowStart: Date; // 39 weeks
    postTermDate: Date; // 41 weeks
    conceptionEstimate: Date;
    methodUsed: string;
  } | null>(null);

  const todayStr = toISODateString(normalizeDate(new Date()));

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    let dueDate: Date;
    let conceptionEstimate: Date;
    let methodUsed = '';

    if (method === 'lmp') {
      if (!lmpDate) {
        setErrorMessage('Please select your Last Menstrual Period date.');
        return;
      }
      const lmp = parseISODateString(lmpDate);
      const cycle = cycleLength || 28;
      const cycleDiff = cycle - 28;
      dueDate = addDays(lmp, 280 + cycleDiff);
      conceptionEstimate = addDays(lmp, Math.max(1, cycle - 14));
      methodUsed = `LMP Method (${cycle}-day cycle)`;
    } else if (method === 'conception') {
      if (!conceptionDate) {
        setErrorMessage('Please select your estimated Conception date.');
        return;
      }
      const conception = parseISODateString(conceptionDate);
      dueDate = addDays(conception, 266);
      conceptionEstimate = conception;
      methodUsed = 'Conception Date Method (266 days post-ovulation)';
    } else {
      if (!transferDate) {
        setErrorMessage('Please select your Embryo Transfer date.');
        return;
      }
      const transfer = parseISODateString(transferDate);
      if (ivfType === 'day3') {
        dueDate = addDays(transfer, 263);
        conceptionEstimate = addDays(transfer, -3);
        methodUsed = 'IVF Day 3 Embryo Transfer';
      } else if (ivfType === 'day6') {
        dueDate = addDays(transfer, 260);
        conceptionEstimate = addDays(transfer, -6);
        methodUsed = 'IVF Day 6 Blastocyst Transfer';
      } else {
        dueDate = addDays(transfer, 261);
        conceptionEstimate = addDays(transfer, -5);
        methodUsed = 'IVF Day 5 Blastocyst Transfer';
      }
    }

    const earlyTermDate = addDays(dueDate, -21); // 37 weeks (21 days prior to 40 weeks)
    const fullTermWindowStart = addDays(dueDate, -7); // 39 weeks
    const postTermDate = addDays(dueDate, 7); // 41 weeks

    setCalculatedResult({
      dueDate,
      earlyTermDate,
      fullTermWindowStart,
      postTermDate,
      conceptionEstimate,
      methodUsed
    });
  };

  const handleQuickSample = () => {
    // Set 24 weeks ago
    const sample = toISODateString(addDays(new Date(), -168));
    setLmpDate(sample);
    setCycleLength(28);
    setMethod('lmp');
    setErrorMessage(null);
  };

  return (
    <div id="due-date-calculator-view" className="max-w-4xl mx-auto px-4 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Accurate Gestational Age Modeling</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Dedicated Due Date Calculator
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Calculate your estimated arrival date using your Last Menstrual Period, exact Conception date, or IVF Embryo Transfer timing.
        </p>
      </div>

      {/* Main Calculation Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xl shadow-rose-50">
        {/* Method Picker */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Choose Calculation Standard
          </div>
          <button
            type="button"
            onClick={handleQuickSample}
            className="text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-200"
          >
            Quick Sample Date
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
          <button
            type="button"
            onClick={() => {
              setMethod('lmp');
              setErrorMessage(null);
            }}
            className={`p-3 rounded-2xl border text-left transition-all ${
              method === 'lmp'
                ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-200 text-rose-950 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-500" />
              <span className="text-sm">1. Last Period (LMP)</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Based on first day of last cycle</div>
          </button>

          <button
            type="button"
            onClick={() => {
              setMethod('conception');
              setErrorMessage(null);
            }}
            className={`p-3 rounded-2xl border text-left transition-all ${
              method === 'conception'
                ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-200 text-rose-950 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-500" />
              <span className="text-sm">2. Conception Date</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Exact ovulation/fertilization</div>
          </button>

          <button
            type="button"
            onClick={() => {
              setMethod('ivf');
              setErrorMessage(null);
            }}
            className={`p-3 rounded-2xl border text-left transition-all ${
              method === 'ivf'
                ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-200 text-rose-950 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm">3. IVF / Embryo Transfer</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Day 3, 5, or 6 blastocyst</div>
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCalculate} className="space-y-6">
          {method === 'lmp' && (
            <div className="space-y-4">
              <div>
                <label htmlFor={lmpId} className="block text-sm font-semibold text-slate-800 mb-1">
                  First Day of Last Menstrual Period
                </label>
                <input
                  id={lmpId}
                  type="date"
                  max={todayStr}
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 bg-white focus:ring-3 focus:ring-rose-100 focus:border-rose-400 outline-hidden text-base font-medium"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor={cycleId} className="text-sm font-semibold text-slate-800">
                    Cycle Length (Days)
                  </label>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                    {cycleLength} Days
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={20}
                    max={45}
                    value={cycleLength}
                    onChange={(e) => setCycleLength(parseInt(e.target.value, 10))}
                    className="w-full accent-rose-500"
                  />
                  <input
                    id={cycleId}
                    type="number"
                    min={20}
                    max={45}
                    value={cycleLength}
                    onChange={(e) => setCycleLength(parseInt(e.target.value, 10) || 28)}
                    className="w-18 p-2 text-center rounded-xl border border-slate-300 font-bold text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {method === 'conception' && (
            <div className="space-y-4">
              <div>
                <label htmlFor={conceptionId} className="block text-sm font-semibold text-slate-800 mb-1">
                  Estimated Conception Date
                </label>
                <input
                  id={conceptionId}
                  type="date"
                  max={todayStr}
                  value={conceptionDate}
                  onChange={(e) => setConceptionDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 bg-white focus:ring-3 focus:ring-rose-100 focus:border-rose-400 outline-hidden text-base font-medium"
                  required
                />
              </div>
              <p className="text-xs text-slate-500">
                Pregnancy lasts 266 days (38 weeks) from conception.
              </p>
            </div>
          )}

          {method === 'ivf' && (
            <div className="space-y-4">
              <div>
                <label htmlFor={transferId} className="block text-sm font-semibold text-slate-800 mb-1">
                  Embryo Transfer Date
                </label>
                <input
                  id={transferId}
                  type="date"
                  max={todayStr}
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 bg-white focus:ring-3 focus:ring-rose-100 focus:border-rose-400 outline-hidden text-base font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Embryo Age at Transfer
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'day3', title: 'Day 3 Embryo', formula: 'Transfer + 263 days' },
                    { id: 'day5', title: 'Day 5 Blastocyst', formula: 'Transfer + 261 days' },
                    { id: 'day6', title: 'Day 6 Blastocyst', formula: 'Transfer + 260 days' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setIvfType(item.id as IvfTransferType)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        ivfType === item.id
                          ? 'border-pink-500 bg-pink-50/70 text-pink-900 font-bold ring-2 ring-pink-200'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{item.formula}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-base shadow-lg shadow-rose-200/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>Calculate Estimated Due Date</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Results Card */}
        {calculatedResult && (
          <div className="mt-8 pt-8 border-t border-slate-100 animate-in fade-in duration-300 space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white shadow-lg text-center relative overflow-hidden">
              <div className="text-xs font-bold uppercase tracking-widest text-rose-100 mb-1">
                Estimated Due Date (40 Weeks)
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight">
                {formatDate(calculatedResult.dueDate)}
              </div>
              <div className="text-xs text-rose-100 mt-2 font-medium">
                Calculated using: {calculatedResult.methodUsed}
              </div>
            </div>

            {/* Delivery Window Stages */}
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Baby className="w-4 h-4 text-rose-500" />
                <span>The Normal Full-Term Delivery Window</span>
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Did you know? Only ~4% of babies are born on their exact estimated due date. Most healthy deliveries safely occur between 37 and 42 weeks:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-700">Early Term (Week 37–38)</div>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    {formatShortDate(calculatedResult.earlyTermDate)}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Organs fully formed and ready for life outside womb
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 ring-1 ring-rose-200">
                  <div className="text-xs font-bold text-rose-800">Full Term (Week 39–40)</div>
                  <div className="text-base font-bold text-rose-950 mt-1">
                    {formatShortDate(calculatedResult.fullTermWindowStart)} – {formatShortDate(calculatedResult.dueDate)}
                  </div>
                  <div className="text-[11px] text-rose-700 mt-1">
                    Optimal developmental maturity &amp; lowest complication rates
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-700">Late Term (Week 41)</div>
                  <div className="text-base font-bold text-slate-900 mt-1">
                    {formatShortDate(calculatedResult.postTermDate)}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Close clinical monitoring begins if labor hasn’t started
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clinical Notes & FAQ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-600" />
          <span>How Medical Due Dates Are Calculated</span>
        </h3>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            <strong>Naegele&apos;s Rule:</strong> The standard clinical pregnancy formula assumes a normal human gestation of 280 days (40 completed weeks) starting from the first day of the last menstrual period, assuming a 28-day cycle with ovulation occurring on day 14.
          </p>
          <p>
            <strong>Cycle Length Adjustment:</strong> If your natural menstrual cycle is longer or shorter than 28 days, ovulation happens earlier or later than day 14. Our calculator corrects for this using the formula: <code>LMP + 280 days + (Cycle Length − 28 days)</code>.
          </p>
          <p>
            <strong>IVF Precision:</strong> Because the exact timing of egg retrieval, fertilization, and embryo transfer is known to the exact day and hour in IVF cycles, IVF-calculated due dates are often the most accurate gestational estimates available.
          </p>
        </div>
      </div>
    </div>
  );
}
