import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../Firebase/Confog";
import ReactLoading from "react-loading";
import { arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Moment from "react-moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubTaskItem = ({ user, stringId, completedTask, DeleteItem }) => {
  
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));

  const [showAddNewTask, setshowAddNewTask] = useState(false); // show Add New Task

  const [addInput, setaddInput] = useState(""); // Input Of Add task

  const navigate = useNavigate(); // useNavigate

  // Add task
  const Addtask = async (e) => {
    e.preventDefault()
    setaddInput("");
    await updateDoc(doc(db, user.uid, stringId), {
      array: arrayUnion(addInput),
    });
  };

  // delite Task
  const deliteTask = async () => {
    navigate("/", {replace: true});
    await deleteDoc(doc(db, user.uid, stringId));
  };

  // error
  if (error) {
    return (
      <>
        <main>
          <h1>Error : {error.message}</h1>
        </main>
      </>
    );
  }

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

  if (value) {
    return (
      <section className="sub-task">
        <div className="menuo-sub-task">
          <p>
            Created: <Moment fromNow date={value.data().id} />
          </p>
          <label htmlFor="checkbox">
            <input
              onChange={completedTask}
              checked={value.data().completed}
              id="checkbox"
              type="checkbox"
            />
            Completed{" "}
          </label>
        </div>

        {/* sub-items */}
        <ul>
          {value.data().array.map((e) => {
            return (
              <li className="sub-items" key={e}>
                <p>{e}</p>
                <i
                  className="fa-regular font fa-trash-can"
                  onClick={() => DeleteItem(e)}
                ></i>
              </li>
            );
          })}
        </ul>

        {/* Add new item to the list */}
        {showAddNewTask && (
          <form className="add-new-task-items">
            <input
              type="text"
              value={addInput}
              onChange={(e) => setaddInput(e.target.value)}
            />

            <button className="add" onClick={Addtask}>
              Add
            </button>

            <button className="Cancel" onClick={(e) => {setshowAddNewTask(false)
            e.preventDefault()
            }}>
              Cancel
            </button>
          </form>
        )}

        {/* Sub Buttons */}
        <section className="edit-btn">
          <button onClick={() => setshowAddNewTask(true)}>
            Add Task <i className="fa-solid fa-plus"></i>
          </button>

          <button style={{ backgroundColor: "tomato" }} onClick={deliteTask}>
            Delite Task
          </button>
        </section>
      </section>
    );
  }
};

export default SubTaskItem;
