import { Grid } from "@mui/material";
import { ModalChildProps } from "../../utils/commonTypes";

export const InvoiceModal = ({ data }: ModalChildProps) => (
  <Grid container direction="column" rowGap={1}>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Project ID:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.projectId || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Description:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.description || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Branch:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.branch || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>City:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.city || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Budget Amount:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.budgetAmount || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Paid:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.paid || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Requested Amount:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.requestedAmount || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Balance:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.balance || "-"}</p>
      </Grid>
    </Grid>
  </Grid>
);
