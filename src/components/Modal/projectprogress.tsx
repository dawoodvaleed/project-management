import {
  Button,
  Grid,
  TextField,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableContainer,
  TableBody,
  TextareaAutosize,
} from "@mui/material";
import { useState, FC } from "react";
import { ModalType } from "../../utils/commonTypes";

type ProjectDetail = {
  work: string;
  item: string;
  uom: string;
  qty: number;
  price: number;
  amount: number;
  progressPercentage: number;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
  bankComments: string;
  vendorComments: string;
};

interface ProjectProgressModalProps {
  data: {
    projectNumber: string;
    branch: string;
    vendor: string;
    budgetAmount: number;
    overallProjectPercentage: number;
    workCompletionDate: string;
    ProjectDetail: ProjectDetail[];
    measurements: any[];
  };
  type: ModalType;
}

export const ProjectProgressModal: FC<ProjectProgressModalProps> = ({
  data,
}) => {
  const [projectNumber] = useState(data?.projectNumber || "");
  const [branch] = useState(data?.branch || "");
  const [vendor] = useState(data?.vendor || "");
  const [budgetAmount] = useState(data?.budgetAmount || 0);
  const [overallProjectPercentage] = useState(
    data?.overallProjectPercentage || 0
  );
  const [workCompletionDate] = useState(data?.workCompletionDate || "");

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Typography variant="body1" fontWeight="bold">
              Project #:
            </Typography>
            <TextField
              id="projectNumber"
              variant="outlined"
              fullWidth
              value={projectNumber}
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body1" fontWeight="bold">
              Branch:
            </Typography>
            <TextField
              id="branch"
              variant="outlined"
              fullWidth
              value={branch}
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body1" fontWeight="bold">
              Vendor:
            </Typography>
            <TextField
              id="vendor"
              variant="outlined"
              fullWidth
              value={vendor}
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body1" fontWeight="bold">
              Budget Amount:
            </Typography>
            <TextField
              id="budgetAmount"
              variant="outlined"
              fullWidth
              value={budgetAmount.toString()}
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body1" fontWeight="bold">
              Overall Project %:
            </Typography>
            <TextField
              id="overallProjectPercentage"
              variant="outlined"
              fullWidth
              value={overallProjectPercentage.toString()}
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body1" fontWeight="bold">
              Work Completion Date:
            </Typography>
            <TextField
              id="workCompletionDate"
              variant="outlined"
              fullWidth
              value={workCompletionDate}
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="flex-end">
            <Button variant="contained" color="primary" sx={{ height: 40 }}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Sr#</TableCell>
                <TableCell>Work</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>UOM</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Progress %</TableCell>
                <TableCell>Last Updated by</TableCell>
                <TableCell>Last Updated date</TableCell>
                <TableCell>Bank comments</TableCell>
                <TableCell>Vendor comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.measurements.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.item.work}</TableCell>
                  <TableCell>{`${row.item.id} - ${row.item.name}`}</TableCell>
                  <TableCell>{row.item.unitOfMeasurement}</TableCell>
                  <TableCell>{row.numberOfItems}</TableCell>
                  <TableCell>{row.rate}</TableCell>
                  <TableCell>{row.numberOfItems * row.rate}</TableCell>
                  <TableCell>
                    <TextField
                      value={row.progressPercentage.toString()}
                      variant="outlined"
                      size="small"
                      fullWidth
                      disabled
                    />
                  </TableCell>
                  <TableCell>{row.lastUpdatedBy}</TableCell>
                  <TableCell>{row.updatedAt}</TableCell>
                  <TableCell>{row.bankComments}</TableCell>
                  <TableCell>
                    <textarea
                      value={row.vendorComments}
                    // variant="outlined"
                    // size="small"
                    // fullWidth
                    // multiline
                    // rows={2}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
