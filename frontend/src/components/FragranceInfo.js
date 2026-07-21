import { useNavigate } from "react-router-dom";
import { FaVenusMars, FaVenus, FaMars } from "react-icons/fa6";

import "../styles/Fragrance.css";
import "../styles/FragranceInfo.css";

const FragranceInfo = (props) => {
  const { fragrance } = props;
  const navigate = useNavigate();

  console.log(fragrance);

  const toFragHouse = (id) => {
    navigate(`/fragrance_house/${id}`);
  };

  const handleShopping = (link) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="info_section">
      {/* <div className="image"> */}
      <img src={fragrance.images[0]} alt={fragrance.name} />
      {/* </div> */}
      <div className="details">
        <h3>
          {fragrance.name}{" "}
          <span className={fragrance.original ? "original" : "dupe"}>
            {fragrance.original ? "Original" : "Dupe"}
          </span>
        </h3>
        <h4 style={{ textTransform: "capitalize" }}>
          Gender: {fragrance.gender}
          <span>
            {fragrance.gender === "unisex" ? (
              <FaVenusMars className="unisex" />
            ) : fragrance.gender === "male" ? (
              <FaVenus className={fragrance.gender} />
            ) : (
              <FaMars className={fragrance.gender} />
            )}
          </span>
        </h4>

        <h4
          className="house"
          onClick={() => toFragHouse(fragrance.fragranceHouse._id)}
        >
          {fragrance.fragranceHouse.name}
        </h4>
        <h5 onClick={() => handleShopping(fragrance.shoppingLink)}>Shop</h5>
      </div>
    </div>
  );
};

export default FragranceInfo;
