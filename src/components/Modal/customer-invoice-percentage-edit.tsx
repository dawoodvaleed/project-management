import { Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ModalChildProps } from "../../utils/commonTypes";

export const CustomerInvoicePercentageEditModal = ({ data, type, dataRef }: ModalChildProps) => {
  const [advancePercentage, setAdvancePercentage] = useState(data?.advancePercentage);
  const [firstRunningPercentage, setFirstRunningPercentage] = useState(data?.firstRunningPercentage);
  const [secondRunningPercentage, setSecondRunningPercentage] = useState(data?.secondRunningPercentage);

  const handleChange = (key: string, value: string, setState: (args: any) => void) => {
    dataRef.current[key] = value
    setState(value);
  }

  useEffect(() => {
    if (data) {
      dataRef.current = {
        advancePercentage: data.advancePercentage,
        firstRunningPercentage: data.firstRunningPercentage,
        secondRunningPercentage: data.secondRunningPercentage,
      };
    }
  }, []);

  return (
    <Grid container direction="column" rowGap={2}>
      <Grid container direction="row">
        <Grid item md={12}>
          <TextField
            id="advancePercentage"
            label="Advance Percentage"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChange('advancePercentage', e.target.value, setAdvancePercentage)}
            value={advancePercentage}
            type="number"
            required
            disabled={type === "READ"}
          />
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item md={12}>
          <TextField
            id="firstRunningPercentage"
            label="First Running Percentage"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChange('firstRunningPercentage', e.target.value, setFirstRunningPercentage)}
            value={firstRunningPercentage}
            type="number"
            required
            disabled={type === "READ"}
          />
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item md={12}>
          <TextField
            id="secondRunningPercentage"
            label="Second Running Percentage"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChange('secondRunningPercentage', e.target.value, setSecondRunningPercentage)}
            value={secondRunningPercentage}
            type="number"
            required
            disabled={type === "READ"}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
