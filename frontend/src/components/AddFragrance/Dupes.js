import { useEffect, useState } from "react";

const Dupes = (props) => {
  const [fragrances, setFragrances] = useState(null);
  const [search, setSearch] = useState("");
  const { setDupeOf } = props;

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
      <h1>What Scent Is It a Dupe Of?</h1>
      <input
        type="text"
        name="search"
        id="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      {filter &&
        filter.map((fragrance) => {
          return (
            <div className="fragrance_list" key={fragrance._id}>
              <div
                className="fragrance"
                onClick={() => setDupeOf(fragrance._id)}
              >
                <h4>{fragrance.fragranceHouse.name}</h4>
                <h4>{fragrance.name}</h4>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Dupes;
