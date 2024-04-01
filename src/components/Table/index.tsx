import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type TableProps = {
  headers: { key: string; value: string }[];
  rows: { key: string; value: string }[];
};

export const Table = ({ headers, rows }: TableProps) => (
  <TableContainer component={Paper}>
    <MuiTable sx={{ minWidth: 800 }}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell key={header.key}>{header.value}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row: any, rowIdx) => (
          <TableRow
            key={rowIdx}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {headers.map((header, cellIdx) => (
              <TableCell key={`${header.key}-${cellIdx}`}>
                {row[header.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  </TableContainer>
);
