import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const institutes = [
  {
    name: "Thakur PolyTechnic",
    dept: ["computer", "civil", "mechanical"],
    approvers: ["Sameer Singh", "sarang ", "vivek jhatav"],
    verifier: ["Sanskar Vishwakarma", "Sanchit Tripathi", "Vivek Pandey"],
    initiator: [
      "HOD - Computer Science",
      "Deputy HOD - Computer Science",
      "Class Incharge - Computer Science",
    ],
  },
  {
    name: "Thakur Engineering",
    dept: ["Robotics", "electronics", "mechanical"],

    approvers: ["Dr. Sameer Singh", "Dr. Sarang Kanojiya", "Dr. Vivek Jhatav"],
    verifier: [
      "Dr. Harsh Vishwakarma",
      "Dr. Raju Tripathi",
      "Dr. Vishal Pandey",
    ],
    initiator: [
      "Dr. HOD - Computer Science",
      "Dr. Deputy HOD - Computer Science",
      "Dr. Class Incharge - Computer Science",
      "Dr. Dean - Engineering",
    ],
  },
  {
    name: "Thakur Public School",
    dept: ["English", "Maths", "Science"],

    approvers: [
      "Mr. Sameer Singh",
      "Mr. Sarang Gautam jaiswar",
      "Mr. Vivek Yadav",
    ],
    verifier: [
      "Mr. Sanskar Vishwakarma",
      "Mr. Harsh Tripathi",
      "Mr. Vivek Pandey",
    ],
    initiator: ["Mr. HOD - English", "Mr. Deputy HOD - Maths", "Mr. Principal"],
  },
];

const UserPage = () => {
  const [clickedButton, setClickedButton] = useState(null);
  const handleButtonClick = (index) => {
    setClickedButton(index === clickedButton ? null : index);
  };

  return (
    <div>
      <div className="flex  m-6 border-1 rounded-lg border-blue-100">
        {institutes?.map((institute, index) => (
          <button
            key={institute.name}
            className={`min-h-max px-5 py-2 grow text-sm font-medium text-[#ABAFB1]  focus:text-white ${
              clickedButton === index ? "bg-[#5C59E8]" : "bg-[#EEF3F5]"
            }
            `}
            onClick={() => handleButtonClick(index)}
          >
            {institute.name}
          </button>
        ))}
      </div>
      <div>
        <div className="p-4 flex flex-row  justify-around">
          <div className="flex w-1/2 p-8 m-2  gap-[16px] flex-col border-[1px] border-[#ABAFB1] rounded-lg">
            <span className=" text-xl font-bold"> Approver </span>
            <span className="text-start  text-[#ABAFB1] font-medium text-sm">
              Department
            </span>
            <div className="flex flex-start felx-row">
              {institutes[clickedButton]?.dept.map((element, id) => (
                <button
                  key={id}
                  className="min-h-max grow px-2 rounded-lg m-1 border-2 border-[#5C59E8] text-sm font-medium text-[#5C59E8]"
                >
                  {element}
                </button>
              ))}
            </div>
            <div>
              {institutes[clickedButton]?.approvers.map((element, id) => (
                <Link to={`/user-detail-page/${id}`} key={id}>
                  <div className="p-2">
                    <span className="p-2">
                      <AccountCircleIcon />
                    </span>
                    {element}{" "}
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex w-1/2 p-8 m-2 gap-[16px] flex-col border-[1px] border-[#ABAFB1] rounded-lg">
            <span className=" text-xl font-bold"> Verifier</span>
            <span className="text-start  text-[#ABAFB1] font-medium text-sm">
              Department
            </span>
            <div className="flex flex-start felx-row">
              {institutes[clickedButton]?.dept.map((element, id) => (
                <button
                  key={id}
                  className="min-h-max grow px-2 border-2 rounded-lg m-1 border-[#5C59E8] text-sm font-medium text-[#5C59E8]"
                >
                  {element}
                </button>
              ))}
            </div>
            <div>
              {institutes[clickedButton]?.verifier.map((element, id) => (
                <Link to={`/user-detail-page/${id}`} key={id}>
                  <div className="p-2">
                    <span className="p-2">
                      <AccountCircleIcon />
                    </span>
                    {element}{" "}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6">
          <div className="flex w-full p-4 gap-[16px] flex-col border-[1px] border-[#ABAFB1] rounded-lg">
            <span className=" text-xl font-bold"> Initiators </span>
            <span className="text-start  text-[#ABAFB1] font-medium text-sm">
              Department
            </span>
            <div className="flex flex-start felx-row">
              {institutes[clickedButton]?.dept.map((element, id) => (
                <button
                  key={id}
                  className="min-h-max py-1 grow px-2 border-2 rounded-lg m-1 border-[#5C59E8] text-sm font-medium text-[#5C59E8]"
                >
                  {element}
                </button>
              ))}
            </div>
            <div>
              {institutes[clickedButton]?.initiator.map((element, id) => (
                <Link to={`/user-detail-page/${id}`} key={id}>
                  <div className="p-2">
                    <span className="p-2">
                      <AccountCircleIcon />
                    </span>
                    {element}{" "}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
