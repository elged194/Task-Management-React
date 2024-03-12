import Model from "../../comp/shaird/model";
import "./Home.css";
import ReactLoading from "react-loading";

const ModelHome = ({
  closeModel,
  titleOfInput,
  titleTask,
  itemsOfInput,
  inp,
  handelAdd,
  arr,
  submitTaskButn,
  subloding,
}) => {
  return (
    <Model closeModel={closeModel}>
      <form className="home-of-form">
        <input
          className="inp-of-title"
          type="text"
          placeholder="Title Task"
          onChange={titleOfInput}
          value={titleTask}
        />
        <div className="flex">
          <input
            onChange={itemsOfInput}
            value={inp}
            type="text"
            placeholder="Items Of Task"
          />

          <button onClick={handelAdd} className="add-btn-of-items">
            Add
          </button>
        </div>

        <ul>
          {arr.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>

        <button className="submit-task-butn" onClick={submitTaskButn}>
          {subloding ? (
            <ReactLoading
              type={"bars"}
              color={"#fff"}
              height={50}
              width={50}
              display={"flex"}
            />
          ) : (
            "Submit Task"
          )}
        </button>
      </form>
    </Model>
  );
};

export default ModelHome;
