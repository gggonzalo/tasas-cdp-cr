import { HistoricalRatesChart } from "@/components/HistoricalRatesChart";
import { MultipleTermsTable } from "@/components/MultipleTermsTable";
import janEntitiesRates from "../datos/2024-01/2024-01-09T06.00.00.000Z.json";
import febEntitiesRates from "../datos/2024-02/2024-02-13T06.00.00.000Z.json";
import marEntitiesRates from "../datos/2024-03/2024-03-19T06.00.00.000Z.json";
import aprEntitiesRates from "../datos/2024-04/2024-04-04T06.00.00.000Z.json";
import mayEntitiesRates from "../datos/2024-05/2024-05-14T06.00.00.000Z.json";
import junEntitiesRates from "../datos/2024-06/2024-06-14T06.00.00.000Z.json";
import julEntitiesRates from "../datos/2024-07/2024-07-14T06.00.00.000Z.json";
import novEntitiesRates from "../datos/2024-11/2024-11-02T06.00.00.000Z.json";
import decEntitiesRates from "../datos/2024-12/2024-12-24T19.09.36.216Z.json";

const lastUpdateDate = "2024-12-24T19:09:36.216Z";
const lastUpdateDateFormatted = new Date(lastUpdateDate).toLocaleDateString(
  "es-CR",
  {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Costa_Rica",
    timeZoneName: "shortGeneric",
  },
);

const monthlyRatesMap = {
  "2024-01-09T06:00Z": janEntitiesRates,
  "2024-02-13T06:00Z": febEntitiesRates,
  "2024-03-19T06:00Z": marEntitiesRates,
  "2024-04-04T06:00Z": aprEntitiesRates,
  "2024-05-14T06:00Z": mayEntitiesRates,
  "2024-06-14T06:00Z": junEntitiesRates,
  "2024-07-14T06:00Z": julEntitiesRates,
  "2024-11-02T06:00Z": novEntitiesRates,
  "2024-12-24T19:09:36.216Z": decEntitiesRates,
};

export default function Home() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-20 px-4 py-10">
      <div className="text-center">
        <h1 className="mb-4 text-balance text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          Tasas de Certificados a Plazo en Costa Rica 💰📈
        </h1>
        <p className="mx-auto mb-1 max-w-2xl text-balance text-lg text-secondary-foreground sm:text-xl">
          Todas las tasas de interés que ofrecen las entidades financieras en
          Costa Rica, en un solo lugar. 🔍✨
        </p>
        <p className="text-balance text-xs text-muted-foreground">
          Última actualización: {lastUpdateDateFormatted}
        </p>
      </div>
      {/* TODO: Agregar nota pequena de electronico/desmaterializado, sin renovacion y pago al vencimiento */}

      <MultipleTermsTable entitiesRates={decEntitiesRates} />

      {/* TODO: Just a single amount per currency will be used to keep historical data. Choose the most common one (pbly the smallest one which meets the min req in all banks) */}
      <HistoricalRatesChart monthlyRatesMap={monthlyRatesMap} />
    </main>
  );
}
