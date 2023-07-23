import "./Login.css";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "/api/login",
      data: {
        email,
        password,
      },
    };
    // make the API call
    axios(configuration)
      .then((result) => {
        setLogin(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Login</h2>
        <p>Email adress</p>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => handleSubmit(e)} type="submit">
          Submit
        </button>
        {/* display success message */}
        {login ? (
          <p className="text-success">You Are loggined Successfully</p>
        ) : (
          <p className="text-danger">You Are Not loginned</p>
        )}
      </form>
    </>
  );
};

export default Login;
