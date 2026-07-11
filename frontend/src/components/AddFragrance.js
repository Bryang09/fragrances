import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFragrance = () => {
  const [data, setData] = useState({
    name: "",
    images: "",
    fragranceHouse: 0,
    original: false,
    shoppingLink: "",
  });
  const [fragranceHouses, setFragranceHouses] = useState(null);
  const [newHouse, setNewHouse] = useState(false);
  const [newHouseValue, setNewHouseValue] = useState(null);
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
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createFragrance = async (e) => {
    try {
      const response = await fetch("http://localhost:4001/api/fragrances", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitionHandler = async (e) => {
    e.preventDefault();

    if (newHouse === "other") {
      try {
        const response = await fetch(
          "http://localhost:4001/api/fragrance_house",
          {
            method: "POST",
            body: JSON.stringify({ name: newHouseValue }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const json = await response.json();

        setData((prev) => ({
          ...prev,
          fragranceHouse: json._id,
        }));
        createFragrance();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="form">
      <form onSubmit={submitionHandler}>
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
        <div className="form_section fragranceHouse">
          <label htmlFor="fragranceHouse">Fragrance House</label>
          <select
            name="fragranceHouse"
            id="fragranceHouse"
            onChange={(e) => setNewHouse(e.target.value)}
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
        {newHouse === "other" && (
          <div className="form_section other">
            <label htmlFor="newFragranceHouse">Fragrance House:</label>
            <input
              type="text"
              name="newFragranceHouse"
              onChange={(e) => setNewHouseValue(e.target.value)}
            />
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddFragrance;
