import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, reset } from "../../redux/features/auth/authSlice";
import { getGoal } from "../../redux/features/goals/goalSlice";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

const Single = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [user, setUser] = useState("");

  const { isLoading} = useSelector(
    (state) => state.auth
  );

  const { goals } = useSelector((state) => state.goals);

  useEffect(() => {
    dispatch(getUser(params.userId))
      .then((res) => {
        const data = res.payload;
        setUser(data);
      })
      .catch((err) => {
        console.log("err");
      });

      dispatch(reset())
      
  }, [dispatch, params.userId]);
  

  useEffect(() => {
    dispatch(getGoal(user.token))
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => {
      console.log("err", err);
    });
    
  }, [dispatch, user])

  if (isLoading) {
    return (
      <Loading type={"balls"} color={"#FFFFFF"} height={"20%"} width={"20%"} />
    );
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="containerBtn">
              <Link to={`/users/edit/${params.userId}`} className="editButton">
                <div>Edit</div>
              </Link>
              {goals[0] ? (
                <a
                  href={`https://e-undang.herokuapp.com/blue-flower/:namaTamu/${goals[0]._id}`}
                  className="editButton"
                >
                  <div>Lihat Undangan</div>
                </a>
              ) : null}
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={user.picProfile} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{user.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
