import { HistoricalRatesChart } from "@/components/HistoricalRatesChart";
import { MultipleTermsTable } from "@/components/MultipleTermsTable";
import janEntitiesRates from "../../datos-tasas-cdp-cr/2024-01/2024-01-01T06.00.00.000Z.json";
import febEntitiesRates from "../../datos-tasas-cdp-cr/2024-02/2024-02-01T06.00.00.000Z.json";
import marEntitiesRates from "../../datos-tasas-cdp-cr/2024-03/2024-03-01T06.00.00.000Z.json";
import aprEntitiesRates from "../../datos-tasas-cdp-cr/2024-04/2024-04-01T06.00.00.000Z.json";
import mayEntitiesRates from "../../datos-tasas-cdp-cr/2024-05/2024-05-01T06.00.00.000Z.json";
import junEntitiesRates from "../../datos-tasas-cdp-cr/2024-06/2024-06-01T06.00.00.000Z.json";
import julEntitiesRates from "../../datos-tasas-cdp-cr/2024-07/2024-07-01T06.00.00.000Z.json";
import novEntitiesRates from "../../datos-tasas-cdp-cr/2024-11/2024-11-01T06.00.00.000Z.json";
import entitiesRates from "../../datos-tasas-cdp-cr/2024-11/2024-11-26T03.00.00.000Z.json";

const monthlyRatesMap = {
  "2024-01-01T06:00Z": janEntitiesRates,
  "2024-02-01T06:00Z": febEntitiesRates,
  "2024-03-01T06:00Z": marEntitiesRates,
  "2024-04-01T06:00Z": aprEntitiesRates,
  "2024-05-01T06:00Z": mayEntitiesRates,
  "2024-06-01T06:00Z": junEntitiesRates,
  "2024-07-01T06:00Z": julEntitiesRates,
  "2024-11-01T06:00Z": novEntitiesRates,
};

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
      <HistoricalRatesChart monthlyRatesMap={monthlyRatesMap} />
    </main>
  );
}
