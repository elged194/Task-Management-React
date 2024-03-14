import Header from "../comp/header";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Lodinge from "../comp/Lodinge";
// ----------------------------------------------------------
import { auth } from "../Firebase/Confog";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ErrorPage from "./Error/ErrorPage";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";
// ----------------------------------------------------------

const SignUp = () => {
  const { t } = useTranslation(); // Translation

  const [showLoding, setshowLoding] = useState(); //  Loading...

  const navigate = useNavigate(); // useNavigate

  const [user, loading, error] = useAuthState(auth);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");

  // (sign-in & verification email) normling
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const NameVal = (e) => setUserName(e.target.value);

  const emailVal = (e) => setEmail(e.target.value);

  const passwordVal = (e) => setPassword(e.target.value);

  // create User With Email And Password
  const sendData = async(e) => {
    e.preventDefault(); // ايقاف الريفرش او الارسال

    setshowLoding(true); //  show Loading...

    //  التحقق من البيانات
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);

        // send Email Verification
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
          console.log("Email Verification Sent!");
        });

        // User Name
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            // دا الي هيوديني علي الصفحه تسجيل الدخول
            navigate("/");
          })
          .catch((error) => {
            console.log(error.code);
          });
      })

      // masege Error Code
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

          case "auth/operation-not-allowed":
            setError("You cannot create an account at this time");
            break;

          default:
            setError(
              "Please make sure that your email and password are correct"
            );
            break;
        }
      });
    setshowLoding(false); //  show Loading...
  };

  // error
  if (error) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  // loading
  if (loading) {
    return <Lodinge />;
  }

  // Not sign-in
  if (!user) {
    return (
      <div>
        <Helmet>
          <title>SignUp Page</title>
          <meta name="description" content="SignUp Page" />
        </Helmet>

        <Header />
        <main>
          <form>
            <p style={{ color: "red", fontSize: "16px" }}> {Error}</p>
            <p>{t("Create New Account")}</p>
            <input
              onChange={NameVal}
              required
              placeholder="User Name:"
              type="text"
            />
            <input
              onChange={emailVal}
              required
              placeholder="Email:"
              type="email"
            />
            <input
              onChange={passwordVal}
              required
              placeholder="Password:"
              type="password"
            />
            <button onClick={sendData} className="singUp-loding">
              {showLoding ? (
                <ReactLoading
                  type={"bars"}
                  color={"#fff"}
                  height={50}
                  width={50}
                  display={"flex"}
                />
              ) : (
                t("SignUp")
              )}
            </button>

            <p className="account">
              {t("Ready have an account")}{" "}
              <Link to={"/signIn"}>{t("SignIn")}</Link>
            </p>
          </form>
        </main>
        <Footer />
      </div>
    );
  }
};

export default SignUp;
