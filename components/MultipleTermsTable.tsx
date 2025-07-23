"use client";

import { useMemo, useState } from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  Row,
  Column,
  SortingState,
} from "@tanstack/react-table";
import { EntityRates, RateByAmount } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type CurrencyOption = {
  currency: string;
  label: string;
  defaultAmount: number;
};

const currencyOptions: CurrencyOption[] = [
  { currency: "CRC", label: "Colones", defaultAmount: 1000000 },
  { currency: "USD", label: "Dólares", defaultAmount: 1500 },
];

type TableRowRates = {
  gross: number;
  net: number;
};

type TableRow = {
  entity: string;
  term1: TableRowRates | null;
  term3: TableRowRates | null;
  term6: TableRowRates | null;
  term12: TableRowRates | null;
  allRates: {
    [key: string]: RateByAmount[];
  };
};

const sortRowsByNetRate = (
  rowA: Row<TableRow>,
  rowB: Row<TableRow>,
  termAccessorKey: string,
) => {
  const a = rowA.getValue(termAccessorKey) as {
    gross: number;
    net: number;
  } | null;
  const b = rowB.getValue(termAccessorKey) as {
    gross: number;
    net: number;
  } | null;

  if (!a) return -1;
  if (!b) return 1;

  return a.net - b.net;
};

const generateTermColSortableHeader = (
  column: Column<TableRow>,
  label: string,
) => {
  const sortDir = column.getIsSorted();

  return (
    <Button size="sm" variant="ghost" onClick={() => column.toggleSorting()}>
      {label}
      {!sortDir && <ArrowUpDown className="ml-1" />}
      {sortDir === "asc" && <ArrowUp className="ml-1" />}
      {sortDir === "desc" && <ArrowDown className="ml-1" />}
    </Button>
  );
};

const generateTermCell = (
  termRatesRow: TableRowRates | null,
  allRates: { min: number; max: number | null; gross: number; net: number }[],
) => {
  if (!termRatesRow)
    return (
      <span className="text-nowrap text-xs text-muted-foreground">
        Sin información
      </span>
    );

  const hasVariableRates = allRates.length > 1;
  const rateDisplay = (
    <span className="text-nowrap text-xs">
      {`${termRatesRow.gross.toFixed(2)}%`} /{" "}
      <span className="font-semibold">{`${termRatesRow.net.toFixed(2)}%`}</span>
    </span>
  );

  if (!hasVariableRates) return rateDisplay;

  return (
    <Tooltip>
      <TooltipTrigger>
        <span className="text-nowrap text-xs underline decoration-dotted underline-offset-2">
          {`${termRatesRow.gross.toFixed(2)}%`} /{" "}
          <span className="font-semibold">{`${termRatesRow.net.toFixed(2)}%`}</span>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="mb-1 font-semibold">Tasas variables por monto:</p>
        {allRates.map((rate, index) => (
          <p key={index}>
            {rate.min.toLocaleString()}{" "}
            {rate.max ? `- ${rate.max.toLocaleString()}` : "o más"}:{" "}
            <span className="text-nowrap text-xs">
              {`${rate.gross.toFixed(2)}%`} /{" "}
              <span className="font-semibold">{`${rate.net.toFixed(2)}%`}</span>
            </span>
          </p>
        ))}
      </TooltipContent>
    </Tooltip>
  );
};

const columns: ColumnDef<TableRow>[] = [
  {
    accessorKey: "entity",
    header: "Entidad",
    cell: ({ row }) => (
      <span className="text-nowrap">{row.getValue("entity")}</span>
    ),
  },
  {
    accessorKey: "term1",
    header: ({ column }) => generateTermColSortableHeader(column, "1 mes"),
    cell: ({ row }) =>
      generateTermCell(row.getValue("term1"), row.original.allRates?.["1"]),
    sortingFn: (rowA, rowB) => sortRowsByNetRate(rowA, rowB, "term1"),
  },
  {
    accessorKey: "term3",
    header: ({ column }) => generateTermColSortableHeader(column, "3 meses"),
    cell: ({ row }) =>
      generateTermCell(row.getValue("term3"), row.original.allRates?.["3"]),
    sortingFn: (rowA, rowB) => sortRowsByNetRate(rowA, rowB, "term3"),
  },
  {
    accessorKey: "term6",
    header: ({ column }) => generateTermColSortableHeader(column, "6 meses"),
    cell: ({ row }) =>
      generateTermCell(row.getValue("term6"), row.original.allRates?.["6"]),
    sortingFn: (rowA, rowB) => sortRowsByNetRate(rowA, rowB, "term6"),
  },
  {
    accessorKey: "term12",
    header: ({ column }) => generateTermColSortableHeader(column, "12 meses"),
    cell: ({ row }) =>
      generateTermCell(row.getValue("term12"), row.original.allRates?.["12"]),
    sortingFn: (rowA, rowB) => sortRowsByNetRate(rowA, rowB, "term12"),
  },
];

type MultipleTermsTableProps = {
  entitiesRates: EntityRates[];
};

export function MultipleTermsTable({ entitiesRates }: MultipleTermsTableProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(
    currencyOptions[0],
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const filteredRows: TableRow[] = useMemo(
    () =>
      entitiesRates.map((entityRates) => {
        const processTermRates = (term: string) => {
          const currencyRates =
            entityRates.ratesByCurrency[selectedCurrency.currency];
          if (!currencyRates) return { defaultRate: null, allRates: [] };

          const termRates = currencyRates[term] || [];

          // Find the default rate to display (using the default amount)
          const defaultRate = termRates.find(
            (tr) =>
              tr.min <= selectedCurrency.defaultAmount &&
              (!tr.max || selectedCurrency.defaultAmount <= tr.max),
          );

          return {
            defaultRate: defaultRate
              ? { gross: defaultRate.gross, net: defaultRate.net }
              : null,
            allRates: termRates,
          };
        };

        const { defaultRate: rate1, allRates: allRates1 } =
          processTermRates("1");
        const { defaultRate: rate3, allRates: allRates3 } =
          processTermRates("3");
        const { defaultRate: rate6, allRates: allRates6 } =
          processTermRates("6");
        const { defaultRate: rate12, allRates: allRates12 } =
          processTermRates("12");

        return {
          entity: entityRates.entity,
          term1: rate1,
          term3: rate3,
          term6: rate6,
          term12: rate12,
          allRates: {
            "1": allRates1,
            "3": allRates3,
            "6": allRates6,
            "12": allRates12,
          },
        };
      }),
    [entitiesRates, selectedCurrency],
  );

  const table = useReactTable({
    data: filteredRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-col gap-5 lg:flex-row lg:justify-between lg:gap-16">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <h2 className="text-lg font-semibold">Tasas por plazo</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Tasas mostradas: bruta / <span className="font-semibold">neta</span>{" "}
            para ₡1.000.000 o $1.500. Los valores subrayados indican tasas
            variables por monto (tocar o pasar el cursor para ver). Use los
            encabezados para ordenar por{" "}
            <span className="font-semibold">tasa neta</span>.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <Label htmlFor="currency">Moneda</Label>
          <Select
            value={selectedCurrency.currency}
            onValueChange={(value) => {
              const option = currencyOptions.find((o) => o.currency === value);
              if (option) setSelectedCurrency(option);
            }}
          >
            <SelectTrigger id="currency" className="w-[110px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {currencyOptions.map((option) => (
                  <SelectItem key={option.currency} value={option.currency}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="[&:has(button)]:px-1">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
