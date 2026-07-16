import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditFragrance = () => {
  const [fragrance, setFragrance] = useState(null);
  const [fragrances, setFragrances] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);

  useEffect(() => {
    const getFragrance = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URI}/fragrances/${id}`
        );
        const json = await response.json();

        if (response.ok) {
          setFragrance(json);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getFragrances = async () => {
      const response = await fetch(`${process.env.REACT_APP_URI}/fragrances`);
      const json = await response.json();
      setFragrances(json);
    };
    getFragrances();
    getFragrance();
  }, [id]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFragrance((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(fragrance);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(fragrance);

    const response = await fetch(
      `${process.env.REACT_APP_URI}/fragrances/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(fragrance),
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response);

    if (response.ok) {
      navigate(`/fragrance/${id}`);
    }
  };

  const filter = fragrances?.filter((fragrance) => fragrance.original);

  console.log(filter);

  console.log(fragrance);
  console.log(fragrances);

  return (
    <div className="editFragrance">
      {fragrance && (
        <form onSubmit={(e) => submitHandler(e)}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={fragrance.name}
            onChange={(e) => changeHandler(e)}
          />
          <label htmlFor="fragranceHouse">Fragrance House</label>
          <input
            type="text"
            id="fragranceHouse"
            defaultValue={fragrance.fragranceHouse.name}
            readOnly
          />
          <label htmlFor="shoppingLinks">Shopping Link</label>
          <input
            type="url"
            name="shoppingLinks"
            id="shoppingLinks"
            // defaultValue={fragrance.shoppingLink[0] || ""}
          />
          <div className="form_section original">
            <label htmlFor="original">Original or Dupe?</label>
            <div className="radio_option">
              <input
                type="radio"
                value="true"
                id="original"
                name="original"
                onChange={(e) => changeHandler(e)}
                required
              />
              <label htmlFor="original">Original</label>
            </div>
            <div className="radio_option">
              <input
                type="radio"
                value="false"
                name="original"
                onChange={(e) => changeHandler(e)}
              />
              <label htmlFor="original">Dupe</label>
            </div>
          </div>
          <div className="form_section gender">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              onChange={(e) => changeHandler(e)}
            >
              <option defaultValue="" disabled></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
            {fragrance.original === "false" && (
              <div className="form_section">
                <label htmlFor="dupeOf">Dupe Of</label>
                <select
                  name="dupeOf"
                  id="dupeOf"
                  onChange={(e) => changeHandler(e)}
                >
                  {filter.map((f) => {
                    return (
                      <option key={f._id} value={f._id}>
                        {f.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            <button>Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditFragrance;
