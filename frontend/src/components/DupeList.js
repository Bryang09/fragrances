import { useNavigate } from "react-router-dom";

const DupeList = (props) => {
  const navigate = useNavigate();
  const { fragrance } = props;

  console.log(fragrance);

  const handleClick = (id) => {
    navigate(`/fragrance/${id}`);
  };

  return (
    <div className="dupeList">
      <h4>Dupes Of {fragrance.name}</h4>
      <div className="fragrances">
        {fragrance.dupes.map((f) => {
          return (
            <div className="fragrance" key={f._id}>
              <img
                src={f.images[0]}
                alt={f.name}
                onClick={() => handleClick(f._id)}
              />
              <h4 onClick={() => handleClick(f._id)}>{f.name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DupeList;
