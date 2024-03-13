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
          <h1>Hussein Elged</h1>
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
                {t("home")}
              </NavLink>
            </li>
          )}

          <li className="main-list lang">
            <p>{t("language")}</p>
            <ul className="lang-down">
              <li
                dir="rtl"
                onClick={() => {
                  i18n.changeLanguage("ar");
                }}
              >
                عربي {i18n.language === "ar" && <i class="fa-solid fa-check"></i>}{" "}
              </li>

              <li
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
              >
                English {i18n.language === "en" && <i class="fa-solid fa-check "></i>}{" "}
              </li>
              <li
                onClick={() => {
                  i18n.changeLanguage("fr");
                }}
              >
                French {i18n.language === "fr" && <i class="fa-solid fa-check"></i>}{" "}
              </li>
            </ul>
          </li>

          {/* SignUp */}
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signUp">
                {t("SignUp")}
              </NavLink>
            </li>
          )}

          {/* SignIn */}
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signIn">
                {t("SignIn")}
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/About">
                {t("About")}
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/Profile">
                {t("Profile")}
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
