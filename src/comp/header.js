import { Link, NavLink } from "react-router-dom";
// --------------------------------------------
import { useContext } from "react";
import ThemeContext from "../comp/darkMode";
// --------------------------------------------
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/Confog";
import { signOut } from "firebase/auth";
// --------------------------------------------
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();

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
          <h1 className="title">Task Management</h1>
        </Link>

        <ul className="flex">
          {/* home */}
          {user && (
            <li className="main-list home">
              <NavLink className="main-link" to="/">
                {/* {t("home")} */}
                <i class="fa-solid fa-house"></i>
              </NavLink>
              <p className="toast"> {t("home")} </p>
            </li>
          )}

          {/* About */}
          {user && (
            <li className="main-list about">
              <NavLink className="main-link" to="/About">
                {/* {t("About")} */}
                <i class="fa-solid fa-address-card"></i>
              </NavLink>
              <p className="toast"> {t("About")} </p>
            </li>
          )}

          {/* Profile */}
          {user && (
            <li className="main-list Profile">
              <NavLink className="main-link" to="/Profile">
                {/* {t("Profile")} */}
                <i class="fa-solid fa-gears"></i>
              </NavLink>
              <p className="toast"> {t("Profile")} </p>
            </li>
          )}

          {/* language */}
          <li className="main-list lang ">
            <p>
              {/* {t("language")} */}
              <i class="fa-solid fa-globe"></i>
            </p>
            <ul className="lang-down">
              <li
                dir="rtl"
                onClick={() => {
                  i18n.changeLanguage("ar");
                }}
              >
                {t("عربي")}
                {i18n.language === "ar" && (
                  <i class="fa-regular fa-circle-check"></i>
                )}{" "}
              </li>

              <li
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
              >
                {t("English")}
                {i18n.language === "en" && (
                  <i class="fa-regular fa-circle-check"></i>
                )}{" "}
              </li>
              <li
                onClick={() => {
                  i18n.changeLanguage("fr");
                }}
              >
                {t("French")}
                {i18n.language === "fr" && (
                  <i className="fa-solid fa-check"></i>
                )}{" "}
              </li>
            </ul>
          </li>

          {/* Mode */}
          <li className="main-list mode">
            <i
              onClick={() => ChangMode(mode === "Light" ? "Dark" : "Light")}
              className="fa-solid fa-moon"
            ></i>
            <i
              onClick={() => ChangMode(mode === "Light" ? "Dark" : "Light")}
              className="fa-regular fa-sun"
            ></i>
            <p className="toast"> Mode </p>
          </li>

          {/* SignIn */}
          {!user && (
            <li className="main-list SignIn">
              <NavLink to="/signIn">
                <i class="fa-solid fa-right-from-bracket"></i>
              </NavLink>
              <p className="toast"> SignIn </p>
            </li>
          )}

          {/* SignUp */}
          {!user && (
            <li className="main-list SignUp">
              <NavLink to="/signUp">
                {/* {t("SignUp")} */}
                <i class="fa-solid fa-user-plus"></i>
              </NavLink>
              <p className="toast"> SignUp </p>
            </li>
          )}

          {/* Sign-Out */}
          {user && (
            <li onClick={handelSignOut} className="main-list signOut ">
              <NavLink to="/signIn">
                <i className="fa-solid fa-right-from-bracket"></i>
              </NavLink>
              <p className="toast"> {t("signOut")} </p>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
