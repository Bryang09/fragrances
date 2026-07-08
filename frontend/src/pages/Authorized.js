import { useState } from "react";
import AddFragrance from "../components/AddFragrance";

import "../styles/Authorized.css";

const Authorized = () => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="authorizedPage">
      <div className="options">
        <h2 className="option" onClick={() => setSelected("add")}>
          Add Fragrance
        </h2>
        <h2 className="option" onClick={() => setSelected("edit")}>
          Edit Fragrance
        </h2>
      </div>
      <h1>Authorized</h1>

      <AddFragrance />
    </div>
  );
};

export default Authorized;
