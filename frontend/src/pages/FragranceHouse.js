import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FragranceHouse = () => {
  const [fragranceHouse, setFragranceHouse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getFragrance = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URI}/fragrance_house/${id}`
        );
        const json = await response.json();
        setFragranceHouse(json);
      } catch (error) {
        console.log(error);
      }
    };
    getFragrance();
  }, [id]);

  console.log(fragranceHouse);

  return (
    <div className="fragranceHouse">
      {fragranceHouse && (
        <div>
          <h3>{fragranceHouse.name}</h3>

          <div>
            {fragranceHouse.fragrances.map((f) => {
              return <h4 key={f._id}>{f.name}</h4>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default FragranceHouse;
