export type Currency = "CRC" | "USD";

export type RateByAmount = {
  amount: number;
  currency: Currency;
  grossRate: number;
  netRate: number;
};

export type EntityRates = {
  entity: string;
  ratesByTerm: Record<number, RateByAmount[]>;
};
