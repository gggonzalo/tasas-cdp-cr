import { HistoricalRatesChart } from "@/components/HistoricalRatesChart";
import { MultipleTermsTable } from "@/components/MultipleTermsTable";
import entitiesRates from "../../datos-tasas-cdp-cr/10-25/2024-11-25T07.00.00.000Z.json";

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
        {/* TODO: Agregar nota pequena de electronico/desmaterializado, sin renovacion y pago al vencimiento */}
      </div>

      <MultipleTermsTable entitiesRates={entitiesRates} />

      {/* TODO: Just a single amount per currency will be used to keep historical data. Choose the most common one (pbly the smallest one which meets the min req in all banks) */}
      <HistoricalRatesChart />
    </main>
  );
}
