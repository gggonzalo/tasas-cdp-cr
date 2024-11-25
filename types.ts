export type Currency = "CRC" | "USD";

export type RateByAmount = {
  currency: Currency;
  min: number;
  max: number;
  gross: number;
  net: number;
};

export type EntityRates = {
  entity: string;
  ratesByTerm: Record<number, RateByAmount[]>;
};

export type EntityHistoricalRates = {
  entity: string;
  currency: Currency;
  amount: number;
  netRatesByDate: Record<string, Record<number, number>>;
};
