import { useNavigate } from "react-router-dom";
import "../styles/Fragrance.css";

const FragranceInfo = (props) => {
  const { fragrance } = props;
  const navigate = useNavigate();

  console.log(fragrance);

  const toFragHouse = (id) => {
    navigate(`/fragrance_house/${id}`);
  };

  return (
    <div className="info_section">
      <div className="image">
        <img src={fragrance.images[0]} alt={fragrance.name} />
      </div>
      <div className="details">
        <h3>{fragrance.name}</h3>
        <h4
          className="house"
          onClick={() => toFragHouse(fragrance.fragranceHouse._id)}
        >
          {fragrance.fragranceHouse.name}
        </h4>
      </div>
    </div>
  );
};

export default FragranceInfo;
