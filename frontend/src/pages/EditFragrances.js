import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import "../styles/EditFragrances.css";
import { useNavigate } from "react-router-dom";
const EditFragrances = () => {
  const [fragrances, setFragrances] = useState(null);
  const [search, setSearch] = useState("");
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
  }, []);

  const onEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const data = fragrances?.filter((fragrance) =>
    fragrance.name.toLowerCase().includes(search.toLowerCase())
  );
  //   const filter = fragrances?.filter((fragrance) =>
  //     fragrance.name.toLowerCase().includes(search.toLowerCase())
  //   );

  console.log(data?.length);

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
                      <h4>{f.name}</h4>
                    </span>{" "}
                    <span className="icon">
                      <FaEdit onClick={() => onEdit(f._id)} />
                    </span>
                    <span className="icon trash">
                      <FaTrashAlt />
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
