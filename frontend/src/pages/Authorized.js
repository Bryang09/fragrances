import { useState } from "react";
import AddFragrance from "../components/AddFragrance/AddFragrance";

import "../styles/Authorized.css";
import FragranceHouseForm from "../components/AddFragrance/FragranceHouseForm";

const Authorized = () => {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(0);
  const [newHouse, setNewHouse] = useState(false);

  console.log(form);

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

      {form === 0 ? (
        <AddFragrance
          form={form}
          setForm={setForm}
          newHouse={newHouse}
          setNewHouse={setNewHouse}
        />
      ) : (
        <FragranceHouseForm setForm={setForm} setNewHouse={setNewHouse} />
      )}
    </div>
  );
};

export default Authorized;
