import { Helmet } from "react-helmet-async";

// (closeModel)=>  function to close the model when click on cross or outside
const Model = ({ closeModel, children }) => {
  return (
    <div className="foget-of-password">
      <Helmet>
        <style type="text/css">{`

      .model {
          background-color: whitesmoke;
          padding: 5px;
          width: 35%;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          position: fixed;
          
          // transition: all 1s;
          // scale: 0;
          // transform: translateY(-100vh); 
          // scale: 1;
          // transform: translateY(0);

        animation: mymodel 0.5s;
      }
      
      .App.Light .model {
          background-color: #777;
      }

      .model button {
          font-size: 14px;
          border-radius: 3px;
      }
      
      .model button:hover {
          background-color: transparent;
          color: #333;
          border: solid 1px #777;
          transition: all 0.13s;
          cursor: pointer;
      }
      .model .fa-xmark {
          font-size: 25px;
          color: #333;
          position: absolute;
          top: 15px;
          right: 15px;
          cursor: pointer;
      }
      .model input {
          width: 80%;
      }
      
      form {
          width: 30%;
      }
      
      form input {
          padding: 10px 5px;
      }
      
      form p {
          font-size: 15px;
          line-height: 25px;
      }
      
      .model .massege {
          font-size: 13px;
          color: #333 !important;
      }
            
        @keyframes mymodel{
            0%{ scale: 0; transform: translateY(-100vh); }
            100%{ scale: 1; transform: translateY(0); }
        }
        `}</style>
      </Helmet>

      <form className="model">
        <div>
          <i onClick={() => closeModel()} className="fa-solid fa-xmark"></i>
        </div>

        {children}
      </form>
      
    </div>
  );
};
// ------------------ Level-3 ---------------------
//const [resetPass, serResetPass] = useState(false);
//const closeModel = () => {
//  serResetPass(false);
//};
export default Model;
