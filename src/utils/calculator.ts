import { CalculationMethod, CalculatorInputs, CalculationResult, PregnancyMilestone } from '../types';

/**
 * Normalizes a date to midnight local time to avoid timezone/DST drift
 */
export function normalizeDate(d: Date | string): Date {
  const date = typeof d === 'string' ? parseISODateString(d) : new Date(d);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Safely parses YYYY-MM-DD string into a local Date without UTC offset shifts
 */
export function parseISODateString(dateStr: string): Date {
  if (!dateStr) return new Date();
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day, 0, 0, 0, 0);
  }
  return new Date(dateStr);
}

/**
 * Formats a Date into YYYY-MM-DD string for HTML5 date inputs
 */
export function toISODateString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Adds days to a date safely
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + Math.round(days));
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Calculates the difference in whole calendar days between two dates (b - a)
 */
export function differenceInDays(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utcB - utcA) / msPerDay);
}

/**
 * Formats date into readable string, e.g. "October 15, 2026"
 */
export function formatDate(date: Date, includeDayOfWeek: boolean = false): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    ...(includeDayOfWeek ? { weekday: 'short' } : {})
  };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Formats date into short string, e.g. "Oct 15, 2026"
 */
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Validates calculator input based on chosen method
 */
export function validateInputs(inputs: CalculatorInputs): { isValid: boolean; error?: string } {
  const today = normalizeDate(new Date());

  if (inputs.method === 'lmp') {
    if (!inputs.lmpDate) {
      return { isValid: false, error: 'Please enter your last menstrual period date.' };
    }
    const lmp = parseISODateString(inputs.lmpDate);
    if (lmp > today) {
      return { isValid: false, error: 'The last menstrual period date cannot be in the future.' };
    }
    const daysAgo = differenceInDays(lmp, today);
    if (daysAgo > 308) { // 44 weeks
      return { isValid: false, error: 'The selected date is more than 44 weeks ago. Please verify your date.' };
    }
    if (!inputs.cycleLength || isNaN(inputs.cycleLength) || inputs.cycleLength < 20 || inputs.cycleLength > 45) {
      return { isValid: false, error: 'Please enter a valid cycle length between 20 and 45 days (default is 28).' };
    }
  } else if (inputs.method === 'conception') {
    if (!inputs.conceptionDate) {
      return { isValid: false, error: 'Please enter your estimated conception date.' };
    }
    const conception = parseISODateString(inputs.conceptionDate);
    if (conception > today) {
      return { isValid: false, error: 'The conception date cannot be in the future.' };
    }
    const daysAgo = differenceInDays(conception, today);
    if (daysAgo > 294) { // 42 weeks from conception is ~44 weeks gestational
      return { isValid: false, error: 'The selected conception date is over 42 weeks ago. Please verify your date.' };
    }
  } else if (inputs.method === 'ivf') {
    if (!inputs.transferDate) {
      return { isValid: false, error: 'Please enter your embryo transfer date.' };
    }
    const transfer = parseISODateString(inputs.transferDate);
    if (transfer > today) {
      return { isValid: false, error: 'The embryo transfer date cannot be in the future.' };
    }
    const daysAgo = differenceInDays(transfer, today);
    if (daysAgo > 290) {
      return { isValid: false, error: 'The embryo transfer date is more than 40 weeks ago. Please verify your date.' };
    }
  }

  return { isValid: true };
}

/**
 * Main calculation engine
 */
