import { Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ModalChildProps } from "../../utils/commonTypes";

export const MeasurementEditModal = ({ data, type, dataRef }: ModalChildProps) => {
  const [location, setLocation] = useState(data?.location || "");
  const [numberOfItems, setNumberOfItems] = useState(data?.numberOfItems || "");
  const [length, setLength] = useState(data?.length || "");
  const [height, setHeight] = useState(data?.height || "");
  const [breadth, setBreadth] = useState(data?.breadth || "");

  const handleChange = (key: string, value: string, setState: (val: any) => void) => {
    dataRef.current[key] = value;
    setState(value);
  };

  useEffect(() => {
    if (data) {
      dataRef.current = {
        location: data.location,
        numberOfItems: data.numberOfItems,
        length: data.length,
        height: data.height,
        breadth: data.breadth,
      };
    }
  }, []);
  console.log(data);
  return (
    <Grid container direction="column" rowGap={2}>
      <Grid container direction="row">
        <Grid item md={4}><p>Location:</p></Grid>
        <Grid item md={8}>
          <TextField
            id="location"
            variant="outlined"
            fullWidth
            onChange={(e) => handleChange("location", e.target.value, setLocation)}
            value={location}
            required
            disabled={type === "READ"}
          />
        </Grid>
      </Grid>

      <Grid container direction="row">
        <Grid item md={4}><p>Number of Items (NOS):</p></Grid>
        <Grid item md={8}>
          <TextField
            id="numberOfItems"
            variant="outlined"
            fullWidth
            type="number"
            onChange={(e) => handleChange("numberOfItems", e.target.value, setNumberOfItems)}
            value={numberOfItems}
            required
          />
        </Grid>
      </Grid>

      <Grid container direction="row">
        <Grid item md={4}><p>Length:</p></Grid>
        <Grid item md={8}>
          <TextField
            id="length"
            variant="outlined"
            fullWidth
            type="number"
            onChange={(e) => handleChange("length", e.target.value, setLength)}
            value={length}
            required
            InputProps={{
              inputProps: { min: 1 }
            }}
            disabled={type === "READ" ||
              !(
                data?.item?.unitOfMeasurement === "rft" ||
                data?.item?.unitOfMeasurement === "sft"
              )
            }
          />
        </Grid>
      </Grid>

      <Grid container direction="row">
        <Grid item md={4}><p>Height:</p></Grid>
        <Grid item md={8}>
          <TextField
            id="height"
            variant="outlined"
            fullWidth
            type="number"
            onChange={(e) => handleChange("height", e.target.value, setHeight)}
            value={height}
            InputProps={{
              inputProps: { min: 1 }
            }}
            disabled
          />
        </Grid>
      </Grid>

      <Grid container direction="row">
        <Grid item md={4}><p>Breadth:</p></Grid>
        <Grid item md={8}>
          <TextField
            id="breadth"
            variant="outlined"
            fullWidth
            type="number"
            onChange={(e) => handleChange("breadth", e.target.value, setBreadth)}
            value={breadth}
            required
            InputProps={{
              inputProps: { min: 1 }
            }}
            disabled={type === "READ" ||
              !(data?.item?.unitOfMeasurement === "sft")
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
