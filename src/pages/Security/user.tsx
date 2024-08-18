import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteData, fetchData, postData } from "../../api";
import { Table } from "../../components/Table";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { Visibility, Delete } from "@mui/icons-material";
import { ModalType } from "../../utils/commonTypes";
import { CustomModal } from "../../components/Modal";

export const User = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ rows: [], total: 0 });
  const [roleData, setRoleData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("READ");
  const [searchValue, setSearchValue] = useState("");
  const [modalData, setModalData] = useState();
  const { rows, total } = data;

  const fetchUserData = async (queryStr: string) => {
    const data: any = await fetchData("user", queryStr, navigate);
    const roleDataRes: any = await fetchData("role", "", navigate);

    if (!roleDataRes) {
      return;
    }
    setRoleData(roleDataRes.rows);
    if (data) {
      setData(data);
    }
  };

  const toggleModal = (type?: ModalType, data?: any) => {
    setModalData(data);
    if (type) {
      setModalType(type);
    }
    setOpenModal(!openModal);
  };

  const saveUser = async (data: any) => {
    try {
      await postData("auth/signup", data, navigate);
      await fetchUserData("");
    } catch (e) {
      console.error("error==>", e);
    } finally {
      setOpenModal(false);
    }
  };

  const deleteUser = async (id: string | number) => {
    try {
      await deleteData("user", id, navigate);
      await fetchUserData("");
    } catch (e) {
      console.error("error==>", e);
    } finally {
      setOpenModal(false);
    }
  };

  const addAction = (rows: any) =>
    rows.map((row: any) => ({
      ...row,
      role: row.role?.name,
      action: (
        // TODO: add modal logic here to view detail
        <>
          <IconButton color="inherit" onClick={() => toggleModal("READ", row)}>
            <Visibility />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => toggleModal("DELETE", row)}
          >
            <Delete />
          </IconButton>
        </>
      ),
    }));

  return (
    <div className="container">
      <CustomModal
        type={modalType}
        open={openModal}
        onClose={toggleModal}
        onSave={saveUser}
        onDelete={deleteUser}
        template="USER"
        data={modalData}
        roleData={roleData}
      />
      <h2>Users</h2>
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
            onClick={() => fetchUserData(`?search=${searchValue}`)}
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
            Add User
          </Button>
        </Grid>
      </Grid>
      <Table
        headers={[
          { key: "email", value: "Email" },
          { key: "username", value: "User ID" },
          { key: "role", value: "Role" },
          { key: "contactNumber", value: "Contact" },
          { key: "action", value: "Action" },
        ]}
        rows={addAction(rows)}
        total={total}
        onPagination={(queryStr: string) => fetchUserData(queryStr)}
      />
    </div>
  );
};
