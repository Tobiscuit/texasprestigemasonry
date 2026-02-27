'use client';
import React from 'react';

interface DataTableProps {
  columns?: any[];
  data?: any[];
  [key: string]: any;
}

export function DataTable({ columns = [], data = [], ...props }: DataTableProps) {
  return (
    <div className="bg-[var(--staff-surface)] rounded-xl border border-[var(--staff-border)] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--staff-border)]">
            {columns.map((col: any, i: number) => (
              <th key={i} className="text-left p-3 text-[var(--staff-muted)] font-bold text-xs uppercase tracking-wider">
                {col.header || col.accessorKey || ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-8 text-center text-[var(--staff-muted)]">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row: any, i: number) => (
              <tr key={i} className="border-b border-[var(--staff-border)] hover:bg-[var(--staff-surface-alt)]">
                {columns.map((col: any, j: number) => (
                  <td key={j} className="p-3 text-[var(--staff-text)]">
                    {col.cell ? col.cell({ row: { original: row } }) : row[col.accessorKey] || ''}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
