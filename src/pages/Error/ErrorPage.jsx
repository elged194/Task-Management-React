// @ts-nocheck
import { Helmet } from "react-helmet-async";
import "./ErrorPage.css"
const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>404</title>
        <style type="text/css">{
          
        }</style>
      </Helmet>


      <div className="not-found parallax">
        <div className="sky-bg" />
        <div className="wave-7" />
        <div className="wave-6" />
        <a className="wave-island" href="/">
          <img
            src="http://res.cloudinary.com/andrewhani/image/upload/v1524501929/404/island.svg"
            alt="Island"
          />
        </a>
        <div className="wave-5" />
        <div className="wave-lost wrp">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>
        <div className="wave-4" />
        <div className="wave-boat">
          <img
            className="boat"
            src="http://res.cloudinary.com/andrewhani/image/upload/v1524501894/404/boat.svg"
            alt="Boat"
          />
        </div>
        <div className="wave-3" />
        <div className="wave-2" />
        <div className="wave-1" />
        <div className="wave-message">
          <p>Your're lost</p>
          <p>Click on the island to return</p>
        </div>
      </div>
      
    </>
  );
};

export default ErrorPage;
