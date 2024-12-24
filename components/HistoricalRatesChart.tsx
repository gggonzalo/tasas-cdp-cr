"use client";

import { EntityHistoricalRates, EntityRates } from "@/types";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Separator } from "./ui/separator";

type TermOption = {
  value: number;
  label: string;
};

const termOptions = [
  // TODO: Readd when more data is available
  // { value: 1, label: "1 mes" },
  { value: 3, label: "3 meses" },
  { value: 6, label: "6 meses" },
  { value: 12, label: "12 meses" },
];

// Build historical rates from previous monthly rates
const buildHistoricalRates = (
  monthlyRates: Record<string, EntityRates[]>,
): EntityHistoricalRates[] => {
  const entities = new Set(
    Object.values(monthlyRates).flatMap((rates) =>
      rates.map((rate) => rate.entity),
    ),
  );

  const result: EntityHistoricalRates[] = [];

  entities.forEach((entity) => {
    const currencies = new Set<string>();
    const amounts = new Map<string, number>();

    // First pass: collect all currencies and their amounts
    Object.entries(monthlyRates).forEach(([, rates]) => {
      const entityData = rates.find((r) => r.entity === entity);
      if (entityData) {
        Object.entries(entityData.ratesByCurrency).forEach(
          ([currency, ratesByTerm]) => {
            currencies.add(currency);

            if (!amounts.has(currency)) {
              // Only consider specific amounts for CRC and USD
              const targetAmount = currency === "CRC" ? 1000000 : 1500;
              const termRates = Object.values(ratesByTerm).flat();

              if (
                termRates.some(
                  (rate) =>
                    rate.min <= targetAmount &&
                    (!rate.max || targetAmount <= rate.max),
                )
              ) {
                amounts.set(currency, targetAmount);
              }
            }
          },
        );
      }
    });

    // Second pass: build historical rates for each currency
    currencies.forEach((currency) => {
      const netRatesByDate: Record<string, Record<string, number>> = {};

      Object.entries(monthlyRates).forEach(([date, rates]) => {
        const entityData = rates.find((r) => r.entity === entity);

        if (entityData) {
          const dateRates: Record<string, number> = {};
          const currencyRates = entityData.ratesByCurrency[currency];

          if (currencyRates) {
            Object.entries(currencyRates).forEach(([term, ratesByAmount]) => {
              const historicalRateAmount = amounts.get(currency)!;

              const rate = ratesByAmount.find(
                (r) =>
                  r.min <= historicalRateAmount &&
                  (!r.max || historicalRateAmount <= r.max),
              );

              if (rate) {
                dateRates[term] = rate.net;
              }
            });
          }

          if (Object.keys(dateRates).length > 0) {
            netRatesByDate[date] = dateRates;
          }
        }
      });

      if (Object.keys(netRatesByDate).length > 0) {
        result.push({
          entity,
          currency,
          amount: amounts.get(currency)!,
          netRatesByDate,
        });
      }
    });
  });

  return result;
};

const config = {
  BAC: {
    label: "BAC Credomatic",
    color: "hsl(0, 84%, 60%)",
  },
  BCR: {
    label: "Banco de Costa Rica",
    color: "hsl(201, 96%, 32%)",
  },
  BN: {
    label: "Banco Nacional de Costa Rica",
    color: "hsl(142, 76%, 36%)",
  },
  SCOTIA: {
    label: "Scotiabank",
    color: "hsl(0, 84%, 60%)",
  },
} satisfies ChartConfig;

type HistoricalRatesChartProps = {
  monthlyRatesMap: Record<string, EntityRates[]>;
};

