import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteUser,
  getUser,
  getUsers,
  reset,
} from "../../redux/features/auth/authSlice";
import Loading from "../Loading";

const Datatable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const { isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getUsers())
      .then((res) => {
        const datas = res.payload;
        setData(datas);
      })
      .catch((err) => {
        console.log("err", err);
      });

    if (isLoading) {
      return (
        <Loading
          type={"balls"}
          color={"#FFFFFF"}
          height={"20%"}
          width={"20%"}
        />
      );
    }
    dispatch(reset());
    
  }, [dispatch, isLoading]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    dispatch(deleteUser(id))
  };

  const handleView = (id) => {
    setData(data.filter((item) => item.id !== id));
    dispatch(getUser(id));
    navigate(`/users/${id}`);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleView(params.row._id)}
            >
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
