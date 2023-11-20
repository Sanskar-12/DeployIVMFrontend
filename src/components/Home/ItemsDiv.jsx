import ItemCard from "../Home/ItemCard";
import item1 from "../../assets/lists.png";
import item2 from "../../assets/order.png";
import item3 from "../../assets/sent.png";
import item4 from "../../assets/cross-button.png";
// import BsCart2 from "react-icons/bs"

export default function ItemsDiv() {
  return (
    <div className="gap-4 md:my-8 grid grid-cols-2 md:grid-cols-4 md:gap-8">
      <ItemCard
        name={"No of Orders"}
        icon={item1}
        val={"25"}
        deco={"p-4 bg-[#DDEFE0] rounded-2xl"}
      />
      <ItemCard
        name="Shipped Orders"
        icon={item2}
        val="14"
        deco="p-4 bg-[#F4ECDD] rounded-2xl"
      />
      <ItemCard
        name="Accepted Orders"
        icon={item3}
        val="8"
        deco="p-4 bg-[#EFDADA] rounded-2xl"
      />
      <ItemCard
        name="Rejected Orders"
        icon={item4}
        val="3"
        deco="p-4 bg-[#DEE0EF] rounded-2xl"
      />
    </div>
  );
}