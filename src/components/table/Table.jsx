import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config";
import { Link, useParams } from "react-router-dom";
import { getPays } from "../../redux/features/order/paySlice";

const List = () => {
  const [orders, setOrders] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPays())
      .then((res) => {
        const data = res.payload;
        setOrders(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Bank Payment</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">{row.paketUndangan}</div>
              </TableCell>
              <TableCell className="tableCell">{row.nama}</TableCell>
              <TableCell className="tableCell">
                {row.response_midtrans.transaction_time}
              </TableCell>
              <TableCell className="tableCell">
                {row.response_midtrans.gross_amount}
              </TableCell>
              <TableCell className="tableCell" style={{textTransform: "uppercase"}}>
                {row.response_midtrans.va_numbers ? row.response_midtrans.va_numbers[0].bank : "PERMATA"}
              </TableCell>
              <button className="button">
                <Link to={`/status-order/${row.id} `} style={{textDecoration: "none"}}>Lihat Status</Link>
              </button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
