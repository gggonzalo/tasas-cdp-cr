"use client";

import { useMemo, useState } from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableCaption,
} from "@/components/ui/table";
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
import { Currency, EntityRates } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type AmountOption = {
  amount: number;
  currency: Currency;
  label: string;
};

// TODO: Definir estos valores yo segun lo que vea mas comun de saltos en los bancos
const amountOptions: AmountOption[] = [
  { amount: 250000, currency: "CRC", label: "₡250,000" },
  { amount: 1000000, currency: "CRC", label: "₡1,000,000" },
  { amount: 5000000, currency: "CRC", label: "₡5,000,000" },
  { amount: 10000000, currency: "CRC", label: "₡10,000,000" },
  { amount: 1000, currency: "USD", label: "$1,000" },
  { amount: 5000, currency: "USD", label: "$5,000" },
  { amount: 10000, currency: "USD", label: "$10,000" },
  { amount: 50000, currency: "USD", label: "$50,000" },
];

type TableRowRates = {
  gross: number;
  net: number;
};

type TableRow = {
  entity: string;
  term180: TableRowRates | null;
  term360: TableRowRates | null;
  term720: TableRowRates | null;
  term1080: TableRowRates | null;
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

const columns: ColumnDef<TableRow>[] = [
  {
    accessorKey: "entity",
    header: "Entidad",
  },
  {
    accessorKey: "term180",
    header: ({ column }) => generateTermColSortableHeader(column, "6 meses"),
    cell: ({ row }) => {
      const rates = row.getValue("term180") as TableRowRates;

      if (!rates)
        return (
          <span className="text-xs text-muted-foreground">Sin información</span>
        );

      return (
        <span className="text-xs">
          {`${rates.gross.toFixed(2)}%`} /{" "}
          <span className="font-semibold">{`${rates.net.toFixed(2)}%`}</span>
        </span>
      );
    },
    sortingFn: (rowA, rowB) => sortRowsByNetRate(rowA, rowB, "term180"),
  },
  {
    accessorKey: "term360",
    header: ({ column }) => generateTermColSortableHeader(column, "12 meses"),
    cell: ({ row }) => {
      const rates = row.getValue("term360") as TableRowRates;

      if (!rates)
        return (
          <span className="text-xs text-muted-foreground">Sin información</span>
        );

      return (
        <span className="text-xs">
          {`${rates.gross.toFixed(2)}%`} /{" "}
          <span className="font-semibold">{`${rates.net.toFixed(2)}%`}</span>
        </span>
      );
    },
    sortingFn: (rowA, rowB) => sortRowsByNetRate(rowA, rowB, "term360"),
  },
  {
    accessorKey: "term720",
    header: ({ column }) => generateTermColSortableHeader(column, "24 meses"),
    cell: ({ row }) => {
      const rates = row.getValue("term720") as TableRowRates;

      if (!rates)
        return (
          <span className="text-xs text-muted-foreground">Sin información</span>
        );

      return (
        <span className="text-xs">
          {`${rates.gross.toFixed(2)}%`} /{" "}
          <span className="font-semibold">{`${rates.net.toFixed(2)}%`}</span>
        </span>
      );
    },
    sortingFn: (rowA, rowB) => sortRowsByNetRate(rowA, rowB, "term720"),
  },
  {
    accessorKey: "term1080",
    header: ({ column }) => generateTermColSortableHeader(column, "36 meses"),
    cell: ({ row }) => {
      const rates = row.getValue("term1080") as TableRowRates;

      if (!rates)
        return (
          <span className="text-xs text-muted-foreground">Sin información</span>
        );

      return (
        <span className="text-xs">
          {`${rates.gross.toFixed(2)}%`} /{" "}
          <span className="font-semibold">{`${rates.net.toFixed(2)}%`}</span>
        </span>
      );
    },
    sortingFn: (rowA, rowB) => sortRowsByNetRate(rowA, rowB, "term1080"),
  },
];

interface MultipleTermsTableProps {
  entitiesRates: EntityRates[];
}

export function MultipleTermsTable({ entitiesRates }: MultipleTermsTableProps) {
  const [selectedAmount, setSelectedAmount] = useState<AmountOption>(
    amountOptions[0],
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const filteredRows: TableRow[] = useMemo(
    () =>
      entitiesRates.map((entityRates) => {
        const getAmountRatesForTerm = (term: number) => {
          const termRates = entityRates.ratesByTerm[term];
          return termRates.find((tr) => tr.amount === selectedAmount.amount);
        };

        const rates180 = getAmountRatesForTerm(180);
        const rates360 = getAmountRatesForTerm(360);
        const rates720 = getAmountRatesForTerm(720);
        const rates1080 = getAmountRatesForTerm(1080);

        return {
          entity: entityRates.entity,
          term180: rates180
            ? { gross: rates180.grossRate, net: rates180.netRate }
            : null,
          term360: rates360
            ? { gross: rates360.grossRate, net: rates360.netRate }
            : null,
          term720: rates720
            ? { gross: rates720.grossRate, net: rates720.netRate }
            : null,
          term1080: rates1080
            ? { gross: rates1080.grossRate, net: rates1080.netRate }
            : null,
        };
      }),
    [entitiesRates, selectedAmount],
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
      <div className="mb-4 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold">Tasas por plazo</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Label htmlFor="amount-range">Monto</Label>
          <Select
            value={selectedAmount.label}
            onValueChange={(value) => {
              const option = amountOptions.find((o) => o.label === value);

              if (option) setSelectedAmount(option);
            }}
          >
            <SelectTrigger id="amount-range" className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Colones</SelectLabel>
                {amountOptions
                  .filter((o) => o.currency === "CRC")
                  .map((option) => (
                    <SelectItem key={option.label} value={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Dólares</SelectLabel>
                {amountOptions
                  .filter((o) => o.currency === "USD")
                  .map((option) => (
                    <SelectItem key={option.label} value={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableCaption className="italic">
          Las tasas se muestran en formato: tasa bruta /{" "}
          <span className="font-semibold">tasa neta</span>. Haga clic en los
          encabezados para ordenar por{" "}
          <span className="font-semibold">tasa neta</span>.
        </TableCaption>
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
  );
}
