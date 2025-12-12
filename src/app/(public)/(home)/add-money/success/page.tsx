
import { CircleCheckBig } from "lucide-react";

const AddMoneySuccess = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl font-bold flex flex-row gap-3 justify-center items-center">
        {" "}
        <CircleCheckBig color="green" size={80} /> Add money was successful.
      </h1>
      <p className="text-xl">
        Please close the tab.
      </p>
    </div>
  );
};

export default AddMoneySuccess;