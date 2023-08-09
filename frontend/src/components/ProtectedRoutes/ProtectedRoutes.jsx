import { Route, Navigate, Routes } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import AuthComponent from "../AuthComponent/AuthComponents";

// receives component and any other props represented by ...rest
export default function ProtectedRoutes() {
  console.log("hi");
  return (
    // this route takes other routes assigned to it from the App.js and return the same route if condition is met
    <Routes>
      <Route
        render={(AuthComponent) => {
          // get cookie from browser if logged in
          const token = cookies.get("TOKEN");

          // returns route if there is a valid token set in the cookie
          if (token) {
            return <AuthComponent />;
          } else {
            // returns the user to the landing page if there is no valid token set
            return (
              <Navigate
                to={{
                  pathname: "/",
                  state: {
                    // sets the location a user was about to access before being redirected to login
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
    </Routes>
  );
}
