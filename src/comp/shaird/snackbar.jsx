import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const Snackbar = ({ showMassage }) => {
  const { t } = useTranslation(); // Translate Function

  return (
    <>
      <Helmet>
        <style type="text/css">{`
        .show-masseg{
            background-color: whitesmoke;
            padding: 5px 10px ;
            color: teal;
            font-weight: 500;
            border-radius: 7px;
            position: fixed;
            top: 100px;
            transition: all 1s;
        }
         .fa-circle-check{
            color: teal;
        }

        `}</style>
      </Helmet>
      <div
        style={{ right: showMassage ? "2vh" : "-100vh" }}
        className="show-masseg"
      >
        {t("Task Add successfully")}{" "}
        <i className="fa-regular fa-circle-check"></i>
      </div>
    </>
  );
};
// const [showMassage, setshowMassage] = useState(false); // show massage

export default Snackbar;
