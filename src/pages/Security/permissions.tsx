import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Table } from "../../components/Table";
// import { fetchData } from "../../api";
import { Button, Checkbox, Divider, Grid, Paper } from "@mui/material";
import { ALL_ROUTES } from "../../utils/allRoutes";
// import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { postData } from "../../api";

export const Permissions = () => {
  const navigate = useNavigate();
  const { state: roleData } = useLocation();
  const { permissions, name: title } = roleData;
  const [data, setData] = useState<{ rows: any[]; total: number }>({
    rows: [],
    total: 0,
  });
  const [activeData, setActiveData] = useState("All-Module");
  const [permissionsArr, setPermissionsArr] = useState<any[]>([]);
  // const [permissions, setPermissions] = useState<(keyof typeof ALL_ROUTES)[]>([]);

  const routesData: any[] = [
    {
      displayText: "All Modules",
      name: "All-Module",
      permissions: [
        ALL_ROUTES.customers,
        ALL_ROUTES.item,
        ALL_ROUTES.project,
        ALL_ROUTES.security,
      ],
    },
    { ...ALL_ROUTES.customers, permissions: [ALL_ROUTES.customers] },
    { ...ALL_ROUTES.item, permissions: [ALL_ROUTES.items] },
    {
      ...ALL_ROUTES.project,
      permissions: [ALL_ROUTES.projects, ALL_ROUTES.measurements],
    },
    {
      ...ALL_ROUTES.security,
      permissions: [ALL_ROUTES.users, ALL_ROUTES.roles],
    },
  ];

  // TODO: all type of roles should be fetched from BE
  // const addAction = (rows: any) => {
  //   console.log('per', permissions)
  //   return;
  // };

  // const fetchPermisssionsData = async (queryStr: string) => {
  //   const data = await fetchData("role", queryStr, addAction, navigate);
  //   if (data) {
  //     setData(data);
  //   }
  // };

  const handleSave = async () => {
    const permissions = permissionsArr.join(",");
    console.log("permiss", permissions);
    console.log("roleData", roleData);
    await postData("role", { ...roleData, permissions }, navigate);
    navigate(-1);
  };

  const initializePermissions = () => {
    const rows: any[] = routesData
      .find((d) => d.name === activeData)
      ?.permissions.map((row: any) => {
        return {
          name: row.displayText,
          allow: (
            //TODO: need to add api to update permission on change
            <Checkbox
              defaultChecked={permissionsArr.includes(row.name)}
              // value={true}
              checked={permissionsArr.includes(row.name)}
              onChange={(e) => {
                if (e.target.checked) {
                  setPermissionsArr((d) => [...d, row.name]);
                } else {
                  setPermissionsArr((d) => d.filter((v) => v !== row.name));
                }
              }}
            />
          ),
        };
      });
    setData({ rows, total: rows.length });
  };

  useEffect(() => {
    setPermissionsArr(permissions.split(","));
  }, []);

  useEffect(() => {
    initializePermissions();
  }, [activeData, permissionsArr]);

  return (
    <div className="container">
      <h2>Role Permissions</h2>
      <Divider />
      <Grid container spacing={1}>
        <Grid item md={10}>
          <h4>{title}</h4>
        </Grid>
        <Grid
          item
          md={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper>
            {routesData.map((d) => (
              <>
                <Button
                  fullWidth
                  sx={{ padding: 2, justifyContent: "flex-start" }}
                  onClick={() => setActiveData(d.name)}
                  variant={d.name !== activeData ? "text" : "contained"}
                >
                  {d.displayText}
                </Button>
                <br />
              </>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Table
            headers={[
              { key: "name", value: "Module Name" },
              { key: "allow", value: "Allow" },
            ]}
            rows={data.rows}
            total={data.total}
            // onPagination={(queryStr: string) => fetchPermisssionsData(queryStr)}
            shouldPaginate={false}
          />
        </Grid>
      </Grid>
    </div>
  );
};