export function calculatePregnancy(inputs: CalculatorInputs): CalculationResult {
  const today = normalizeDate(new Date());
  let lmpEquivalent: Date;
  let conceptionDate: Date;
  let estimatedDueDate: Date;
  let inputDateString = '';
  const cycle = inputs.cycleLength || 28;

  if (inputs.method === 'lmp') {
    const lmp = parseISODateString(inputs.lmpDate);
    inputDateString = inputs.lmpDate;
    lmpEquivalent = lmp;
    
    // Cycle adjustment: standard cycle is 28 days with ovulation on day 14.
    // If cycle is 32 days, ovulation is on day 32 - 14 = day 18 (+4 days).
    const cycleAdjustment = cycle - 28;
    // Estimated Due Date = LMP + 280 days + (Cycle Length - 28 days)
    estimatedDueDate = addDays(lmp, 280 + cycleAdjustment);
    // Conception date is LMP + (Cycle Length - 14 days)
    conceptionDate = addDays(lmp, Math.max(1, cycle - 14));
  } else if (inputs.method === 'conception') {
    const conception = parseISODateString(inputs.conceptionDate);
    inputDateString = inputs.conceptionDate;
    conceptionDate = conception;
    // Due Date = Conception + 266 days (38 weeks from conception)
    estimatedDueDate = addDays(conception, 266);
    // LMP equivalent is conception - 14 days
    lmpEquivalent = addDays(conception, -14);
  } else {
    // IVF method
    const transfer = parseISODateString(inputs.transferDate);
    inputDateString = inputs.transferDate;
    if (inputs.ivfType === 'day3') {
      estimatedDueDate = addDays(transfer, 263);
      conceptionDate = addDays(transfer, -3);
      lmpEquivalent = addDays(transfer, -17);
    } else if (inputs.ivfType === 'day6') {
      estimatedDueDate = addDays(transfer, 260);
      conceptionDate = addDays(transfer, -6);
      lmpEquivalent = addDays(transfer, -20);
    } else {
      // Day 5 blastocyst (default)
      estimatedDueDate = addDays(transfer, 261);
      conceptionDate = addDays(transfer, -5);
      lmpEquivalent = addDays(transfer, -19);
    }
  }

  // Calculate current gestational age
  const totalDaysPregnant = Math.max(0, differenceInDays(lmpEquivalent, today));
  const currentWeek = Math.floor(totalDaysPregnant / 7);
  const currentDay = totalDaysPregnant % 7;

  // Trimester calculation
  let currentTrimester: 1 | 2 | 3 = 1;
  let trimesterName = '1st Trimester';
  if (currentWeek >= 28) {
    currentTrimester = 3;
    trimesterName = '3rd Trimester';
  } else if (currentWeek >= 14) {
    currentTrimester = 2;
    trimesterName = '2nd Trimester';
  } else {
    currentTrimester = 1;
    trimesterName = '1st Trimester';
  }

  // Days remaining until estimated due date
  const daysRemaining = Math.max(0, differenceInDays(today, estimatedDueDate));

  // Pregnancy progress percentage (280 days total)
  const pregnancyProgressPercentage = Math.min(
    100,
    Math.max(0, Math.round((totalDaysPregnant / 280) * 100))
  );

  // Key milestone date checkpoints
  const approx12WeekDate = addDays(lmpEquivalent, 84); // 12 weeks
  const approx20WeekDate = addDays(lmpEquivalent, 140); // 20 weeks
  const approx28WeekDate = addDays(lmpEquivalent, 196); // 28 weeks
  const approx37WeekDate = addDays(lmpEquivalent, 259); // 37 weeks (Early term)
  const fullTermDate = addDays(lmpEquivalent, 273); // 39 weeks (Full term window starts)

  // Generate detailed milestone array
  const milestoneDefinitions = [
    {
      id: 'conception',
      week: 2,
      title: 'Estimated Conception Date',
      description: 'Egg fertilization and formation of the blastocyst.',
      estimatedDate: conceptionDate,
      trimester: 1 as const
    },
    {
      id: 'heartbeat',
      week: 6,
      title: 'First Heartbeat Detectable',
      description: 'Early cardiac tube begins regular rhythmic contractions.',
      estimatedDate: addDays(lmpEquivalent, 42),
      trimester: 1 as const
    },
    {
      id: 'week12',
      week: 12,
      title: '12-Week Milestone & Screening',
      description: 'First trimester nuchal translucency scan; risk of miscarriage drops markedly.',
      estimatedDate: approx12WeekDate,
      trimester: 1 as const
    },
    {
      id: 't1_end',
      week: 13,
      title: 'First Trimester End',
      description: 'All vital organs formed; vocal cords and fingernails developing.',
      estimatedDate: addDays(lmpEquivalent, 91),
      trimester: 1 as const
    },
    {
      id: 't2_start',
      week: 14,
      title: 'Second Trimester Start',
      description: 'The golden trimester starts; energy often returns and morning sickness eases.',
      estimatedDate: addDays(lmpEquivalent, 98),
      trimester: 2 as const
    },
    {
      id: 'week20',
      week: 20,
      title: '20-Week Mid-Pregnancy Anatomy Scan',
      description: 'Halfway milestone! Comprehensive anatomical ultrasound scan.',
      estimatedDate: approx20WeekDate,
      trimester: 2 as const
    },
    {
      id: 'viability',
      week: 24,
      title: '24-Week Viability Milestone',
      description: 'Baby can hear voice sounds, practice breathing movements with amniotic fluid.',
      estimatedDate: addDays(lmpEquivalent, 168),
      trimester: 2 as const
    },
    {
      id: 't3_start',
      week: 28,
      title: 'Third Trimester Start & Glucose Screen',
      description: 'Final stretch begins; eyes open, brain undergoes rapid dendritic growth.',
      estimatedDate: approx28WeekDate,
      trimester: 3 as const
    },
    {
      id: 'week37',
      week: 37,
      title: '37-Week Milestone (Early Full-Term)',
      description: 'Baby is considered early term; lungs and reflexes are essentially mature.',
      estimatedDate: approx37WeekDate,
      trimester: 3 as const
    },
    {
      id: 'due_date',
      week: 40,
      title: 'Estimated Due Date (Full Term)',
      description: '40 full weeks of pregnancy. Welcome baby!',
      estimatedDate: estimatedDueDate,
      trimester: 3 as const
    }
  ];

  const milestones: PregnancyMilestone[] = milestoneDefinitions.map((m) => {
    const isCompleted = today >= m.estimatedDate;
    const isCurrent = currentWeek >= m.week && currentWeek < m.week + 3 && !isCompleted;
    return {
      ...m,
      isCompleted,
      isCurrent
    };
  });

  return {
    estimatedDueDate,
    pregnancyStartDate: lmpEquivalent,
    estimatedConceptionDate: conceptionDate,
    currentWeek,
    currentDay,
    totalDaysPregnant,
    currentTrimester,
    trimesterName,
    pregnancyProgressPercentage,
    daysRemaining,
    approx12WeekDate,
    approx20WeekDate,
    approx28WeekDate,
    approx37WeekDate,
    fullTermDate,
    milestones,
    calculationMethod: inputs.method,
    cycleLength: cycle,
    inputDateString
  };
}
