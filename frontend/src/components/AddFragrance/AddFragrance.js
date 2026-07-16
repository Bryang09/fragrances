import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FragranceHouseForm from "./FragranceHouseForm";
import Dupes from "./Dupes";

const AddFragrance = (props) => {
  const [data, setData] = useState({
    name: "",
    images: "",
    fragranceHouse: 0,
    original: null,
    shoppingLink: "",
  });
  const [fragranceHouses, setFragranceHouses] = useState(null);
  const [newHouseValue, setNewHouseValue] = useState(null);
  const [dupeOf, setDupeOf] = useState(null);
  const { form, setForm, newHouse, setNewHouse } = props;

  const navigate = useNavigate();

  useEffect(() => {
    const getFragranceHouses = async () => {
      const response = await fetch("/api/fragrance_house");
      const json = await response.json();

      if (response.ok) {
        setFragranceHouses(json);
      }
    };
    getFragranceHouses();
  }, []);

  const changeHandler = (e) => {
    console.log(e.target.value);

    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createFragrance = async (e) => {
    console.log(data);
    console.log(dupeOf);

    if (dupeOf) {
      setData((prev) => ({
        ...prev,
        dupeOf,
      }));
    }

    console.log(data);

    try {
      const response = await fetch("http://localhost:4001/api/fragrances", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitionHandler = async (e) => {
    e.preventDefault();
    try {
      createFragrance();
    } catch (error) {
      console.log(error);
    }
  };

  if (data.fragranceHouse === "other") {
    setForm(1);
  }

  console.log(`dupe of ${dupeOf}`);

  return (
    <div className="form">
      <form onSubmit={submitionHandler}>
        <div className="form_section fragranceHouse">
          <label htmlFor="fragranceHouse">Fragrance House</label>
          <select
            name="fragranceHouse"
            id="fragranceHouse"
            onChange={changeHandler}
            defaultValue={""}
            required
          >
            <option value="">----Select Fragrance House----</option>
            {fragranceHouses &&
              fragranceHouses
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((fh) => (
                  <option value={fh._id} key={fh._id}>
                    {fh.name}
                  </option>
                ))}
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form_section name">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form_section images">
          <label htmlFor="images">Image URL</label>
          <input
            type="url"
            id="images"
            name="images"
            value={data.images}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form_section original">
          <label htmlFor="original">Original or Dupe?</label>
          <div className="radio_option">
            <input
              type="radio"
              value="true"
              id="original"
              name="original"
              onChange={changeHandler}
            />
            <label htmlFor="original">Original</label>
          </div>
          <div className="radio_option">
            <input
              type="radio"
              value="false"
              name="original"
              onChange={changeHandler}
            />
            <label htmlFor="dupe">Dupe</label>
          </div>
        </div>
        {data.original == "false" && <Dupes setDupeOf={setDupeOf} />}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddFragrance;
