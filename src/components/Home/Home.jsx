import ItemsDiv from "./ItemsDiv";
import LineChart from "./LineChart";
import ProductCard from "./ProductCard";
import TopPanel from "./TopPanel";

const Home = () => {
  return (
    <div className="p-4 md:mx-4 md:ml-12">
      <TopPanel />
      <ItemsDiv />
      <LineChart />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-8">
        <ProductCard />
      </div>
    </div>
  );
};

export default Home;
