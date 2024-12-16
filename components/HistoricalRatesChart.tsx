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
  { value: 1, label: "1 mes" },
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
        Object.values(entityData.ratesByTerm).forEach((ratesByAmount) => {
          ratesByAmount.forEach((rate) => {
            currencies.add(rate.currency);
            if (!amounts.has(rate.currency)) {
              amounts.set(rate.currency, rate.min);
            }
          });
        });
      }
    });

    // Second pass: build historical rates for each currency
    currencies.forEach((currency) => {
      const netRatesByDate: Record<string, Record<string, number>> = {};

      Object.entries(monthlyRates).forEach(([date, rates]) => {
        const entityData = rates.find((r) => r.entity === entity);
        if (entityData) {
          const dateRates: Record<string, number> = {};

          Object.entries(entityData.ratesByTerm).forEach(
            ([term, ratesByAmount]) => {
              const rate = ratesByAmount.find(
                (r) =>
                  r.currency === currency && r.min === amounts.get(currency),
              );

              if (rate) {
                dateRates[term] = rate.net;
              }
            },
          );

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
      };
    });
  }, [historicalRates, selectedTerm.value, selectedCurrency]);

  const [yAxisLowerBound, yAxisUpperBound] = useMemo(() => {
    const allRates = data.flatMap((entry) =>
      [entry.BAC, entry.BCR, entry.BN].filter((rate) => rate !== undefined),
    );

    if (allRates.length === 0) return [0, 7];

    const minRate = Math.min(...allRates);
    const maxRate = Math.max(...allRates);

    // Round down to previous 0.25
    const lowerBound = Math.floor(minRate * 4) / 4;
    // Round up to next 0.25 and add 0.5
    const upperBound = Math.ceil(maxRate * 4) / 4 + 0.5;

    return [lowerBound, upperBound];
  }, [data]);

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
                // TODO: Remove when more of our data is available
                disabled={option.label === "1 mes"}
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
            domain={[yAxisLowerBound, yAxisUpperBound]}
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
        </LineChart>
      </ChartContainer>
    </div>
  );
}
