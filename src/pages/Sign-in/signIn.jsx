import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Lodinge from "../../comp/Lodinge";
import "./signin.css"
// -------------------------------------------------
import { auth } from "../../Firebase/Confog";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ErrorPage from "../Error/ErrorPage";
import Model from "../../comp/shaird/model";
import { useTranslation } from "react-i18next";
// -------------------------------------------------

const SignIn = () => {
  // --------------------------------------------------------------
  const navigate = useNavigate(); //  For routing
  const [user, loading, error] = useAuthState(auth); //  User Auth State
  const [email, setEmail] = useState(""); //  Email Input Field
  const [password, setPassword] = useState(""); //  Password Input Field
  const [Error, setError] = useState(""); //   Showing any type of errors if there is
  const [showSendEmail, setShowSendEmail] = useState(false); //   To show the model or not
  
  // ------------------ Level-3 ---------------------
  const { t } = useTranslation(); // Translation    
  const [resetPass, serResetPass] = useState(false); //   Reset Passord Mode On/Off
  const closeModel = () => {
    serResetPass(false);
  };

  // --------------- Reset Password Reset Email -------------------
  const handelFoget = (e) => {
    e.preventDefault();

    // Reset Password Reset Email
    sendPasswordResetEmail(auth, resetPass)
      .then(() => {
        setShowSendEmail(true);
        console.log("Doooon");
      })
      .catch((error) => {
        // const errorCode = error.code;
        // ..
        // console.log(errorCode)
      });
  };

  // --------------------------------------------------------------
  // Value Email
  const emailVal = (e) => {
    setEmail(e.target.value);
  };

  // Value Password
  const passwordVal = (e) => {
    setPassword(e.target.value);
  };
  // --------------------------------------------------------------

  // sign-In With Email And Password
  const sendData = (e) => {
    // هيوقف عمليه الرفرش لصفحه
    e.preventDefault();

    // sign-In With Email And Password
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        // ...

        // دا الي هيوديني علي الصفحه ارئسيه لو اسجل دخول
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/invalid-credential":
            setError("The password and email are incorrect");
            break;

          case "auth/too-many-requests":
            setError("Too many requests, please try again later");
            break;

          case "auth/invalid-email":
            setError("Email is incorrect");
            break;

          default:
            setError(
              "Please make sure that your email and password are correct"
            );
            break;
        }
      });
  };

  // --------------------------------------------------------------

  // ----- sign-in the navigate(/) --------
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  // --------- error ---------
  if (error) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  // ------- loading ----------
  if (loading) {
    return <Lodinge />;
  }

  // ------------ Not sign-in --------------
  if (!user) {
    return (
      <div>
        <Helmet>
          <title>SignIn Page</title>
          <meta name="description" content="SignIn Page" />
        </Helmet>

        <Header />

        <main>
          {/* ------------------ form-1 --------------------- */}
          {resetPass && (
            // ------------------ Level-3 ---------------------
            <Model closeModel={closeModel}>
              <input
                onChange={(e) => serResetPass(e.target.value)}
                required
                placeholder="E-mail"
                type="email"
              />
              <button onClick={handelFoget} className="reset-password">
                {t("Reset Password")}
              </button>
              {showSendEmail && (
                <p className="massege">{t("plesse check your email")}</p>
              )}
            </Model>
          )}

          {/* ------------------ form-2 ----------------------- */}
          <form>
            <p style={{ color: "red", fontSize: "16px" }}> {Error}</p>

            <input
              required
              onChange={emailVal}
              placeholder="Email:"
              type="email"
            />
            <input
              required
              onChange={passwordVal}
              placeholder="Password:"
              type="password"
            />
            <button onClick={sendData}>{t("SignIn")}</button>

            <p className="account">
              {t("Don't have an account")} <Link to={"/signUp"}>{t("SignUp")}</Link>
            </p>

            <p onClick={() => serResetPass(true)} className="click-forget">
              {t("forget password?")}
            </p>
          </form>
        </main>
        <Footer />
      </div>
    );
  }
  // --------------------------------------------------------------
};

export default SignIn;
