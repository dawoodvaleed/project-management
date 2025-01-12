import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/Table";
import { fetchData, postData, updateDetails } from "../../api";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { CustomModal } from "../../components/Modal";
import { ModalType } from "../../utils/commonTypes";

export const Role = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("READ");
  const [modalData, setModalData] = useState<any>();
  const [searchValue, setSearchValue] = useState("");
  const { rows, total } = data;

  const addAction = (rows: any) =>
    rows.map((row: any) => ({
      ...row,
      status: row.status ? "Active" : "Deactivated",
      edit: (
        <IconButton color="inherit" onClick={() => toggleModal("UPDATE", row)}>
          <Edit />
        </IconButton>
      ),
      permission: (
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            navigate(`permissions/${row.id}`, { state: row });
          }}
        >
          Permission
        </Button>
      ),
    }));

  const fetchRoleData = async (queryStr: string) => {
    const data = await fetchData("role", queryStr, navigate);
    if (data) {
      setData(data);
    }
  };

  const updateRole = async (data: any) => {
    try {
      await updateDetails(`role/${modalData?.id}`, { ...data, status: data.status === 'active' ? true : false }, navigate);
      await fetchRoleData("");
    } catch (e) {
      console.error("error==>", e);
    } finally {
      setOpenModal(false);
    }
  }

  const saveRole = async (data: any) => {
    try {
      await postData("role", data, navigate);
      await fetchRoleData("");
    } catch (e) {
      console.error("error==>", e);
    } finally {
      setOpenModal(false);
    }
  };

  const toggleModal = (type?: ModalType, data?: any) => {
    setModalData(data);
    if (type) {
      setModalType(type);
    }
    setOpenModal(!openModal);
  };

  return (
    <div className="container">
      <CustomModal
        type={modalType}
        open={openModal}
        onClose={toggleModal}
        onUpdate={updateRole}
        onSave={saveRole}
        template="ROLE"
        data={modalData}
      />
      <h2>Roles</h2>
      <Grid container component="main" sx={{ marginBottom: 4 }}>
        <Grid
          item
          xs={10}
          sm={10}
          md={10}
          direction="row"
          display={"flex"}
          gap={4}
          alignItems={"center"}
        >
          <TextField
            id="search"
            label="Search"
            type="text"
            variant="outlined"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            required
          />
          <Button
            variant="contained"
            onClick={() => fetchRoleData(`?search=${searchValue}`)}
          >
            Search
          </Button>
          <Button>clear</Button>
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
          <Button
            onClick={() => toggleModal("WRITE")}
            type="submit"
            variant="contained"
          >
            Add Role
          </Button>
        </Grid>
      </Grid>
      <Table
        headers={[
          { key: "name", value: "Name" },
          { key: "description", value: "Description" },
          { key: "status", value: "Status" },
          { key: "edit", value: "Edit" },
          { key: "permission", value: "Permission" },
        ]}
        rows={addAction(rows)}
        total={total}
        onPagination={(queryStr: string) => fetchRoleData(queryStr)}
      />
    </div>
  );
};
