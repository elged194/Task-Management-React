import Header from "../comp/header";
import Footer from "../comp/Footer";
// import Element from "../comp/element";
import { Helmet } from "react-helmet-async";
// --------------------------------------------------
import { auth } from "../Firebase/Confog";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Moment from "react-moment";
import { deleteUser } from "firebase/auth";
import Lodinge from "../comp/Lodinge";
import ErrorPage from "./Error/ErrorPage";
// --------------------------------------------------

const Profile = () => {
  // --------------------------------------------------
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  // Not Sign-in -- sign-in Not verification email
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }

    // sign-in without E-mail Not verification email
    if (user && !user.emailVerified) {
      navigate("/");
    }
  });
  // --------------------------------------------------

  // -------- Delete Accont -----------
  const DeleteAccont =()=>{
    deleteUser(user).then(() => {
      // User deleted.
      console.log("dooooon")
    }).catch((error) => {
      // An error ocurred
      // ...
    });
  }

  // ------- error -------
  if (error) {
    return (
      <div>
        <ErrorPage/>
      </div>
    );
  }

  // ------- loading --------
  if (loading) {
    return <Lodinge/>
  }

  // (sign-in & verification email) normling
  if (user) {
    if (user.emailVerified) {
      return (
        <div>
          {/* ------ Helmet ------ */}
          <Helmet>
            <title>Profile Page</title>
            <meta name="description" content="Profile Page" />
          </Helmet>

          <Header />
          <main>
            <div style={{ textAlign: "start" }}>
              <h3>Name: {user.displayName}</h3>
              <h3>E-mail: {user.email}</h3>
              <h3>
                Create Accont:{" "}
                <Moment fromNow ago date={user.metadata.creationTime} />
              </h3>

              <h3>
                last SignIn Time:{" "}
                <Moment
                  fromNow
                  add={{ days: 1, hours: 12 }}
                  ago
                  date={user.metadata.lastSignInTime}
                />
              </h3>

              <button onClick={DeleteAccont} style={{marginLeft:"0"}}>Delete Accont</button>
            </div>
          </main>

          <Footer />
        </div>
      );
    }
  }
};

export default Profile;
