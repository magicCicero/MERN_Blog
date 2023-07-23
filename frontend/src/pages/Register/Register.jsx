import "./Register.css";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "/api/register",
      data: {
        email,
        password,
      },
    };
    // make the API call
    axios(configuration)
      .then((result) => {
        setRegister(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Register</h2>
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
        {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Registered</p>
        )}
      </form>
    </>
  );
};

export default Register;
