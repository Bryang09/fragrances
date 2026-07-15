import { useState } from "react";

const FragranceHouseForm = (props) => {
  const [newHouseValue, setNewHouseValue] = useState(null);
  const [house, setHouse] = useState({
    name: "",
    original: null,
  });
  const { setForm, newHouse, setNewHouse } = props;

  const setOriginalOrDupe = (value) => {
    setHouse((prev) => ({
      ...prev,
      original: value,
    }));
  };
  const setHouseName = (value) => {
    setHouse((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const submitionHandlerHouse = async (e) => {
    e.preventDefault();
    console.log(house);

    try {
      const response = await fetch(
        "http://localhost:4001/api/fragrance_house",
        {
          method: "POST",
          body: JSON.stringify(house),
          headers: { "Content-Type": "application/json" },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setForm(0);
        setNewHouse(json._id);
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(newHouseValue);
  console.log(house);
  console.log(setHouse.original);

  return (
    <div className="form">
      <form
        className="additional_fragrance_house_form"
        onSubmit={submitionHandlerHouse}
      >
        <div className="form_section other">
          <label htmlFor="newFragranceHouse">Fragrance House:</label>
          <input
            type="text"
            name="newFragranceHouse"
            onChange={(e) => setHouseName(e.target.value)}
            required
          />
        </div>
        <div className="form_section original">
          <label htmlFor="original">Original or Dupe House?</label>
          <div className="radio_option">
            <input
              type="radio"
              value="original"
              id="original"
              name="house"
              onClick={() => setOriginalOrDupe("original")}
              required
            />
            <label htmlFor="original">Original</label>
          </div>
          <div className="radio_option">
            <input
              type="radio"
              value="dupe"
              name="house"
              onChange={() => setOriginalOrDupe("dupe")}
            />
            <label htmlFor="dupe">Dupe House</label>
          </div>
        </div>
        <button type="submit">Add Fragrance House</button>
      </form>
    </div>
  );
};
export default FragranceHouseForm;
