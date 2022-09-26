import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getUsersList,
  removeUser,
  setPage,
  setSize,
} from "../../redux/actions/users-actions";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Icon, IconButton } from "@mui/material";
import EditUserModal from "./EditUserModal";
import { useLocation, useNavigate } from "react-router-dom";
import AddUserModal from "./AddUserModal";
import SingleUserModal from "./SingleUserModal";
import api from "../../api";

function getAvatar(params) {
  return <Avatar alt={params.row.first_name} src={params.row.avatar} />;
}

function Users(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [id] = useState(location.pathname?.split("/")[2]);

  const [editRow, setEditRow] = useState(false);
  const [toEdit, setToEdit] = useState({});

  const [viewRow, setViewRow] = useState(false);
  const [toView, setToView] = useState({});

  const getUserAndView = async (id) => {
    try {
      console.log(id);
      const { data } = await api.getUser(id);
      if (data?.data) {
        console.log(data.data);
        setToView(data.data);
        setViewRow(!viewRow);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      getUserAndView(id);
    }
  }, [id]);

  useEffect(() => {
    if (props.loading) {
      props.getUsersList();
    }
  }, [props.loading]);

  const navigateToUser = (id) => {
    navigate(`/users/${id}`);
  };
  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 0.5,
      sortable: false,
      renderCell: getAvatar,
    },
    { field: "id", headerName: "ID", flex: 0.5, sortable: true },
    { field: "first_name", headerName: "First name", flex: 0.7 },
    { field: "last_name", headerName: "Last name", flex: 0.7 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "action",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const handleDelete = (e) => {
          e.stopPropagation();
          props.removeUser(params.row.id);
        };

        const handleEdit = (e) => {
          e.stopPropagation();
          setToEdit(params);
          setEditRow(!editRow);
        };

        const handleView = (e) => {
          e.stopPropagation();
          setToView(params.row);
          setViewRow(!viewRow);
          navigateToUser(params.row.id);
        };

        return (
          <>
            <IconButton onClick={handleDelete} size="small">
              <Icon>delete</Icon>
            </IconButton>
            <IconButton onClick={handleEdit} size="small">
              <Icon>edit</Icon>
            </IconButton>
            <IconButton onClick={handleView} size="small">
              <Icon>visibility</Icon>
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <section>
      <SingleUserModal
        viewRow={viewRow}
        setViewRow={setViewRow}
        toView={toView}
      />
      <AddUserModal />
      <EditUserModal
        editRow={editRow}
        setEditRow={setEditRow}
        toEdit={toEdit}
      />

      <div style={{ height: 420, width: "100%" }}>
        <DataGrid
          sx={{ my: 1 }}
          rowHeight={60}
          rows={props.users}
          loading={props.loading}
          columns={columns}
          pageSize={props.size}
          paginationMode={"server"}
          rowCount={props.total}
          onPageChange={(newPage) => props.setPage(newPage)}
          onPageSizeChange={(newPageSize) => props.setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15]}
          checkboxSelection
        />
      </div>
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.list,
    size: state.users.size,
    total: state.users.total,
    loading: state.users.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsersList: () => dispatch(getUsersList()),
    setPage: (page) => dispatch(setPage(page)),
    setPageSize: (size) => dispatch(setSize(size)),
    removeUser: (uid) => dispatch(removeUser(uid)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
