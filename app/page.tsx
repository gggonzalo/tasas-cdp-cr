import { HistoricalRatesChart } from "@/components/HistoricalRatesChart";
import { MultipleTermsTable } from "@/components/MultipleTermsTable";
import jan24EntitiesRates from "../datos/2024-01/2024-01-09T06.00.00.000Z.json";
import feb24EntitiesRates from "../datos/2024-02/2024-02-13T06.00.00.000Z.json";
import mar24EntitiesRates from "../datos/2024-03/2024-03-19T06.00.00.000Z.json";
import apr24EntitiesRates from "../datos/2024-04/2024-04-04T06.00.00.000Z.json";
import may24EntitiesRates from "../datos/2024-05/2024-05-14T06.00.00.000Z.json";
import jun24EntitiesRates from "../datos/2024-06/2024-06-14T06.00.00.000Z.json";
import jul24EntitiesRates from "../datos/2024-07/2024-07-14T06.00.00.000Z.json";
import nov24EntitiesRates from "../datos/2024-11/2024-11-02T06.00.00.000Z.json";
import dec24EntitiesRates from "../datos/2024-12/2024-12-24T19.09.36.216Z.json";
import jan25EntitiesRates from "../datos/2025-01/2025-01-15T19.27.22.200Z.json";
import feb25EntitiesRates from "../datos/2025-02/2025-02-27T01.45.36.739Z.json";

const lastUpdateDate = "2025-02-27T01:45:36.739Z";
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
  "2024-01-09T06:00Z": jan24EntitiesRates,
  "2024-02-13T06:00Z": feb24EntitiesRates,
  "2024-03-19T06:00Z": mar24EntitiesRates,
  "2024-04-04T06:00Z": apr24EntitiesRates,
  "2024-05-14T06:00Z": may24EntitiesRates,
  "2024-06-14T06:00Z": jun24EntitiesRates,
  "2024-07-14T06:00Z": jul24EntitiesRates,
  "2024-11-02T06:00Z": nov24EntitiesRates,
  "2024-12-24T19:09:36.216Z": dec24EntitiesRates,
  "2025-01-15T19:27:22.200Z": jan25EntitiesRates,
  "2025-02-27T01:45:36.739Z": feb25EntitiesRates,
};

export default function Home() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-20 px-4 py-10">
      <div className="text-center">
        <h1 className="mb-4 text-balance text-2xl font-bold tracking-tight text-primary sm:text-3xl">
          Tasas de Certificados a Plazo en Costa Rica 💰📈
        </h1>
        <p className="mx-auto mb-1 max-w-2xl text-balance text-lg text-secondary-foreground sm:text-xl">
          Datos actualizados de las tasas de interés que ofrecen varias
          entidades financieras en el país, en un solo lugar. 🔍✨
        </p>
        <p className="text-balance text-xs text-muted-foreground">
          Última actualización: {lastUpdateDateFormatted}
        </p>
      </div>
      {/* TODO: Agregar nota pequena de electronico/desmaterializado, sin renovacion y pago al vencimiento */}

      <MultipleTermsTable entitiesRates={jan25EntitiesRates} />

      {/* TODO: Just a single amount per currency will be used to keep historical data. Choose the most common one (pbly the smallest one which meets the min req in all banks) */}
      <HistoricalRatesChart monthlyRatesMap={monthlyRatesMap} />
    </main>
  );
}
