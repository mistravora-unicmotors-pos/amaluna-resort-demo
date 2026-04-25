// -----------------------------------------------------------------------------
// Day-out pricing helpers (UI-only mock for now)
// -----------------------------------------------------------------------------

export const FREE_CHILD_AGE = 3; // Under 3 are free (infants_free)

export type DayoutPackageId = 'day-out' | 'pool-only';
export type DayType = 'weekday' | 'weekend';

export interface PricePair {
  adult: number;
  child: number;
}

export interface PackageDayPricing {
  weekday: PricePair;
  weekend: PricePair;
}

export interface DayoutPricingRules {
  'day-out': PackageDayPricing;
  'pool-only': PackageDayPricing;
  freeInfantMaxAge: number;
}

export const dayoutPackages: Array<{
  id: DayoutPackageId;
  name: string;
  icon: string;
  perks: string[];
  baseAdultPrice: number;
  baseChildPrice: number;
}> = [
  {
    id: 'day-out',
    name: 'Day-Out Package',
    icon: '☀️',
    perks: ['Welcome drink', 'Lunch', 'Pool', 'Evening tea'],
    baseAdultPrice: 4500,
    baseChildPrice: 2500,
  },
  {
    id: 'pool-only',
    name: 'Pool Only',
    icon: '🏊',
    perks: ['Pool only'],
    baseAdultPrice: 2500,
    baseChildPrice: 1500,
  },
];

export const defaultDayoutPricingRules: DayoutPricingRules = {
  'day-out': {
    weekday: { adult: 4500, child: 2500 },
    weekend: { adult: 4950, child: 2750 },
  },
  'pool-only': {
    weekday: { adult: 2500, child: 1500 },
    weekend: { adult: 2750, child: 1650 },
  },
  freeInfantMaxAge: FREE_CHILD_AGE,
};

function clampInt(n: number, min: number, max: number): number {
  const x = Number.isFinite(n) ? Math.trunc(n) : min;
  return Math.max(min, Math.min(max, x));
}

function isWeekendDate(dateStr: string): boolean {
  // dateStr is expected as YYYY-MM-DD; use local-midnight to avoid TZ drift.
  const d = new Date(`${dateStr}T00:00:00`);
  const day = d.getDay(); // 0=Sun..6=Sat
  return day === 0 || day === 5 || day === 6; // Sun + Fri/Sat
}

export function resolveDayoutPrices(
  packageId: DayoutPackageId,
  dateStr?: string,
  pricingRules?: DayoutPricingRules,
) {
  const pkg = dayoutPackages.find((p) => p.id === packageId);
  if (!pkg) {
    return { adultPrice: 0, childPrice: 0, isWeekend: false };
  }

  const fallbackDate = new Date().toISOString().split('T')[0];
  const effectiveDateStr = dateStr || fallbackDate;

  const weekend = isWeekendDate(effectiveDateStr);
  const dayType: DayType = weekend ? 'weekend' : 'weekday';
  const rules = pricingRules ?? defaultDayoutPricingRules;
  const fromRules = rules[packageId][dayType];

  return {
    adultPrice: fromRules?.adult ?? pkg.baseAdultPrice,
    childPrice: fromRules?.child ?? pkg.baseChildPrice,
    isWeekend: weekend,
  };
}

export function computeDayoutTotal(args: {
  packageId: DayoutPackageId;
  dateStr?: string;
  adults: number;
  childrenTotal: number;
  infantsFree: number;
  pricingRules?: DayoutPricingRules;
}) {
  const adults = clampInt(args.adults, 1, 20);
  const childrenTotal = clampInt(args.childrenTotal, 0, 20);
  const infantsFree = clampInt(args.infantsFree, 0, childrenTotal);

  const childrenPaid = Math.max(0, childrenTotal - infantsFree);
  const { adultPrice, childPrice } = resolveDayoutPrices(args.packageId, args.dateStr, args.pricingRules);

  const total = adults * adultPrice + childrenPaid * childPrice;

  return {
    adults,
    childrenTotal,
    infantsFree,
    childrenPaid,
    adultPrice,
    childPrice,
    total,
  };
}