export function HistoricalRatesChart({
  monthlyRatesMap,
}: HistoricalRatesChartProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("CRC");
  // TODO: Replace with termOptions[0] when more of our data is available
  const [selectedTerm, setSelectedTerm] = useState<TermOption>(termOptions[1]);

  const historicalRates = useMemo(
    () => buildHistoricalRates(monthlyRatesMap),
    [monthlyRatesMap],
  );

  const data = useMemo(() => {
    const currencyRates = historicalRates.filter(
      (rate) => rate.currency === selectedCurrency,
    );
    // Get all unique dates from all entities and sort them
    const allDates = Array.from(
      new Set(
        currencyRates.flatMap((rate) => Object.keys(rate.netRatesByDate)),
      ),
    ).sort();

    const term = selectedTerm.value;
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    return allDates.map((date) => {
      const monthIndex = new Date(date).getMonth();

      return {
        month: monthNames[monthIndex],
        BAC: currencyRates.find((r) => r.entity === "BAC Credomatic")
          ?.netRatesByDate[date]?.[term],
        BCR: currencyRates.find((r) => r.entity === "Banco de Costa Rica")
          ?.netRatesByDate[date]?.[term],
        BN: currencyRates.find(
          (r) => r.entity === "Banco Nacional de Costa Rica",
        )?.netRatesByDate[date]?.[term],
        SCOTIA: currencyRates.find((r) => r.entity === "Scotiabank")
          ?.netRatesByDate[date]?.[term],
      };
    });
  }, [historicalRates, selectedTerm.value, selectedCurrency]);

  const yAxisDomain = useMemo(() => {
    const allRates = Object.values(monthlyRatesMap).flatMap((rates) =>
      rates.flatMap((rate) =>
        Object.values(rate.ratesByCurrency).flatMap((currencyRates) =>
          Object.values(currencyRates).flatMap((termRates) =>
            termRates.map((r) => r.net),
          ),
        ),
      ),
    );

    if (allRates.length === 0) return [0, 7];

    const maxRate = Math.max(...allRates);

    // Round up to next integer and add 1
    const upperBound = Math.ceil(maxRate) + 1;

    return [0, upperBound];
  }, [monthlyRatesMap]);

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-col gap-6 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-lg font-semibold">Datos históricos</h2>
          <p className="text-sm text-muted-foreground">
            Histórico de tasas netas para certificados a {selectedTerm.label} (
            {selectedCurrency === "CRC" ? "₡1,000,000" : "$1,500"}).
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center">
          <ToggleGroup
            type="single"
            value={selectedCurrency}
            onValueChange={(value) => {
              if (value) setSelectedCurrency(value);
            }}
          >
            <ToggleGroupItem value="CRC" aria-label="Cambiar a CRC">
              CRC
            </ToggleGroupItem>
            <ToggleGroupItem value="USD" aria-label="Cambiar a USD">
              USD
            </ToggleGroupItem>
          </ToggleGroup>
          <Separator
            decorative
            orientation="vertical"
            className="hidden lg:block"
          />
          <ToggleGroup
            type="single"
            value={selectedTerm.label}
            onValueChange={(value) => {
              const option = termOptions.find((o) => o.label === value);

              if (option) setSelectedTerm(option);
            }}
          >
            {termOptions.map((option) => (
              <ToggleGroupItem
                key={option.label}
                value={option.label}
                aria-label={`Cambiar a ${option.label}`}
              >
                {`${option.label}`}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      <ChartContainer config={config} aspect={1.25} maxHeight={400}>
        <LineChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            padding={{ left: 16, right: 16 }}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            orientation="right"
            domain={yAxisDomain}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            dataKey="BAC"
            type="linear"
            stroke={config.BAC.color}
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="BCR"
            type="linear"
            stroke={config.BCR.color}
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="BN"
            type="linear"
            stroke={config.BN.color}
            strokeWidth={2}
            dot={false}
          />
          {/* TODO: Readd when scotiabank has more than 1 month of historical data */}
          {/* <Line
            dataKey="SCOTIA"
            type="linear"
            stroke={config.SCOTIA.color}
            strokeWidth={2}
            dot={false}
          /> */}
        </LineChart>
      </ChartContainer>
    </div>
  );
}
