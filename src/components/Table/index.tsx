import "./table.css";

type TableProps = {
  headers: { key: string; value: string }[];
  rows: { key: string; value: string }[];
};

export const Table = ({ headers, rows }: TableProps) => (
  <table className="table">
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header.key}>{header.value}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row: any, rowIdx) => (
        <tr key={rowIdx}>
          {headers.map((header, cellIdx) => (
            <td key={`${header.key}-${cellIdx}`}>{row[header.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
