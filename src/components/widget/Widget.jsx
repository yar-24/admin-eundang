import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../config";
import { getUsers } from "../../redux/features/auth/authSlice";
import { getPays } from "../../redux/features/order/paySlice";

const Widget = ({ type }) => {
  let data;

  const [orders, setOrders] = useState([]);
  const [isAmount, setIsAmount] = useState([])
  const [users, setUsers] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getUsers())
    .then((res) => {
      const bykUsers = res.payload.length
      setUsers(bykUsers)
    })
    .catch((err) => {
      console.log(err)
    } )

    dispatch(getPays())
      .then((res) => {
       const harga = res.payload.map((item) => (
          item.paketHarga
        ))
        setIsAmount(harga)
        const data = res.payload;
        setOrders(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  var total = 0
  var i = 0
//   const desimal = isAmount.join();


var b = isAmount.map(i=>Number(i));

  for(i = 0; i <orders.length; i++){
    total += b[i];
 }


  //temporary
  const amount = total;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isUsers: true,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isOrder: true,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        {data.isMoney &&
        <span className="counter">
          {"IDR"} {amount}
        </span>
        }
        {data.isOrder &&
        <span className="counter">
          {orders.length}
        </span>
        }
        {data.isUsers &&
        <span className="counter">
          {users}
        </span>
        }
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
