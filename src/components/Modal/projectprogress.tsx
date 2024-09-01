import { Button, Grid, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { ModalType } from "../../utils/commonTypes";
import { formatDateTime, formatDate } from "../../utils/util";
import { Table } from "../Table";

interface ProjectProgressModalProps {
  data: {
    id: string;
    branch: string;
    city: string;
    budget: string;
    completionDate: string;
    customer: { name: string; province: string };
    measurements: any[];
  };
  type: ModalType;
}

export const ProjectProgressModal: FC<ProjectProgressModalProps> = ({
  data,
}) => {
  const [measurements, setMeasurements] = useState(
    data?.measurements.reduce(
      (obj, cur) => ({
        ...obj,
        [cur.id]: {
          progressPercentage: cur.progressPercentage,
          customerComments: cur.customerComments,
          isChanged: false,
        },
      }),
      {}
    )
  );

  const projectDetails = [
    { label: "Project #", value: data?.id },
    { label: "Branch", value: `${data?.branch} - ${data?.city}` },
    {
      label: "Customer",
      value: `${data?.customer?.name} (${data?.customer?.province})`,
    },
    { label: "Budget", value: data?.budget },
    { label: "OverAll Progress %", value: "TO BE CALCULATED" },
    {
      label: "Work Completion Date",
      value: formatDate(data?.completionDate),
    },
  ];

  const handleOnChange = ({ currentTarget: { id, name, value } }: any) => {
    setMeasurements({
      ...measurements,
      [id]: {
        ...measurements[id],
        [name]: value,
        isChanged: true,
      },
    });
  };

  const addAction = (rows: any) =>
    rows.map((row: any) => ({
      ...row,
      work: row.item.work,
      item: `${row.item.id} - ${row.item.name}`,
      uom: row.item.unitOfMeasurement,
      amount: row.numberOfItems * row.rate,
      updatedAt: formatDateTime(row.updatedAt),
      progressPercentage: (
        <TextField
          id={row.id}
          name="progressPercentage"
          value={measurements[row.id].progressPercentage}
          onChange={handleOnChange}
          variant="outlined"
          size="small"
          fullWidth
          type="number"
        />
      ),
      customerComments: (
        <textarea
          id={row.id}
          name="customerComments"
          value={measurements[row.id].customerComments}
          onChange={handleOnChange}
        />
      ),
    }));

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container spacing={2}>
          {projectDetails.map(({ label, value }) => (
            <Grid item xs={6} md={3}>
              <Typography variant="body1" fontWeight="bold">
                {label}
              </Typography>
              <TextField
                id="projectNumber"
                variant="outlined"
                fullWidth
                value={value}
                disabled
                size="small"
              />
            </Grid>
          ))}
          <Grid item xs={12} md={6} container justifyContent="flex-end">
            <Button variant="contained" color="primary" sx={{ height: 40 }}>
              Save Completion Date
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Table
          headers={[
            { key: "work", value: "Work" },
            { key: "item", value: "Item" },
            { key: "uom", value: "UOM" },
            { key: "numberOfItems", value: "Qty" },
            { key: "rate", value: "Price" },
            { key: "amount", value: "Amount" },
            { key: "progressPercentage", value: "Progress %" },
            { key: "updatedAt", value: "Last Updated Date" },
            { key: "bankComments", value: "Bank Comments" },
            { key: "customerComments", value: "Customer Comments" },
          ]}
          rows={addAction(data?.measurements)}
          shouldPaginate={false}
        />
      </Grid>
    </Grid>
  );
};
