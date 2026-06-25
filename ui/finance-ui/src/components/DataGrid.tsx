  import {
    useReactTable,
    getCoreRowModel,
    flexRender,
  } from "@tanstack/react-table";

  import type { ColumnDef } from "@tanstack/react-table";

  export default function DataGrid<T>({
    data,
    columns,
  }: {
    data: T[];
    columns: ColumnDef<T>[];
  }) {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
      <div
        style={{
          overflowX: "auto",
          borderRadius: 12,
          background: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ background: "#f3f4f6" }}>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      padding: 10,
                      textAlign: "left",
                      fontSize: 14,
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
  
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: 10,
                      borderTop: "1px solid #eee",
                    }}
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  