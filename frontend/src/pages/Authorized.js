import { useState } from "react";
import AddFragrance from "../components/AddFragrance/AddFragrance";

import "../styles/Authorized.css";
import FragranceHouseForm from "../components/AddFragrance/FragranceHouseForm";

const Authorized = () => {
  const [form, setForm] = useState(0);
  const [newHouse, setNewHouse] = useState(false);

  console.log(form);

  return (
    <div className="authorizedPage">
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
