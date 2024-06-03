import { useLoaderData } from "react-router-dom";
import Accordion from "../components/home/Accordion";
import Banner from "../components/home/Banner";
import Products from "../components/home/Products";

const Home = () => {
  const products = useLoaderData();

  return (
    <div>
      <Banner />
      <Products products={products} />
      <Accordion />
    </div>
  );
};

export default Home;
