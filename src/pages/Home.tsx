import Header from "../components/Header";
import Carousel from "../components/Carousel";
import Restaurants from "../components/Restaurants";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const cookie = Cookies.get("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie) {
      navigate("/login");
    }
  }, [cookie, navigate]);

  return (
    <>
      <Header />
      <Carousel />
      <Restaurants />
      <Footer />
    </>
  );
};

export default Home;
