import { useEffect, useState } from "react";

const Dupes = (props) => {
  const [fragrances, setFragrances] = useState(null);
  const [search, setSearch] = useState("");
  const { changeHandler } = props;

  useEffect(() => {
    const getFragrances = async () => {
      try {
        const response = await fetch(`http://localhost:4001/api/fragrances`);
        const json = await response.json();
        const filter = await json
          .filter((a) => a.original)
          .sort((a, b) =>
            a.fragranceHouse.name.localeCompare(b.fragranceHouse.name)
          );
        if (response.ok) {
          setFragrances(filter);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFragrances();
  }, []);

  const filter = fragrances?.filter((fragrance) =>
    fragrance.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dupe_form">
      <h2>What Scent Is It a Dupe Of?</h2>
      <select
        name="dupeOf"
        id="dupeOf"
        defaultValue={""}
        required
        onChange={changeHandler}
      >
        <option readOnly disabled></option>
        {filter &&
          filter.map((fragrance) => {
            return (
              <option key={fragrance._id} value={fragrance._id}>
                {fragrance.fragranceHouse.name} - {fragrance.name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Dupes;
