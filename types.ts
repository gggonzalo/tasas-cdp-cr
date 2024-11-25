export type RateByAmount = {
  currency: string;
  min: number;
  max: number | null;
  gross: number;
  net: number;
};

export type EntityRates = {
  entity: string;
  ratesByTerm: Record<string, RateByAmount[]>;
};

export type EntityHistoricalRates = {
  entity: string;
  currency: string;
  amount: number;
  netRatesByDate: Record<string, Record<string, number>>;
};
