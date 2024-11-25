import { HistoricalRatesChart } from "@/components/HistoricalRatesChart";
import { MultipleTermsTable } from "@/components/MultipleTermsTable";
import { EntityRates } from "@/types";

const entitiesRates: EntityRates[] = [
  {
    entity: "BAC Credomatic",
    ratesByTerm: {
      1: [
        { currency: "CRC", min: 250000, max: 999999, gross: 7.0, net: 5.95 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 7.25, net: 6.16 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 7.5, net: 6.38 },
        {
          currency: "CRC",
          min: 10000000,
          max: Infinity,
          gross: 7.75,
          net: 6.59,
        },
        { currency: "USD", min: 1500, max: 4999, gross: 4.25, net: 3.61 },
        { currency: "USD", min: 5000, max: 9999, gross: 4.5, net: 3.83 },
        { currency: "USD", min: 10000, max: 49999, gross: 4.75, net: 4.04 },
        { currency: "USD", min: 50000, max: Infinity, gross: 5.0, net: 4.25 },
      ],
      3: [
        { currency: "CRC", min: 250000, max: 999999, gross: 7.15, net: 6.08 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 7.4, net: 6.29 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 7.65, net: 6.5 },
        {
          currency: "CRC",
          min: 10000000,
          max: Infinity,
          gross: 7.9,
          net: 6.72,
        },
        { currency: "USD", min: 1500, max: 4999, gross: 4.35, net: 3.7 },
        { currency: "USD", min: 5000, max: 9999, gross: 4.6, net: 3.91 },
        { currency: "USD", min: 10000, max: 49999, gross: 4.85, net: 4.12 },
        { currency: "USD", min: 50000, max: Infinity, gross: 5.1, net: 4.34 },
      ],
      6: [
        { currency: "CRC", min: 250000, max: 999999, gross: 7.25, net: 6.16 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 7.5, net: 6.38 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 7.75, net: 6.59 },
        { currency: "CRC", min: 10000000, max: Infinity, gross: 8.0, net: 6.8 },
        { currency: "USD", min: 1500, max: 4999, gross: 4.25, net: 3.61 },
        { currency: "USD", min: 5000, max: 9999, gross: 4.5, net: 3.83 },
        { currency: "USD", min: 10000, max: 49999, gross: 4.75, net: 4.04 },
        { currency: "USD", min: 50000, max: Infinity, gross: 5.0, net: 4.25 },
      ],
      12: [
        { currency: "CRC", min: 250000, max: 999999, gross: 7.75, net: 6.59 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 8.0, net: 6.8 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 8.25, net: 7.01 },
        {
          currency: "CRC",
          min: 10000000,
          max: Infinity,
          gross: 8.5,
          net: 7.23,
        },
        { currency: "USD", min: 1500, max: 4999, gross: 4.75, net: 4.04 },
        { currency: "USD", min: 5000, max: 9999, gross: 5.0, net: 4.25 },
        { currency: "USD", min: 10000, max: 49999, gross: 5.25, net: 4.46 },
        { currency: "USD", min: 50000, max: Infinity, gross: 5.5, net: 4.68 },
      ],
      24: [
        { currency: "CRC", min: 250000, max: 999999, gross: 8.25, net: 7.01 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 8.5, net: 7.23 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 8.75, net: 7.44 },
        {
          currency: "CRC",
          min: 10000000,
          max: Infinity,
          gross: 9.0,
          net: 7.65,
        },
        { currency: "USD", min: 1500, max: 4999, gross: 5.25, net: 4.46 },
        { currency: "USD", min: 5000, max: 9999, gross: 5.5, net: 4.68 },
        { currency: "USD", min: 10000, max: 49999, gross: 5.75, net: 4.89 },
        { currency: "USD", min: 50000, max: Infinity, gross: 6.0, net: 5.1 },
      ],
    },
  },
  {
    entity: "Banco de Costa Rica",
    ratesByTerm: {
      1: [
        { currency: "CRC", min: 250000, max: 999999, gross: 6.5, net: 5.53 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 6.75, net: 5.74 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 7.0, net: 5.95 },
        {
          currency: "CRC",
          min: 10000000,
          max: Infinity,
          gross: 7.25,
          net: 6.16,
        },
        { currency: "USD", min: 1500, max: 4999, gross: 3.75, net: 3.19 },
        { currency: "USD", min: 5000, max: 9999, gross: 4.0, net: 3.4 },
        { currency: "USD", min: 10000, max: 49999, gross: 4.25, net: 3.61 },
        { currency: "USD", min: 50000, max: Infinity, gross: 4.5, net: 3.83 },
      ],
      3: [
        { currency: "CRC", min: 250000, max: 999999, gross: 6.65, net: 5.65 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 6.9, net: 5.86 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 7.15, net: 6.08 },
        {
          currency: "CRC",
          min: 10000000,
          max: Infinity,
          gross: 7.4,
          net: 6.29,
        },
        { currency: "USD", min: 1500, max: 4999, gross: 3.85, net: 3.28 },
        { currency: "USD", min: 5000, max: 9999, gross: 4.1, net: 3.49 },
        { currency: "USD", min: 10000, max: 49999, gross: 4.35, net: 3.7 },
        { currency: "USD", min: 50000, max: Infinity, gross: 4.6, net: 3.91 },
      ],
      6: [
        { currency: "CRC", min: 250000, max: 999999, gross: 6.75, net: 5.74 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 7.0, net: 5.95 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 7.25, net: 6.16 },
        {
          currency: "CRC",
          min: 10000000,
          max: Infinity,
          gross: 7.5,
          net: 6.38,
        },
        { currency: "USD", min: 1500, max: 4999, gross: 4.0, net: 3.4 },
        { currency: "USD", min: 5000, max: 9999, gross: 4.25, net: 3.61 },
        { currency: "USD", min: 10000, max: 49999, gross: 4.5, net: 3.83 },
        { currency: "USD", min: 50000, max: Infinity, gross: 4.75, net: 4.04 },
      ],
      12: [
        { currency: "CRC", min: 250000, max: 999999, gross: 7.0, net: 5.95 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 7.25, net: 6.16 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 7.5, net: 6.38 },
        {
          currency: "CRC",
          min: 10000000,
          max: Infinity,
          gross: 7.75,
          net: 6.59,
        },
        { currency: "USD", min: 1500, max: 4999, gross: 4.0, net: 3.4 },
        { currency: "USD", min: 5000, max: 9999, gross: 4.25, net: 3.61 },
        { currency: "USD", min: 10000, max: 49999, gross: 4.5, net: 3.83 },
        { currency: "USD", min: 50000, max: Infinity, gross: 4.75, net: 4.04 },
      ],
      24: [
        { currency: "CRC", min: 250000, max: 999999, gross: 7.5, net: 6.38 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 7.75, net: 6.59 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 8.0, net: 6.8 },
        {
          currency: "CRC",
          min: 10000000,
          max: Infinity,
          gross: 8.25,
          net: 7.01,
        },
        { currency: "USD", min: 1500, max: 4999, gross: 4.5, net: 3.83 },
        { currency: "USD", min: 5000, max: 9999, gross: 4.75, net: 4.04 },
        { currency: "USD", min: 10000, max: 49999, gross: 5.0, net: 4.25 },
        { currency: "USD", min: 50000, max: Infinity, gross: 5.25, net: 4.46 },
      ],
    },
  },
  {
    entity: "Banco Nacional",
    ratesByTerm: {
      1: [
        { currency: "CRC", min: 250000, max: 999999, gross: 6.75, net: 5.74 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 7.0, net: 5.95 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 7.25, net: 6.16 },
        {
          currency: "CRC",
          min: 10000000,
          max: Infinity,
          gross: 7.5,
          net: 6.38,
        },
        { currency: "USD", min: 1500, max: 4999, gross: 4.0, net: 3.4 },
        { currency: "USD", min: 5000, max: 9999, gross: 4.25, net: 3.61 },
        { currency: "USD", min: 10000, max: 49999, gross: 4.5, net: 3.83 },
        { currency: "USD", min: 50000, max: Infinity, gross: 4.75, net: 4.04 },
      ],
      3: [
        { currency: "CRC", min: 250000, max: 999999, gross: 7.15, net: 6.08 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 7.4, net: 6.29 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 7.65, net: 6.5 },
        {
          currency: "CRC",
          min: 10000000,
          max: Infinity,
          gross: 7.9,
          net: 6.72,
        },
        { currency: "USD", min: 1500, max: 4999, gross: 4.35, net: 3.7 },
        { currency: "USD", min: 5000, max: 9999, gross: 4.6, net: 3.91 },
        { currency: "USD", min: 10000, max: 49999, gross: 4.85, net: 4.12 },
        { currency: "USD", min: 50000, max: Infinity, gross: 5.1, net: 4.34 },
      ],
      6: [
        { currency: "CRC", min: 250000, max: 999999, gross: 7.0, net: 5.95 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 7.25, net: 6.16 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 7.5, net: 6.38 },
        {
          currency: "CRC",
          min: 10000000,
          max: Infinity,
          gross: 7.75,
          net: 6.59,
        },
        { currency: "USD", min: 1500, max: 4999, gross: 4.0, net: 3.4 },
        { currency: "USD", min: 5000, max: 9999, gross: 4.25, net: 3.61 },
        { currency: "USD", min: 10000, max: 49999, gross: 4.5, net: 3.83 },
        { currency: "USD", min: 50000, max: Infinity, gross: 4.75, net: 4.04 },
      ],
      12: [
        { currency: "CRC", min: 250000, max: 999999, gross: 7.25, net: 6.16 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 7.5, net: 6.38 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 7.75, net: 6.59 },
        { currency: "CRC", min: 10000000, max: Infinity, gross: 8.0, net: 6.8 },
        { currency: "USD", min: 1500, max: 4999, gross: 4.25, net: 3.61 },
        { currency: "USD", min: 5000, max: 9999, gross: 4.5, net: 3.83 },
        { currency: "USD", min: 10000, max: 49999, gross: 4.75, net: 4.04 },
        { currency: "USD", min: 50000, max: Infinity, gross: 5.0, net: 4.25 },
      ],
      24: [
        { currency: "CRC", min: 250000, max: 999999, gross: 7.75, net: 6.59 },
        { currency: "CRC", min: 1000000, max: 4999999, gross: 8.0, net: 6.8 },
        { currency: "CRC", min: 5000000, max: 9999999, gross: 8.25, net: 7.01 },
        {
          currency: "CRC",
          min: 10000000,
          max: Infinity,
          gross: 8.5,
          net: 7.23,
        },
        { currency: "USD", min: 1500, max: 4999, gross: 4.75, net: 4.04 },
        { currency: "USD", min: 5000, max: 9999, gross: 5.0, net: 4.25 },
        { currency: "USD", min: 10000, max: 49999, gross: 5.25, net: 4.46 },
        { currency: "USD", min: 50000, max: Infinity, gross: 5.5, net: 4.68 },
      ],
    },
  },
  {
    entity: "Scotiabank",
    ratesByTerm: {
      1: [
        { currency: "CRC", min: 250000, max: 999999, gross: 6.25, net: 5.31 },
        { currency: "USD", min: 1500, max: 4999, gross: 3.5, net: 2.98 },
      ],
      3: [
        { currency: "CRC", min: 250000, max: 999999, gross: 6.4, net: 5.43 },
        { currency: "USD", min: 1500, max: 4999, gross: 3.6, net: 3.06 },
      ],
      6: [
        { currency: "CRC", min: 250000, max: 999999, gross: 6.55, net: 5.56 },
        { currency: "USD", min: 1500, max: 4999, gross: 3.7, net: 3.15 },
      ],
      12: [
        { currency: "CRC", min: 250000, max: 999999, gross: 6.7, net: 5.68 },
        { currency: "USD", min: 1500, max: 4999, gross: 3.8, net: 3.23 },
      ],
      24: [
        { currency: "CRC", min: 250000, max: 999999, gross: 6.85, net: 5.8 },
        { currency: "USD", min: 1500, max: 4999, gross: 3.9, net: 3.32 },
      ],
    },
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-20 px-4 py-10">
      <div className="space-y-4 text-center">
        <h1 className="text-balance text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          Tasas de Certificados a Plazo en Costa Rica 💰📈
        </h1>
        <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
          Lista actualizada de las tasas de interés que ofrecen varias entidades
          financieras en el país. 🔍✨
        </p>
      </div>

      <MultipleTermsTable entitiesRates={entitiesRates} />
    </main>
  );
}
