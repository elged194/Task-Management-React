import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Confog";
import ErrorPage from "../Error/ErrorPage";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AllTasksSecton = ({ user }) => {
  const { t } = useTranslation(); //  Translate the page quickly if needed (mostly

  const allTasks = query(collection(db, user.uid), orderBy("id")); // sort by id in ascending order

  const [Order, setOrder] = useState(allTasks); //  Default Order is by id

  const [Opasry, setOpasry] = useState(false); // for handling any errors that may occur during the fetch

  const [value, loading, error] = useCollection(Order); // Loading and error handling.

  const [selctValuo, setselctValuo] = useState("AllTasks"); // Default selection is all tasks.

  const completed = query(
    collection(db, user.uid),
    where("completed", "==", true)
  );

  const NotCompleted = query(
    collection(db, user.uid),
    where("completed", "==", false)
  );
  // error
  if (error) {
    return <ErrorPage />;
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
    if (value.docs.length === 0) {
      return (
        <h1 className="end-tasks">
          the Tasks is Done <i className="fa-regular fa-circle-check"></i>
        </h1>
      );
    } else {
      return (
        <section className="all-tasks">
          {/* optons (filtered data) */}
          <section className="parent-of-btn">
            {selctValuo === "AllTasks" && (
              <>
                <button
                  style={{ opacity: Opasry ? "1" : "0.3" }}
                  onClick={() => {
                    setOrder(
                      query(collection(db, user.uid), orderBy("id", "desc"))
                    );
                    setOpasry(true);
                  }}
                >
                  {t("Newest First")}
                </button>

                <button
                  style={{ opacity: Opasry ? "0.3" : "1" }}
                  onClick={() => {
                    setOrder(
                      query(collection(db, user.uid), orderBy("id", "asc"))
                    );
                    setOpasry(false);
                  }}
                >
                  {t("Oldest First")}
                </button>
              </>
            )}

            <select
              value={selctValuo}
              id="browsers"
              onChange={(e) => {
                if (e.target.value === "AllTasks") {
                  setOrder(allTasks);
                  setselctValuo("AllTasks");
                  setOpasry(false);
                } else if (e.target.value === "completed") {
                  setOrder(completed);
                  setselctValuo("completed");
                } else if (e.target.value === "NotCompleted") {
                  setOrder(NotCompleted);
                  setselctValuo("NotCompleted");
                }
              }}
            >
              <option value="AllTasks"> {t("All Tasks")} </option>
              <option value="completed">{t("completed")}</option>
              <option value="NotCompleted">{t("Not Completed")}</option>
            </select>
          </section>

          {value.docs.map((e) => {
            return (
              <article dir="auto" className="one-task" key={e.data().id}>
                <Link to={`/EditTask/${e.data().id}`}>
                  <h3>{e.data().title}</h3>

                  <ul>
                    {e.data().array.map((e, x) => {
                      if (x < 2) {
                        return <li key={e}>{e}</li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>

                  <p className="time">
                    <Moment fromNow date={e.data().id} />
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      );
    }
  }
};

export default AllTasksSecton;
