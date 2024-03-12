
import { Link, NavLink } from "react-router-dom";
// --------------------------------------------
import { useContext } from "react";
import ThemeContext from "../comp/darkMode";
// --------------------------------------------
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/Confog";
import { signOut } from "firebase/auth";
// --------------------------------------------

const Header = () => {
  const { mode, ChangMode } = useContext(ThemeContext);
  // --------------------------------------------
  const [user] = useAuthState(auth);
  // --------------------------------------------

  // -------- Sign-Out ----------
  const handelSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log("An error happened.");
      });
  };

  return (
    <div>
      <header className="hide-when-mobile">
        {/* logo */}
        <Link to="/">
          <h1>c4a.dev</h1>
        </Link>

        {/* Mode */}
        {/* <i className="fa-regular fa-snowflake"></i> */}
        <i
          onClick={() => ChangMode(mode === "Light" ? "Dark" : "Light")}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => ChangMode(mode === "Light" ? "Dark" : "Light")}
          className="fa-regular fa-sun"
        ></i>

        <ul className="flex">
          {/* SignUp */}
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signUp">
                SignUp
              </NavLink>
            </li>
          )}

          {/* SignIn */}
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signIn">
                SignIn
              </NavLink>
            </li>
          )}

          {/* Sign-Out */}
          {user && (
            <li onClick={handelSignOut} className="main-list ">
              <NavLink className="main-link" to="/signIn">
                <i className="fa-solid fa-right-from-bracket"></i>
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/">
                Home
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/About">
                About
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/Profile">
                Profile
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
