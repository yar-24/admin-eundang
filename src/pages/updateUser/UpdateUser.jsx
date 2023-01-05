import "./updateUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUser,
  updateByAdmin,
} from "../../redux/features/auth/authSlice";
import Loading from "../../components/Loading";

const UpdateUser = ({ inputs, title }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [user, setUser] = useState("");

  const [nameUpdate, setNameUpdate] = useState("");
  const [picProfileUpdate, setPicProfileUpdate] = useState("");
  const [emailUpdate, setEmailUpdate] = useState("");
  const [passwordUpdate, setPasswordUpdate] = useState("");
  const [password2Update, setPassword2Update] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const {isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser(params.id))
      .then((res) => {
        const data = res.payload;
        setUser(data);
        setIsUpdate(true);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [dispatch, params.id]);

  useEffect(() => {
    if (params.id) {
      setNameUpdate(user.name);
      setEmailUpdate(user.email);
      setImagePreview(user.picProfile);
    }
    if (isLoading) {
      <Loading type={"balls"} color={"#fffff"} />;
    }
  
  }, [user, isLoading, params.id]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (isUpdate) {
      const form = new FormData();
      form.append("name", nameUpdate);
      form.append("email", emailUpdate);
      form.append("password", passwordUpdate);
      form.append("password2", password2Update);
      form.append("picProfile", picProfileUpdate);

      dispatch(updateByAdmin(form))
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
      navigate("/");
    }
  };

  const handlePicProfile = (e) => {
    const file = e.target.files[0];
    setPicProfileUpdate(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {imagePreview ? (
              <img src={imagePreview} alt="profilePreview" />
            ) : (
              <img
                src={"https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                alt="profile"
              />
            )}
          </div>
          <div className="right">
            <form onSubmit={onSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => handlePicProfile(e)}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput" key={user._id}>
                <label>Username</label>
                <input
                  onChange={(e) => setNameUpdate(e.target.value)}
                  type="text"
                  placeholder="username"
                  name={nameUpdate}
                  value={nameUpdate}
                />
                <label>Email</label>
                <input
                  onChange={(e) => setEmailUpdate(e.target.value)}
                  type="mail"
                  placeholder="email"
                  name={emailUpdate}
                  value={emailUpdate}
                />
                <label>Password</label>
                <input
                  onChange={(e) => setPasswordUpdate(e.target.value)}
                  type="password"
                  placeholder="password"
                  name={passwordUpdate}
                  value={passwordUpdate}
                />
                <label>Password2</label>
                <input
                  onChange={(e) => setPassword2Update(e.target.value)}
                  type="text"
                  placeholder="username"
                  name={password2Update}
                  value={password2Update}
                />
              </div>
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
