import { useState, MouseEvent, ChangeEvent, useEffect } from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";

type TableProps = {
  headers: { key: string; value: string }[];
  rows: { key: string; value: string }[];
  total?: number;
  onPagination?: Function;
  shouldPaginate?: Boolean;
  additionalQueryParams?: string;
};

export const Table = ({
  headers,
  rows,
  total,
  onPagination,
  shouldPaginate = true,
  additionalQueryParams,
}: TableProps) => {
  const DEFAULT_ROWS_PER_PAGE = 10;
  const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 20, 30];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  useEffect(() => {
    if (onPagination) {
      onPagination(
        `?limit=${rowsPerPage}&offset=${page * rowsPerPage}${
          additionalQueryParams ? `&${additionalQueryParams}` : ""
        }`
      );
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (onPagination) {
      setPage(0);
      setRowsPerPage(DEFAULT_ROWS_PER_PAGE);
      onPagination(
        `?limit=${rowsPerPage}&offset=${page * rowsPerPage}${
          additionalQueryParams ? `&${additionalQueryParams}` : ""
        }`
      );
    }
  }, [additionalQueryParams]);

  const handleChangePage = (
    _: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <MuiTable size="small">
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
        {shouldPaginate && total ? (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE_OPTIONS}
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{ select: { native: true } }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        ) : null}
      </MuiTable>
    </Paper>
  );
};

type TablePaginationActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: MouseEvent<HTMLButtonElement>, newPage: number) => void;
};

const TablePaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) => {
  const handleFirstPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        <FirstPage />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <LastPage />
      </IconButton>
    </Box>
  );
};
