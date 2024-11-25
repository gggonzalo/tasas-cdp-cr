"use client";

import { Currency, EntityHistoricalRates } from "@/types";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";

type TermOption = {
  value: number;
  label: string;
};

const termOptions = [
  { value: 1, label: "1 mes" },
  { value: 3, label: "3 meses" },
  { value: 6, label: "6 meses" },
  { value: 12, label: "12 meses" },
  { value: 24, label: "24 meses" },
];

const historicalRates: EntityHistoricalRates[] = [
  {
    entity: "BAC",
    currency: "CRC",
    amount: 1000000,
    netRatesByDate: {
      "2024-01-01T06:00Z": { 1: 6.38, 3: 6.39, 6: 6.38, 12: 6.42, 24: 6.45 },
      "2024-02-01T06:00Z": { 1: 6.45, 3: 6.46, 6: 6.42, 12: 6.5, 24: 6.52 },
      "2024-03-01T06:00Z": { 1: 6.52, 3: 6.54, 6: 6.5, 12: 6.58, 24: 6.6 },
      "2024-04-01T06:00Z": { 1: 6.6, 3: 6.61, 6: 6.58, 12: 6.65, 24: 6.68 },
      "2024-05-01T06:00Z": { 1: 6.55, 3: 6.56, 6: 6.52, 12: 6.6, 24: 6.62 },
      "2024-06-01T06:00Z": { 1: 6.5, 3: 6.51, 6: 6.48, 12: 6.55, 24: 6.58 },
      "2024-08-01T06:00Z": { 1: 6.42, 3: 6.44, 6: 6.4, 12: 6.48, 24: 6.5 },
      "2024-09-01T06:00Z": { 1: 6.4, 3: 6.41, 6: 6.38, 12: 6.45, 24: 6.48 },
      "2024-10-01T06:00Z": { 1: 6.38, 3: 6.39, 6: 6.35, 12: 6.42, 24: 6.45 },
      "2024-11-01T06:00Z": { 1: 6.35, 3: 6.36, 6: 6.32, 12: 6.4, 24: 6.42 },
    },
  },
  {
    entity: "BAC",
    currency: "USD",
    amount: 1500,
    netRatesByDate: {
      "2024-01-01T06:00Z": { 1: 3.61, 3: 3.7, 6: 3.83, 12: 4.04, 24: 4.25 },
      "2024-02-01T06:00Z": { 1: 3.65, 3: 3.75, 6: 3.87, 12: 4.08, 24: 4.29 },
      "2024-03-01T06:00Z": { 1: 3.7, 3: 3.8, 6: 3.91, 12: 4.12, 24: 4.33 },
      "2024-04-01T06:00Z": { 1: 3.75, 3: 3.85, 6: 3.95, 12: 4.16, 24: 4.37 },
      "2024-05-01T06:00Z": { 1: 3.72, 3: 3.82, 6: 3.93, 12: 4.14, 24: 4.35 },
      "2024-06-01T06:00Z": { 1: 3.7, 3: 3.8, 6: 3.91, 12: 4.12, 24: 4.33 },
      "2024-08-01T06:00Z": { 1: 3.65, 3: 3.75, 6: 3.87, 12: 4.08, 24: 4.29 },
      "2024-09-01T06:00Z": { 1: 3.63, 3: 3.73, 6: 3.85, 12: 4.06, 24: 4.27 },
      "2024-10-01T06:00Z": { 1: 3.61, 3: 3.71, 6: 3.83, 12: 4.04, 24: 4.25 },
      "2024-11-01T06:00Z": { 1: 3.59, 3: 3.69, 6: 3.81, 12: 4.02, 24: 4.23 },
    },
  },
  {
    entity: "BCR",
    currency: "CRC",
    amount: 1000000,
    netRatesByDate: {
      "2024-01-01T06:00Z": { 1: 5.74, 2: 5.8, 6: 5.74, 12: 5.85 },
      "2024-02-01T06:00Z": { 1: 5.8, 2: 5.85, 6: 5.8, 12: 5.9 },
      "2024-03-01T06:00Z": { 1: 5.85, 2: 5.9, 6: 5.85, 12: 5.95 },
      "2024-04-01T06:00Z": { 1: 5.9, 2: 5.95, 6: 5.9, 12: 6.0 },
      "2024-05-01T06:00Z": { 1: 5.88, 2: 5.92, 6: 5.88, 12: 5.98 },
      "2024-06-01T06:00Z": { 1: 5.85, 2: 5.9, 6: 5.85, 12: 5.95 },
      "2024-08-01T06:00Z": { 1: 5.8, 2: 5.85, 6: 5.8, 12: 5.9 },
      "2024-09-01T06:00Z": { 1: 5.78, 2: 5.82, 6: 5.78, 12: 5.88 },
      "2024-10-01T06:00Z": { 1: 5.75, 2: 5.8, 6: 5.75, 12: 5.85 },
      "2024-11-01T06:00Z": { 1: 5.72, 2: 5.78, 6: 5.72, 12: 5.82 },
    },
  },
  {
    entity: "BCR",
    currency: "USD",
    amount: 1500,
    netRatesByDate: {
      "2024-01-01T06:00Z": { 1: 3.51, 3: 3.6, 6: 3.73, 12: 3.94, 24: 4.15 },
      "2024-02-01T06:00Z": { 1: 3.55, 3: 3.65, 6: 3.77, 12: 3.98, 24: 4.19 },
      "2024-03-01T06:00Z": { 1: 3.6, 3: 3.7, 6: 3.81, 12: 4.02, 24: 4.23 },
      "2024-04-01T06:00Z": { 1: 3.65, 3: 3.75, 6: 3.85, 12: 4.06, 24: 4.27 },
      "2024-05-01T06:00Z": { 1: 3.62, 3: 3.72, 6: 3.83, 12: 4.04, 24: 4.25 },
      "2024-06-01T06:00Z": { 1: 3.6, 3: 3.7, 6: 3.81, 12: 4.02, 24: 4.23 },
      "2024-08-01T06:00Z": { 1: 3.55, 3: 3.65, 6: 3.77, 12: 3.98, 24: 4.19 },
      "2024-09-01T06:00Z": { 1: 3.53, 3: 3.63, 6: 3.75, 12: 3.96, 24: 4.17 },
      "2024-10-01T06:00Z": { 1: 3.51, 3: 3.61, 6: 3.73, 12: 3.94, 24: 4.15 },
      "2024-11-01T06:00Z": { 1: 3.49, 3: 3.59, 6: 3.71, 12: 3.92, 24: 4.13 },
    },
  },
  {
    entity: "BN",
    currency: "CRC",
    amount: 1000000,
    netRatesByDate: {
      "2024-01-01T06:00Z": { 1: 6.16, 2: 6.2, 6: 6.16, 12: 6.25 },
      "2024-02-01T06:00Z": { 1: 6.2, 2: 6.25, 6: 6.2, 12: 6.3 },
      "2024-03-01T06:00Z": { 1: 6.25, 2: 6.3, 6: 6.25, 12: 6.35 },
      "2024-04-01T06:00Z": { 1: 6.3, 2: 6.35, 6: 6.3, 12: 6.4 },
      "2024-05-01T06:00Z": { 1: 6.28, 2: 6.32, 6: 6.28, 12: 6.38 },
      "2024-06-01T06:00Z": { 1: 6.25, 2: 6.3, 6: 6.25, 12: 6.35 },
      "2024-08-01T06:00Z": { 1: 6.2, 2: 6.25, 6: 6.2, 12: 6.3 },
      "2024-09-01T06:00Z": { 1: 6.18, 2: 6.22, 6: 6.18, 12: 6.28 },
      "2024-10-01T06:00Z": { 1: 6.15, 2: 6.2, 6: 6.15, 12: 6.25 },
      "2024-11-01T06:00Z": { 1: 6.12, 2: 6.18, 6: 6.12, 12: 6.22 },
    },
  },
  {
    entity: "BN",
    currency: "USD",
    amount: 1500,
    netRatesByDate: {
      "2024-01-01T06:00Z": { 1: 3.56, 3: 3.65, 6: 3.78, 12: 3.99, 24: 4.2 },
      "2024-02-01T06:00Z": { 1: 3.6, 3: 3.7, 6: 3.82, 12: 4.03, 24: 4.24 },
      "2024-03-01T06:00Z": { 1: 3.65, 3: 3.75, 6: 3.86, 12: 4.07, 24: 4.28 },
      "2024-04-01T06:00Z": { 1: 3.7, 3: 3.8, 6: 3.9, 12: 4.11, 24: 4.32 },
      "2024-05-01T06:00Z": { 1: 3.67, 3: 3.77, 6: 3.88, 12: 4.09, 24: 4.3 },
      "2024-06-01T06:00Z": { 1: 3.65, 3: 3.75, 6: 3.86, 12: 4.07, 24: 4.28 },
      "2024-08-01T06:00Z": { 1: 3.6, 3: 3.7, 6: 3.82, 12: 4.03, 24: 4.24 },
      "2024-09-01T06:00Z": { 1: 3.58, 3: 3.68, 6: 3.8, 12: 4.01, 24: 4.22 },
      "2024-10-01T06:00Z": { 1: 3.56, 3: 3.66, 6: 3.78, 12: 3.99, 24: 4.2 },
      "2024-11-01T06:00Z": { 1: 3.54, 3: 3.64, 6: 3.76, 12: 3.97, 24: 4.18 },
    },
  },
];

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
    label: "Banco Nacional",
    color: "hsl(142, 76%, 36%)",
  },
} satisfies ChartConfig;

