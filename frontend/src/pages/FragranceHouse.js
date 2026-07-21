import { useEffect, useState } from "react";
import { FaVenusMars, FaVenus, FaMars } from "react-icons/fa6";

import { useNavigate, useParams } from "react-router-dom";

import "../styles/FragranceHouse.css";

const FragranceHouse = () => {
  const [fragranceHouse, setFragranceHouse] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleClick = (id) => {
    navigate(`/fragrance/${id}`);
  };

  const handleShopping = (link) => {
    const shopping = link ? link : "https://google.com";
    console.log(shopping);

    window.open(link, "_blank", "noopener,noreferrer");
  };
  console.log(fragranceHouse);

  return (
    <div className="fragranceHouse">
      {fragranceHouse && (
        <div>
          <h3>{fragranceHouse.name}</h3>

          <div className="fragrances">
            {fragranceHouse.fragrances.map((f) => {
              return (
                <div className="fragrance" key={f._id}>
                  <img
                    src={f.images[0]}
                    alt={f.name}
                    onClick={() => handleClick(f._id)}
                  />
                  <div className="title">
                    <h4 onClick={() => handleClick(f._id)}>{f.name}</h4>
                    <span>
                      {f.gender === "unisex" ? (
                        <FaVenusMars className="unisex" />
                      ) : f.gender === "male" ? (
                        <FaVenus className={f.gender} />
                      ) : (
                        <FaMars className={f.gender} />
                      )}
                    </span>
                  </div>

                  <h5 onClick={() => handleShopping(f.shoppingLink)}>Shop</h5>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default FragranceHouse;
