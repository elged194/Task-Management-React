import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t,i18n } = useTranslation();

  // if (i18n.language === "ar") {
  //   return (
  //     <footer dir="rtl">
  //       تم التصميم والبرمجه بواسطه حسين الجد elged194@gmail.com
  //       <span><i class="fa-solid fa-heart"></i></span>
  //     </footer>
  //   );
  // }

  if (i18n.language === "en") {
    return (
      <footer >
        <a href="https://github.com/elged194" ><i class="fa-brands fa-square-github"></i></a>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-facebook"></i>
        <a href="https://www.linkedin.com/in/hussein-sadiq-elged/"><i class="fa-brands fa-linkedin"></i></a>
        <hr/>
        {t("designed and developed by elged194@gmail.com")}
        <span><i class="fa-solid fa-heart"></i></span>
      </footer>
    );
  }

};

export default Footer;
