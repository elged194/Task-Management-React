import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();

  if (i18n.language === "ar") {
    return (
      <footer dir="rtl">
        تم التصميم والبرمجه بواسطه حسين الجد elged194@gmail.com
        <span>🧡</span>
      </footer>
    );
  }

  if (i18n.language === "en") {
    return (
      <footer >
        Designed and developed by elged194@gmail.com
        <span>🧡</span>
      </footer>
    );
  }

  if (i18n.language === "fr") {
    return (
      <footer >
        Concu et developpo par elged194@gmail.com
        <span>🧡</span>
      </footer>
    );
  }
};

export default Footer;
