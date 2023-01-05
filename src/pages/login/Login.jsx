import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../redux/features/auth/authSlice";
import "./login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <div className="login">
      <form className="formLogin" onSubmit={onSubmit}>
        <input
          type="text"
          className="inputLogin"
          placeholder="email"
          id="email"
            name="email"
          onChange={onChange}
          value={email}
        />
        <input
          type="password"
          className="inputLogin"
          placeholder="password"
          id="password"
            name="password"
          onChange={onChange}
          value={password}
        />
        <button className="btnlogin">login</button>
      </form>
    </div>
  );
};

export default Login;
