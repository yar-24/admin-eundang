import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  register,
} from "../../redux/features/auth/authSlice";
import Loading from "../../components/Loading";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSuccess, isLoading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
      if (password !== password2 || password2 !== password) {
        alert("passwor tidak sama");
      } else {
        const userData = {
          name,
          email,
          password,
        };
  
        dispatch(register(userData));
        if (isSuccess) {
          navigate("/users");
        }
    }

    if (isLoading) {
      return (
        <Loading type={"balls"} color={"#FFFFFF"} height={"20%"} width={"20%"} />
      );
    }

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
            <img
              src={file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
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
                    onChange={(e) =>  setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
                {inputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      name={input.name}
                      value={input.value}
                    />
                  </div>
                ))}
                <button>Send</button>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
