export type RateByAmount = {
  min: number;
  max: number | null;
  gross: number;
  net: number;
};

export type RatesByTerm = Record<string, RateByAmount[]>;

export type EntityRates = {
  entity: string;
  ratesByCurrency: Record<string, RatesByTerm>;
};

export type EntityHistoricalRates = {
  entity: string;
  currency: string;
  amount: number;
  netRatesByDate: Record<string, Record<string, number>>;
};
