import "./homepage.css";
import NavbarCustom from "../navigation/NavbarCustom";
import HeroCustom from "../hero/HeroCustom";
import MainCustom from "../main/MainCustom";
import ProductSection from "../productSection/ProductSection";
import FooterCustom from "../footer/FooterCustom";
const Homepage = () => {
  return (
    <>
      <div className="div-homepage">
        <NavbarCustom />
        <HeroCustom />
        <MainCustom />
        <ProductSection />
        <FooterCustom />
      </div>
    </>
  );
};
export default Homepage;
