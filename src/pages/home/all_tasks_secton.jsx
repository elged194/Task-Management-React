import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase/Confog";
import ErrorPage from "../Error/ErrorPage";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useState } from "react";

const AllTasksSecton = ({ user }) => {
  const [Order, setOrder] = useState(
    query(collection(db, user.uid), orderBy("id" , "asc"))
  );

  const [Opasry, setOpasry] = useState(false);

  const [value, loading, error] = useCollection(Order);

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

            <button 
            style={{opacity:Opasry?  "1" : "0.3"}}
            onClick={()=>{
              setOrder(query(collection(db, user.uid), orderBy("id" , "desc")))
              setOpasry(true)
            }}>Newest First</button>

            <button 
            style={{opacity:Opasry?  "0.3" : "1"}}
            onClick={()=>{
              setOrder(query(collection(db, user.uid), orderBy("id", "asc")))
              setOpasry(false)
            }}>Oldest First</button>

            <select id="browsers">
              <option value="">All Tasks</option>
              <option value="">completed</option>
              <option value="">Not Completed</option>
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
