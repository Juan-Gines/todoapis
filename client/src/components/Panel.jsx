import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Panel = () => {
  const { formData, action, fetchTime } = useContext(AppContext);
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <span className="font-semibold">API:</span>
        <span>{formData.api}</span>
      </div>
      <div className="flex space-x-2">
        <span className="font-semibold">BBDD:</span>
        <span>{formData.bbdd}</span>
      </div>
      <div className="flex space-x-2">
        <span className="font-semibold">Action:</span>
        <span>{action}</span>
      </div>
      <div className="flex space-x-2">
        <span className="font-semibold">Fetch time:</span>
        <span>{fetchTime}</span>
      </div>
    </div>
  );
}

export default Panel;