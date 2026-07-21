import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditFragrance = () => {
  const [fragrance, setFragrance] = useState(null);
  const [fragrances, setFragrances] = useState(null);
  const [fragranceHouses, setFragranceHouses] = useState(null);
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

    const getFragranceHouses = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_URI}/fragrance_house`
      );
      const json = await response.json();
      setFragranceHouses(json);
    };
    getFragrances();
    getFragrance();
    getFragranceHouses();
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
    console.log(fragrance.fragranceHouse._id);

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

  const filter = fragrances
    ?.filter((fragrance) => fragrance.original)
    .sort((a, b) => a.fragranceHouse.name.localeCompare(b.fragranceHouse.name));

  console.log(filter);

  console.log(fragrance);
  console.log(fragrances);

  return (
    <div className="editFragrance">
      {fragrance && (
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="form_section">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={fragrance.name}
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className="form_section">
            <label htmlFor="fragranceHouse">Fragrance House</label>
            <select
              name="fragranceHouse"
              defaultValue={fragrance.fragranceHouse._id}
              onChange={(e) => changeHandler(e)}
            >
              <option defaultValue={""} disabled readOnly></option>
              {fragranceHouses?.map((f) => {
                return (
                  <option key={f._id} value={f._id}>
                    {f.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form_section">
            <label htmlFor="shoppingLink">Shopping Link</label>
            <input
              type="url"
              name="shoppingLink"
              id="shoppingLink"
              onChange={(e) => changeHandler(e)}
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
                onChange={(e) => changeHandler(e)}
                defaultChecked={fragrance.original ? true : false}
                required
              />
              <label htmlFor="original">Original</label>
            </div>
            <div className="radio_option">
              <input
                type="radio"
                value="false"
                name="original"
                defaultChecked={fragrance.original ? false : true}
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
              defaultValue={fragrance?.gender || ""}
            >
              <option value="" disabled></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>{" "}
          {fragrance.original === "false" ||
            (fragrance.original === false && (
              <div className="form_section">
                <label htmlFor="dupeOf">Dupe Of</label>
                <select
                  name="dupeOf"
                  id="dupeOf"
                  onChange={(e) => changeHandler(e)}
                  defaultValue={""}
                  required
                >
                  <option readOnly disabled></option>
                  {filter?.map((f) => {
                    return (
                      <option key={f._id} value={f._id}>
                        {f.fragranceHouse.name} - {f.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            ))}
          <button>Submit</button>
        </form>
      )}
    </div>
  );
};

export default EditFragrance;
