import { MultipleTermsTable } from "@/components/MultipleTermsTable";
import { EntityRates } from "@/types";

const entitiesRates: EntityRates[] = [
  {
    entity: "BAC Credomatic",
    ratesByTerm: {
      180: [
        { amount: 250000, currency: "CRC", grossRate: 7.25, netRate: 6.16 },
        { amount: 1000000, currency: "CRC", grossRate: 7.5, netRate: 6.38 },
        { amount: 5000000, currency: "CRC", grossRate: 7.75, netRate: 6.59 },
        { amount: 10000000, currency: "CRC", grossRate: 8.0, netRate: 6.8 },
        { amount: 1000, currency: "USD", grossRate: 4.25, netRate: 3.61 },
        { amount: 5000, currency: "USD", grossRate: 4.5, netRate: 3.83 },
        { amount: 10000, currency: "USD", grossRate: 4.75, netRate: 4.04 },
        { amount: 50000, currency: "USD", grossRate: 5.0, netRate: 4.25 },
      ],
      360: [
        { amount: 250000, currency: "CRC", grossRate: 7.75, netRate: 6.59 },
        { amount: 1000000, currency: "CRC", grossRate: 8.0, netRate: 6.8 },
        { amount: 5000000, currency: "CRC", grossRate: 8.25, netRate: 7.01 },
        { amount: 10000000, currency: "CRC", grossRate: 8.5, netRate: 7.23 },
        { amount: 1000, currency: "USD", grossRate: 4.75, netRate: 4.04 },
        { amount: 5000, currency: "USD", grossRate: 5.0, netRate: 4.25 },
        { amount: 10000, currency: "USD", grossRate: 5.25, netRate: 4.46 },
        { amount: 50000, currency: "USD", grossRate: 5.5, netRate: 4.68 },
      ],
      720: [
        { amount: 250000, currency: "CRC", grossRate: 8.25, netRate: 7.01 },
        { amount: 1000000, currency: "CRC", grossRate: 8.5, netRate: 7.23 },
        { amount: 5000000, currency: "CRC", grossRate: 8.75, netRate: 7.44 },
        { amount: 10000000, currency: "CRC", grossRate: 9.0, netRate: 7.65 },
        { amount: 1000, currency: "USD", grossRate: 5.25, netRate: 4.46 },
        { amount: 5000, currency: "USD", grossRate: 5.5, netRate: 4.68 },
        { amount: 10000, currency: "USD", grossRate: 5.75, netRate: 4.89 },
        { amount: 50000, currency: "USD", grossRate: 6.0, netRate: 5.1 },
      ],
      1080: [
        { amount: 250000, currency: "CRC", grossRate: 8.75, netRate: 7.44 },
        { amount: 1000000, currency: "CRC", grossRate: 9.0, netRate: 7.65 },
        { amount: 5000000, currency: "CRC", grossRate: 9.25, netRate: 7.86 },
        { amount: 10000000, currency: "CRC", grossRate: 9.5, netRate: 8.08 },
        { amount: 1000, currency: "USD", grossRate: 5.75, netRate: 4.89 },
        { amount: 5000, currency: "USD", grossRate: 6.0, netRate: 5.1 },
        { amount: 10000, currency: "USD", grossRate: 6.25, netRate: 5.31 },
        { amount: 50000, currency: "USD", grossRate: 6.5, netRate: 5.53 },
      ],
    },
  },
  {
    entity: "Banco de Costa Rica",
    ratesByTerm: {
      180: [
        { amount: 250000, currency: "CRC", grossRate: 6.5, netRate: 5.53 },
        { amount: 1000000, currency: "CRC", grossRate: 6.75, netRate: 5.74 },
        { amount: 5000000, currency: "CRC", grossRate: 7.0, netRate: 5.95 },
        { amount: 10000000, currency: "CRC", grossRate: 7.25, netRate: 6.16 },
        { amount: 1000, currency: "USD", grossRate: 3.5, netRate: 2.98 },
        { amount: 5000, currency: "USD", grossRate: 3.75, netRate: 3.19 },
        { amount: 10000, currency: "USD", grossRate: 4.0, netRate: 3.4 },
        { amount: 50000, currency: "USD", grossRate: 4.25, netRate: 3.61 },
      ],
      360: [
        { amount: 250000, currency: "CRC", grossRate: 7.0, netRate: 5.95 },
        { amount: 1000000, currency: "CRC", grossRate: 7.25, netRate: 6.16 },
        { amount: 5000000, currency: "CRC", grossRate: 7.5, netRate: 6.38 },
        { amount: 10000000, currency: "CRC", grossRate: 7.75, netRate: 6.59 },
        { amount: 1000, currency: "USD", grossRate: 4.0, netRate: 3.4 },
        { amount: 5000, currency: "USD", grossRate: 4.25, netRate: 3.61 },
        { amount: 10000, currency: "USD", grossRate: 4.5, netRate: 3.83 },
        { amount: 50000, currency: "USD", grossRate: 4.75, netRate: 4.04 },
      ],
      720: [
        { amount: 250000, currency: "CRC", grossRate: 7.5, netRate: 6.38 },
        { amount: 1000000, currency: "CRC", grossRate: 7.75, netRate: 6.59 },
        { amount: 5000000, currency: "CRC", grossRate: 8.0, netRate: 6.8 },
        { amount: 10000000, currency: "CRC", grossRate: 8.25, netRate: 7.01 },
        { amount: 1000, currency: "USD", grossRate: 4.5, netRate: 3.83 },
        { amount: 5000, currency: "USD", grossRate: 4.75, netRate: 4.04 },
        { amount: 10000, currency: "USD", grossRate: 5.0, netRate: 4.25 },
        { amount: 50000, currency: "USD", grossRate: 5.25, netRate: 4.46 },
      ],
      1080: [
        { amount: 250000, currency: "CRC", grossRate: 8.0, netRate: 6.8 },
        { amount: 1000000, currency: "CRC", grossRate: 8.25, netRate: 7.01 },
        { amount: 5000000, currency: "CRC", grossRate: 8.5, netRate: 7.23 },
        { amount: 10000000, currency: "CRC", grossRate: 8.75, netRate: 7.44 },
        { amount: 1000, currency: "USD", grossRate: 5.0, netRate: 4.25 },
        { amount: 5000, currency: "USD", grossRate: 5.25, netRate: 4.46 },
        { amount: 10000, currency: "USD", grossRate: 5.5, netRate: 4.68 },
        { amount: 50000, currency: "USD", grossRate: 5.75, netRate: 4.89 },
      ],
    },
  },
  {
    entity: "Banco Nacional",
    ratesByTerm: {
      180: [
        { amount: 250000, currency: "CRC", grossRate: 7.0, netRate: 5.95 },
        { amount: 1000000, currency: "CRC", grossRate: 7.25, netRate: 6.16 },
        { amount: 5000000, currency: "CRC", grossRate: 7.5, netRate: 6.38 },
        { amount: 10000000, currency: "CRC", grossRate: 7.75, netRate: 6.59 },
        { amount: 1000, currency: "USD", grossRate: 4.0, netRate: 3.4 },
        { amount: 5000, currency: "USD", grossRate: 4.25, netRate: 3.61 },
        { amount: 10000, currency: "USD", grossRate: 4.5, netRate: 3.83 },
        { amount: 50000, currency: "USD", grossRate: 4.75, netRate: 4.04 },
      ],
      360: [
        { amount: 250000, currency: "CRC", grossRate: 7.25, netRate: 6.16 },
        { amount: 1000000, currency: "CRC", grossRate: 7.5, netRate: 6.38 },
        { amount: 5000000, currency: "CRC", grossRate: 7.75, netRate: 6.59 },
        { amount: 10000000, currency: "CRC", grossRate: 8.0, netRate: 6.8 },
        { amount: 1000, currency: "USD", grossRate: 4.25, netRate: 3.61 },
        { amount: 5000, currency: "USD", grossRate: 4.5, netRate: 3.83 },
        { amount: 10000, currency: "USD", grossRate: 4.75, netRate: 4.04 },
        { amount: 50000, currency: "USD", grossRate: 5.0, netRate: 4.25 },
      ],
      720: [
        { amount: 250000, currency: "CRC", grossRate: 7.75, netRate: 6.59 },
        { amount: 1000000, currency: "CRC", grossRate: 8.0, netRate: 6.8 },
        { amount: 5000000, currency: "CRC", grossRate: 8.25, netRate: 7.01 },
        { amount: 10000000, currency: "CRC", grossRate: 8.5, netRate: 7.23 },
        { amount: 1000, currency: "USD", grossRate: 4.75, netRate: 4.04 },
        { amount: 5000, currency: "USD", grossRate: 5.0, netRate: 4.25 },
        { amount: 10000, currency: "USD", grossRate: 5.25, netRate: 4.46 },
        { amount: 50000, currency: "USD", grossRate: 5.5, netRate: 4.68 },
      ],
      1080: [
        { amount: 250000, currency: "CRC", grossRate: 8.25, netRate: 7.01 },
        { amount: 1000000, currency: "CRC", grossRate: 8.5, netRate: 7.23 },
        { amount: 5000000, currency: "CRC", grossRate: 8.75, netRate: 7.44 },
        { amount: 10000000, currency: "CRC", grossRate: 9.0, netRate: 7.65 },
        { amount: 1000, currency: "USD", grossRate: 5.25, netRate: 4.46 },
        { amount: 5000, currency: "USD", grossRate: 5.5, netRate: 4.68 },
        { amount: 10000, currency: "USD", grossRate: 5.75, netRate: 4.89 },
        { amount: 50000, currency: "USD", grossRate: 6.0, netRate: 5.1 },
      ],
    },
  },
  {
    entity: "Scotiabank",
    ratesByTerm: {
      180: [],
      360: [],
      720: [],
      1080: [],
    },
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-16 space-y-4 text-center">
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
