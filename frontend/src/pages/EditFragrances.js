import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "../styles/EditFragrances.css";

import { useNavigate } from "react-router-dom";
const EditFragrances = () => {
  const [fragrances, setFragrances] = useState(null);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getFragrances = async () => {
      const uri = process.env.REACT_APP_URI;
      console.log(uri);

      try {
        const response = await fetch(`${process.env.REACT_APP_URI}/fragrances`);
        const json = await response.json();
        setFragrances(json);
      } catch (error) {
        console.log(error);
      }
    };

    getFragrances();
  }, [refresh]);

  const onEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const data = fragrances?.filter((fragrance) =>
    fragrance.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteFragrance = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_URI}/fragrances/${id}`,
      { method: "DELETE" },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(response);

    if (response.ok) {
      setRefresh((prev) => prev + 1);
    }
  };

  return (
    <div className="editFragrances">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search Fragrance"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="container">
        {data?.length > 0 ? (
          data
            .sort((a, b) =>
              a.fragranceHouse.name.localeCompare(b.fragranceHouse.name)
            )
            .map((f) => {
              return (
                <div className="fragrance" key={f._id}>
                  <div className="names section">
                    <span>
                      <h4>{f.fragranceHouse.name}</h4>
                    </span>
                    <span>
                      <h4>
                        {f.name}
                        <span
                          className={f.original ? "type original" : "type dupe"}
                        >
                          {f.original ? "Original" : "Dupe"}
                        </span>
                      </h4>
                    </span>{" "}
                    <span className="icon">
                      <FaEdit onClick={() => onEdit(f._id)} />
                    </span>
                    <span className="icon trash">
                      <FaTrashAlt onClick={() => deleteFragrance(f._id)} />
                    </span>
                  </div>
                </div>
              );
            })
        ) : (
          <h4>Fragrance Not Found</h4>
        )}
      </div>
    </div>
  );
};

export default EditFragrances;
