import { useState, useId, type Dispatch, type SetStateAction } from 'react';
import { 
  Calendar, 
  HelpCircle, 
  AlertCircle, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  Baby, 
  Clock 
} from 'lucide-react';
import { CalculationMethod, CalculatorInputs, IvfTransferType } from '../types';
import { toISODateString, addDays } from '../utils/calculator';

interface CalculatorCardProps {
  inputs: CalculatorInputs;
  setInputs: Dispatch<SetStateAction<CalculatorInputs>>;
  onCalculate: () => void;
  errorMessage?: string;
  setErrorMessage: (msg: string | undefined) => void;
}

export function CalculatorCard({
  inputs,
  setInputs,
  onCalculate,
  errorMessage,
  setErrorMessage
}: CalculatorCardProps) {
  const lmpInputId = useId();
  const cycleInputId = useId();
  const conceptionInputId = useId();
  const transferInputId = useId();
  const [showCycleHelp, setShowCycleHelp] = useState(false);

  // Maximum allowed date is today
  const todayStr = toISODateString(new Date());

  const handleMethodChange = (newMethod: CalculationMethod) => {
    setErrorMessage(undefined);
    setInputs(prev => ({
      ...prev,
      method: newMethod
    }));
  };

  const handleLmpChange = (val: string) => {
    setErrorMessage(undefined);
    setInputs(prev => ({ ...prev, lmpDate: val }));
  };

  const handleCycleChange = (val: number) => {
    setErrorMessage(undefined);
    setInputs(prev => ({ ...prev, cycleLength: val }));
  };

  const handleConceptionChange = (val: string) => {
    setErrorMessage(undefined);
    setInputs(prev => ({ ...prev, conceptionDate: val }));
  };

  const handleTransferChange = (val: string) => {
    setErrorMessage(undefined);
    setInputs(prev => ({ ...prev, transferDate: val }));
  };

  const handleIvfTypeChange = (val: IvfTransferType) => {
    setErrorMessage(undefined);
    setInputs(prev => ({ ...prev, ivfType: val }));
  };

  // Helper to load sample 24-week date
  const loadSample24Weeks = () => {
    setErrorMessage(undefined);
    // 24 weeks ago = 168 days ago
    const sampleDate = addDays(new Date(), -168);
    const dateStr = toISODateString(sampleDate);

    if (inputs.method === 'lmp') {
      setInputs(prev => ({ ...prev, lmpDate: dateStr, cycleLength: 28 }));
    } else if (inputs.method === 'conception') {
      // 22 weeks ago from conception
      const concDate = addDays(new Date(), -154);
      setInputs(prev => ({ ...prev, conceptionDate: toISODateString(concDate) }));
    } else {
      const ivfDate = addDays(new Date(), -149);
      setInputs(prev => ({ ...prev, transferDate: toISODateString(ivfDate), ivfType: 'day5' }));
    }
  };

  const handleReset = () => {
    setErrorMessage(undefined);
    setInputs({
      method: 'lmp',
      lmpDate: '',
      cycleLength: 28,
      conceptionDate: '',
      transferDate: '',
      ivfType: 'day5'
    });
  };

  return (
    <div id="calculator-card" className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-rose-100/50 border border-rose-100 relative">
      {/* Subtle top pill indicator */}
      <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
        <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm">
          <Baby className="w-5 h-5" />
          <span>Pregnancy Calculator</span>
        </div>

        <button
          type="button"
          onClick={loadSample24Weeks}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg border border-purple-200/60 transition-colors"
          title="Fill with sample 24-week pregnancy"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Try Sample (24 Weeks)</span>
        </button>
      </div>

      {/* Calculation Method Selection */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Calculation Method
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-200/70">
          <button
            type="button"
            id="method-btn-lmp"
            onClick={() => handleMethodChange('lmp')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              inputs.method === 'lmp'
                ? 'bg-white text-rose-700 shadow-sm border border-rose-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <Calendar className="w-4 h-4 text-rose-500" />
            <span>Last Period (LMP)</span>
          </button>

          <button
            type="button"
            id="method-btn-conception"
            onClick={() => handleMethodChange('conception')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              inputs.method === 'conception'
                ? 'bg-white text-rose-700 shadow-sm border border-rose-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <Clock className="w-4 h-4 text-purple-500" />
            <span>Conception Date</span>
          </button>

          <button
            type="button"
            id="method-btn-ivf"
            onClick={() => handleMethodChange('ivf')}
            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${
              inputs.method === 'ivf'
                ? 'bg-white text-rose-700 shadow-sm border border-rose-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>IVF / Transfer</span>
          </button>
        </div>
      </div>

      {/* Inputs Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCalculate();
        }}
        noValidate
        className="space-y-6"
      >
        {/* OPTION A: LMP */}
        {inputs.method === 'lmp' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <label 
                htmlFor={lmpInputId} 
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                First Day of Last Menstrual Period (LMP) <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Select the first day of bleeding during your most recent period.
              </p>
              <div className="relative">
                <input
                  id={lmpInputId}
                  type="date"
                  max={todayStr}
                  value={inputs.lmpDate}
                  onChange={(e) => handleLmpChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 bg-white shadow-2xs focus:border-rose-400 focus:ring-3 focus:ring-rose-100 text-base font-medium outline-hidden transition-all"
                  required
                />
              </div>
            </div>

            {/* Menstrual Cycle Length */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <label 
                  htmlFor={cycleInputId}
                  className="text-sm font-semibold text-slate-800 flex items-center gap-1.5"
                >
                  <span>Average Cycle Length</span>
                  <button
                    type="button"
                    onClick={() => setShowCycleHelp(!showCycleHelp)}
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label="Information about menstrual cycle length"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </label>
                <span className="text-sm font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-100">
                  {inputs.cycleLength || 28} Days
                </span>
              </div>

              {showCycleHelp && (
                <div className="p-3 mb-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed">
                  The menstrual cycle length is counted from the first day of one period to the first day of the next. The clinical average is 28 days. Cycles commonly range between 21 and 35 days.
                </div>
              )}

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={20}
                  max={45}
                  value={inputs.cycleLength || 28}
                  onChange={(e) => handleCycleChange(parseInt(e.target.value, 10))}
                  className="w-full accent-rose-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  aria-label="Cycle length range slider"
                />
                <input
                  id={cycleInputId}
                  type="number"
                  min={20}
                  max={45}
                  value={inputs.cycleLength || 28}
                  onChange={(e) => handleCycleChange(parseInt(e.target.value, 10) || 28)}
                  className="w-20 px-3 py-2 rounded-xl border border-slate-300 text-slate-900 bg-white text-center font-bold text-sm focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-hidden"
                />
              </div>

              {/* Quick Cycle Presets */}
              <div className="flex items-center gap-2 mt-2.5">
                <span className="text-xs text-slate-400">Quick presets:</span>
                {[26, 28, 30, 32].map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => handleCycleChange(len)}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                      inputs.cycleLength === len
                        ? 'bg-rose-500 text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {len} days {len === 28 ? '(Default)' : ''}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OPTION B: CONCEPTION DATE */}
        {inputs.method === 'conception' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label 
                htmlFor={conceptionInputId} 
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Estimated Conception Date <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Enter the date of ovulation or intercourse that led to conception.
              </p>
              <input
                id={conceptionInputId}
                type="date"
                max={todayStr}
                value={inputs.conceptionDate}
                onChange={(e) => handleConceptionChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 bg-white shadow-2xs focus:border-rose-400 focus:ring-3 focus:ring-rose-100 text-base font-medium outline-hidden transition-all"
                required
              />
            </div>
            <div className="p-3.5 bg-purple-50/70 border border-purple-200/60 rounded-xl text-xs text-purple-800 leading-relaxed">
              💡 <strong>Note:</strong> Conception usually takes place roughly 2 weeks after the start of a standard menstrual period. Pregnancy is calculated as 266 days (38 weeks) from conception.
            </div>
          </div>
        )}

        {/* OPTION C: IVF / EMBRYO TRANSFER */}
        {inputs.method === 'ivf' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label 
                htmlFor={transferInputId} 
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Embryo Transfer Date <span className="text-rose-500">*</span>
              </label>
              <input
                id={transferInputId}
                type="date"
                max={todayStr}
                value={inputs.transferDate}
                onChange={(e) => handleTransferChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 bg-white shadow-2xs focus:border-rose-400 focus:ring-3 focus:ring-rose-100 text-base font-medium outline-hidden transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Embryo Age at Transfer
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'day3', label: 'Day 3 Embryo', desc: 'Cleavage stage' },
                  { id: 'day5', label: 'Day 5 Blastocyst', desc: 'Most common' },
                  { id: 'day6', label: 'Day 6 Blastocyst', desc: 'Expanded blast' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleIvfTypeChange(type.id as IvfTransferType)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      inputs.ivfType === type.id
                        ? 'border-pink-500 bg-pink-50/80 text-pink-900 font-semibold ring-2 ring-pink-200'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold">{type.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Validation Error Banner */}
        {errorMessage && (
          <div 
            id="validation-error-alert" 
            role="alert" 
            className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm flex items-start gap-2.5 animate-in fade-in"
          >
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            id="calculate-pregnancy-button"
            className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:via-pink-600 hover:to-purple-700 text-white font-bold text-base shadow-lg shadow-rose-200/60 hover:shadow-xl hover:shadow-rose-300/60 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-rose-200"
          >
            <span>Calculate Pregnancy</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            type="button"
            id="reset-button"
            onClick={handleReset}
            className="w-full sm:w-auto py-3.5 px-4 rounded-2xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 text-sm font-semibold"
            title="Reset inputs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </form>
    </div>
  );
}
