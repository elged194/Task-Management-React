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
// ----------------------------------------------------------

const SignUp = () => {
  // useNavigate
  const navigate = useNavigate();

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
  const sendData = (e) => {
    // ايقاف الريفرش او الارسال
    e.preventDefault();

    //  التحقق من البيانات
    createUserWithEmailAndPassword(auth, email, password)
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

          default:
            setError(
              "Please make sure that your email and password are correct"
            );
            break;
        }
      });
  };

  // error
  if (error) {
    return (
      <div>
        <ErrorPage/>
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
            <p>Create New Account</p>
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
            <button onClick={sendData}>SignUp</button>

            <p className="account">
              Ready have an account <Link to={"/signIn"}>Sign-In</Link>
            </p>
          </form>
        </main>
        <Footer />
      </div>
    );
  }
};

export default SignUp;
