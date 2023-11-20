import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllInventoryAction } from "../../Actions/inventoryActions";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert"

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProductCard() {
  const dispatch = useDispatch();
  const alert=useAlert()

  const { loading, products, error } = useSelector((state) => state.inventory);

  const ConsumableCount=products?.filter((item)=>item?.type==="Consumable")
  const NonConsumableCount=products?.filter((item)=>item?.type==="NonConsumable")

  const data = {
    labels: ["Consumable", "NonConsumable"],
    datasets: [
      {
        label: "% of product",
        data: products?[ConsumableCount?.length,NonConsumableCount?.length]:[0,0],
        backgroundColor: [
          "#5C59E8",
          "#9D9BF1"
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  useEffect(() => {
    dispatch(getAllInventoryAction());
  }, [dispatch]);

  useEffect(()=>{
    if(error)
    {
        alert.error(error)
    }
  },[alert,error])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-white rounded-2xl px-4 pt-4">
            <div className="flex justify-between text-xl font-bold">
              Type of Inventory
            </div>
            <div className="grid md:grid-cols-[1fr_2fr]">
              <div className="mx-auto w-52 p-4">
                <Doughnut data={data} options={options} />
              </div>
              <div className="p-8">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-[#5C59E8] rounded-full"></div>
                    <div className="font-bold text-lg">Consumable Products</div>
                  </div>
                  <div className="pl-8 text-gray-400">{ConsumableCount?.length}</div>
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-[#9D9BF1] rounded-full"></div>
                    <div className="font-bold text-lg">NonConsumable Products</div>
                  </div>
                  <div className="pl-8 text-gray-400">{NonConsumableCount?.length}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
