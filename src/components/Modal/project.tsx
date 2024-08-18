import { Grid } from "@mui/material";
import { ModalChildProps } from "../../utils/commonTypes";

export const ProjectModal = ({ data }: ModalChildProps) => (
  <Grid container direction="column" rowGap={1}>
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
        <p>Customer:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.customer.name || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Nature of work:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.natureOfWork || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Year:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.year || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Verification:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.isVerified ? "Verified" : "Un-Verified"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Internal Area:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.internalArea || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>External Area:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.externalArea || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Future Area:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.futureArea || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Elevation Area:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.elevationArea || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Construction Area:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.constructionArea || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Floor:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.floor || "-"}</p>
      </Grid>
    </Grid>
    <Grid container direction="row">
      <Grid item md={4}>
        <p>Department:</p>
      </Grid>
      <Grid item md={6}>
        <p>{data?.department || "-"}</p>
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
  </Grid>
);
