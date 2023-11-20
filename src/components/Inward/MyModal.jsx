import react,{ useState } from "react";
import DatePicker from "react-datepicker";

function MyModal({ visible, onClose }) {
  const [startDate, setStartDate] = useState(new Date());

  // console.log(startDate);

  const handleOnClose = (e) => {
    e.preventDefault;
 
    if (e.target.id === "container") onClose();
  };
  if (!visible) return null;

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-white p-2 rounded w-55">
        <input  type="date" onChange={(e) => setStartDate(e)} />
      </div>
    </div>
  );
}

export default MyModal;
