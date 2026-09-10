export type CalculationMethod = 'lmp' | 'conception' | 'ivf';

export type IvfTransferType = 'day3' | 'day5' | 'day6';

export interface CalculatorInputs {
  method: CalculationMethod;
  lmpDate: string;
  cycleLength: number;
  conceptionDate: string;
  transferDate: string;
  ivfType: IvfTransferType;
}

export interface PregnancyMilestone {
  id: string;
  week: number;
  title: string;
  description: string;
  estimatedDate: Date;
  isCompleted: boolean;
  isCurrent: boolean;
  trimester: 1 | 2 | 3;
}

export interface CalculationResult {
  estimatedDueDate: Date;
  pregnancyStartDate: Date; // Equivalent LMP date
  estimatedConceptionDate: Date;
  currentWeek: number;
  currentDay: number;
  totalDaysPregnant: number;
  currentTrimester: 1 | 2 | 3;
  trimesterName: string;
  pregnancyProgressPercentage: number;
  daysRemaining: number;
  approx12WeekDate: Date;
  approx20WeekDate: Date;
  approx28WeekDate: Date;
  approx37WeekDate: Date;
  fullTermDate: Date;
  milestones: PregnancyMilestone[];
  calculationMethod: CalculationMethod;
  cycleLength: number;
  inputDateString: string;
}

export interface WeekInfo {
  week: number;
  trimester: 1 | 2 | 3;
  trimesterLabel: string;
  fruitComparison: string;
  fruitEmoji: string;
  approxLengthCm: number;
  approxLengthInches: number;
  approxWeightGrams: number;
  approxWeightOunces: number;
  developmentHighlights: string[];
  maternalChanges: string[];
  milestoneNotes: string;
  practicalTips: string[];
}
