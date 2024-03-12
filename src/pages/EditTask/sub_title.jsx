import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../Firebase/Confog";
import { doc } from "firebase/firestore";
import ReactLoading from "react-loading";

const SubTitle = ({ user, stringId, editTitle }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));

  // loading
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

  // error
  if (error) {
    return (
      <>
        <main>
          <h1>Error: {error.message}</h1>
        </main>
      </>
    );
  }

  return (
    <section className="title-edit-task">
      <input
      // completed task
      style={{
        textDecoration: value.data().completed ? "line-through tomato" : "",
      }}
        onChange={editTitle}
        type="text"
        defaultValue={value.data().title}
      />
      <i className="fa-solid font fa-pen-to-square"></i>
    </section>
  );
};

export default SubTitle;