export function HistoricalRatesChart() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("CRC");
  const [selectedTerm, setSelectedTerm] = useState<TermOption>(termOptions[0]);

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

    return allDates
      .map((date) => {
        const monthIndex = new Date(date).getMonth();

        return {
          month: monthNames[monthIndex],
          BAC: currencyRates.find((r) => r.entity === "BAC")?.netRatesByDate[
            date
          ]?.[term],
          BCR: currencyRates.find((r) => r.entity === "BCR")?.netRatesByDate[
            date
          ]?.[term],
          BN: currencyRates.find((r) => r.entity === "BN")?.netRatesByDate[
            date
          ]?.[term],
        };
      })
      .filter(
        (point) =>
          point.BAC !== null || point.BCR !== null || point.BN !== null,
      );
  }, [selectedTerm, selectedCurrency]);

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
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <Label htmlFor="currency">Moneda</Label>
            <Select
              value={selectedCurrency}
              onValueChange={(value: Currency) => setSelectedCurrency(value)}
            >
              <SelectTrigger id="currency" className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CRC">CRC</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <Label htmlFor="term">Plazo</Label>
            <Select
              value={selectedTerm.label}
              onValueChange={(value) => {
                const option = termOptions.find((o) => o.label === value);

                if (option) setSelectedTerm(option);
              }}
            >
              <SelectTrigger id="term" className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {termOptions.map((option) => (
                  <SelectItem key={option.label} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <ChartContainer config={config}>
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
            domain={[0, selectedCurrency === "CRC" ? 10 : 6]}
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