import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { axiosInstance } from "../../config";
import { getPay } from "../../redux/features/order/paySlice";
import "./orderId.scss";

const OrderId = () => {
  const [status, setStatus] = useState("");

  const params = useParams();
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getPay(params.orderId))
      .then((res) => {
        const data = res.payload.data;
        setStatus(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information Status Order</h1>
            <div className="item">
              <div className="details">
                {status.transaction_status === "expire" && (
                  <div className="statusExpire">
                    <h1 className="itemTitle">{status.transaction_status}</h1>
                  </div>
                )}
                {status.transaction_status === "settlement" && (
                  <div className="statusSettlement">
                    <h1 className="itemTitle">{status.transaction_status}</h1>
                  </div>
                )}
                {status.transaction_status === "pending" && (
                  <div className="statusPending">
                    <h1 className="itemTitle">{status.transaction_status}</h1>
                  </div>
                )}
                <div className="detailItem">
                  <span className="itemKey">Order ID:</span>
                  <span className="itemValue">{status.order_id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Fraud Status:</span>
                  <span className="itemValue">{status.fraud_status}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Amout:</span>
                  <span className="itemValue">
                    {status.currency} {status.gross_amount}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status Message:</span>
                  <span className="itemValue">{status.status_message}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Transaction ID:</span>
                  <span className="itemValue">{status.transaction_id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Transaction Time:</span>
                  <span className="itemValue">{status.transaction_time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderId;
