import { useEffect, useState } from "react";
import { Table } from "../../components/Table";
import { Button, Checkbox, Divider, Grid, Paper } from "@mui/material";
import { ALL_ROUTES } from "../../utils/allRoutes";
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
  const [activeData, setActiveData] = useState("allModules");
  const [fetchedPermissions, setFetchedPermissions] = useState<any[]>([]);

  const routesData: any[] = [
    {
      name: "allModules",
      displayText: "All Modules",
      permissions: [
        ALL_ROUTES.customers,
        ALL_ROUTES.item,
        ALL_ROUTES.projectProgress,
        ALL_ROUTES.project,
        ALL_ROUTES.security,
      ],
    },
    { ...ALL_ROUTES.customers, permissions: [ALL_ROUTES.customers] },
    { ...ALL_ROUTES.item, permissions: [ALL_ROUTES.item, ALL_ROUTES.items] },
    {
      ...ALL_ROUTES.projectProgress,
      permissions: [
        ALL_ROUTES.projectProgress,
        ALL_ROUTES.projectProgressView,
        ALL_ROUTES.projectProgressDetail,
      ],
    },
    {
      ...ALL_ROUTES.project,
      permissions: [
        ALL_ROUTES.project,
        ALL_ROUTES.projects,
        ALL_ROUTES.measurements,
      ],
    },
    {
      ...ALL_ROUTES.security,
      permissions: [ALL_ROUTES.security, ALL_ROUTES.users, ALL_ROUTES.roles],
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
    const permissions = fetchedPermissions.join(",");
    await postData("role", { ...roleData, permissions }, navigate);
    navigate(-1);
  };

  const initializePermissions = () => {
    const rows: any[] = routesData
      .find(({ name }) => name === activeData)
      ?.permissions.map((permission: any) => ({
        name: `${permission.displayText}${
          permission.route === null ? " (All Options)" : ""
        }`,
        allow: (
          <Checkbox
            defaultChecked={fetchedPermissions.includes(permission.name)}
            checked={fetchedPermissions.includes(permission.name)}
            onChange={({ target: { checked } }) => {
              if (checked) {
                setFetchedPermissions([...fetchedPermissions, permission.name]);
              } else {
                setFetchedPermissions(
                  fetchedPermissions.filter(
                    (fetchedPermission) => fetchedPermission !== permission.name
                  )
                );
              }
            }}
          />
        ),
      }));
    setData({ rows, total: rows.length });
  };

  useEffect(() => {
    setFetchedPermissions(permissions.split(","));
  }, []);

  useEffect(() => {
    initializePermissions();
  }, [activeData, fetchedPermissions]);

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
            shouldPaginate={false}
          />
        </Grid>
      </Grid>
    </div>
  );
};
