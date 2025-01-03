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
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  Row,
  Column,
  SortingState,
} from "@tanstack/react-table";
import { EntityRates } from "@/types";
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
import { ArrowUpDown, ArrowUp, ArrowDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type AmountOption = {
  amount: number;
  currency: string;
  label: string;
};

// TODO: Remove commented options until we have a better idea on how to show different amounts that affect all rates more evenly (input instead of a select?)
const amountOptions: AmountOption[] = [
  { amount: 1000000, currency: "CRC", label: "₡1,000,000" },
  // { amount: 2500000, currency: "CRC", label: "₡2,500,000" },
  // { amount: 5000000, currency: "CRC", label: "₡5,000,000" },
  // { amount: 10000000, currency: "CRC", label: "₡10,000,000" },
  { amount: 1500, currency: "USD", label: "$1,500" },
  // { amount: 5000, currency: "USD", label: "$5,000" },
  // { amount: 10000, currency: "USD", label: "$10,000" },
  // { amount: 20000, currency: "USD", label: "$20,000" },
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

const generateTermCell = (termRatesRow: TableRowRates | null) => {
  if (!termRatesRow)
    return (
      <span className="text-nowrap text-xs text-muted-foreground">
        Sin información
      </span>
    );

  return (
    <span className="text-nowrap text-xs">
      {`${termRatesRow.gross.toFixed(2)}%`} /{" "}
      <span className="font-semibold">{`${termRatesRow.net.toFixed(2)}%`}</span>
    </span>
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
    cell: ({ row }) => generateTermCell(row.getValue("term1")),
    sortingFn: (rowA, rowB) => sortRowsByNetRate(rowA, rowB, "term1"),
  },
  {
    accessorKey: "term3",
    header: ({ column }) => generateTermColSortableHeader(column, "3 meses"),
    cell: ({ row }) => generateTermCell(row.getValue("term3")),
    sortingFn: (rowA, rowB) => sortRowsByNetRate(rowA, rowB, "term3"),
  },
  {
    accessorKey: "term6",
    header: ({ column }) => generateTermColSortableHeader(column, "6 meses"),
    cell: ({ row }) => generateTermCell(row.getValue("term6")),
    sortingFn: (rowA, rowB) => sortRowsByNetRate(rowA, rowB, "term6"),
  },
  {
    accessorKey: "term12",
    header: ({ column }) => generateTermColSortableHeader(column, "12 meses"),
    cell: ({ row }) => generateTermCell(row.getValue("term12")),
    sortingFn: (rowA, rowB) => sortRowsByNetRate(rowA, rowB, "term12"),
  },
];

type MultipleTermsTableProps = {
  entitiesRates: EntityRates[];
};

export function MultipleTermsTable({ entitiesRates }: MultipleTermsTableProps) {
  const [selectedAmount, setSelectedAmount] = useState<AmountOption>(
    amountOptions[0],
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const filteredRows: TableRow[] = useMemo(
    () =>
      entitiesRates.map((entityRates) => {
        const getAmountRateForTerm = (term: string) => {
          const currencyRates =
            entityRates.ratesByCurrency[selectedAmount.currency];
          if (!currencyRates) return undefined;

          const termRates = currencyRates[term];

          return termRates?.find(
            (tr) =>
              tr.min <= selectedAmount.amount &&
              (!tr.max || selectedAmount.amount <= tr.max),
          );
        };

        const rate1 = getAmountRateForTerm("1");
        const rate3 = getAmountRateForTerm("3");
        const rate6 = getAmountRateForTerm("6");
        const rate12 = getAmountRateForTerm("12");

        return {
          entity: entityRates.entity,
          term1: rate1 ? { gross: rate1.gross, net: rate1.net } : null,
          term3: rate3 ? { gross: rate3.gross, net: rate3.net } : null,
          term6: rate6 ? { gross: rate6.gross, net: rate6.net } : null,
          term12: rate12 ? { gross: rate12.gross, net: rate12.net } : null,
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
      <div className="mb-4 flex flex-col gap-5 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <h2 className="text-lg font-semibold">Tasas por plazo</h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Info />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <p className="text-center text-sm">
                  1 mes = 30 días
                  <br />
                  3 meses = 90 días
                  <br />
                  6 meses = 180 días
                  <br />
                  12 meses = 365 días
                </p>
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-sm text-muted-foreground">
            Las tasas se muestran en formato tasa bruta /{" "}
            <span className="font-semibold">tasa neta</span>. Utilice los
            encabezados para ordenar por{" "}
            <span className="font-semibold">tasa neta</span>.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <Label htmlFor="amount">Monto</Label>
          <Select
            value={selectedAmount.label}
            onValueChange={(value) => {
              const option = amountOptions.find((o) => o.label === value);

              if (option) setSelectedAmount(option);
            }}
          >
            <SelectTrigger id="amount" className="w-[140px]">
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
