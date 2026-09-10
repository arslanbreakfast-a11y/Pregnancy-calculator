import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CalculatorCard } from './components/CalculatorCard';
import { ResultsView } from './components/ResultsView';
import { PregnancyWeekView } from './components/PregnancyWeekView';
import { DueDateView } from './components/DueDateView';
import { PregnancyGuideView } from './components/PregnancyGuideView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';
import { CalculatorInputs, CalculationResult } from './types';
import { 
  calculatePregnancy, 
  validateInputs, 
  toISODateString, 
  addDays, 
  normalizeDate 
} from './utils/calculator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'week' | 'duedate' | 'guide' | 'about'>('calculator');

  // Initialize with a representative 24-week date so the user can immediately experience the calculated UI
  const [inputs, setInputs] = useState<CalculatorInputs>(() => {
    // 24 weeks + 3 days = 171 days ago
    const initialLmp = addDays(normalizeDate(new Date()), -171);
    return {
      method: 'lmp',
      lmpDate: toISODateString(initialLmp),
      cycleLength: 28,
      conceptionDate: '',
      transferDate: '',
      ivfType: 'day5'
    };
  });

  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [result, setResult] = useState<CalculationResult | null>(() => {
    const initialLmp = addDays(normalizeDate(new Date()), -171);
    return calculatePregnancy({
      method: 'lmp',
      lmpDate: toISODateString(initialLmp),
      cycleLength: 28,
      conceptionDate: '',
      transferDate: '',
      ivfType: 'day5'
    });
  });

  const handleCalculate = () => {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      setErrorMessage(validation.error);
      return;
    }

    setErrorMessage(undefined);
    const newResult = calculatePregnancy(inputs);
    setResult(newResult);

    // Smooth scroll down to results section
    setTimeout(() => {
      const resultsEl = document.getElementById('pregnancy-results-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleQuickSampleClick = () => {
    setActiveTab('calculator');
    const sampleLmp = addDays(normalizeDate(new Date()), -171);
    const newInputs: CalculatorInputs = {
      method: 'lmp',
      lmpDate: toISODateString(sampleLmp),
      cycleLength: 28,
      conceptionDate: '',
      transferDate: '',
      ivfType: 'day5'
    };
    setInputs(newInputs);
    setErrorMessage(undefined);
    const newResult = calculatePregnancy(newInputs);
    setResult(newResult);

    setTimeout(() => {
      const card = document.getElementById('calculator-card');
      if (card) {
        card.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-800 font-sans">
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onQuickSampleClick={handleQuickSampleClick} 
      />

      {/* Main Content Area based on active navigation tab */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'calculator' && (
          <div className="space-y-10 sm:space-y-14">
            {/* Hero Section */}
            <HeroSection />

            {/* Prominent Pregnancy Calculator Card */}
            <CalculatorCard
              inputs={inputs}
              setInputs={setInputs}
              onCalculate={handleCalculate}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />

            {/* Results Section */}
            {result && (
              <ResultsView 
                result={result} 
                onExploreWeek={(weekNum) => {
                  setActiveTab('week');
                }} 
              />
            )}
          </div>
        )}

        {activeTab === 'week' && <PregnancyWeekView />}

        {activeTab === 'duedate' && <DueDateView />}

        {activeTab === 'guide' && <PregnancyGuideView />}

        {activeTab === 'about' && <AboutView />}
      </main>

      {/* Trustworthy Application Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
