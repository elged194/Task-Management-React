import Footer from "../../comp/Footer";
import Header from "../../comp/header";
import "./EditTask.css";

import { auth, db } from "../../Firebase/Confog";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactLoading from "react-loading";
import SubTitle from "./sub_title";
import SubTaskItem from "./sub_task_item";
import { useParams } from "react-router-dom";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";

const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);
  let { stringId } = useParams();

  // Edit Title Input
  const editTitle = async (e) => {
    await updateDoc(doc(db, user.uid, stringId), {
      title: e.target.value,
    });
  };

  // ================
  // sub Task Items
  // ================
  const DeleteItem = async (e) => {
    await updateDoc(doc(db, user.uid, stringId), {
      array: arrayRemove(e),
    });
  };

  const completedTask = async (e) => {
    if (e.target.checked) {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: false,
      });
    }
  };

  // -----------------------------------------------

  if (error) {
    return (
      <>
        <main>
          <h1>Error : {error.message}</h1>
        </main>
      </>
    );
  }

  if (loading) {
    return (
      <main>
        {" "}
        <ReactLoading
          type={"bars"}
          color={"#fff"}
          height={150}
          width={150}
          display={"flex"}
        />
      </main>
    );
  }

  if (user) {
    return (
      <>
        <Header />
        <div className="edit-task">
          {/* title */}
          <SubTitle user={user} stringId={stringId} editTitle={editTitle} />

          {/* sub tasks */}
          <SubTaskItem
            user={user}
            stringId={stringId}
            completedTask={completedTask}
            DeleteItem={DeleteItem}
          />

          {/* Bottons */}
          {/* <SubButtons user={user} stringId={stringId} AddTask={AddTask}/> */}
        </div>
        <Footer />
      </>
    );
  }
};

export default EditTask;
