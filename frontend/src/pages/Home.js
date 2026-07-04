import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Home.css";

const Home = () => {
  const [fragrances, setFragrances] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFragrances = async () => {
      const response = await fetch(`/api/fragrances`);
      const json = await response.json();

      if (response.ok) {
        setFragrances(json);
      }
    };
    fetchFragrances();
  }, []);

  function onFragranceClick(id) {
    navigate(`/fragrance/${id}`);
  }
  function onFragranceHouseClick(id) {
    navigate(`/fragrance_house/${id}`);
  }
  console.log(fragrances);
  return (
    <div className="home">
      <div className="hero" />
      <div className="home-section">
        <h2 className="section-header">Most Popular</h2>
        <div className="home-container">
          {fragrances &&
            fragrances.slice(0, 3).map((fragrance) => (
              <div className="home-container-section" key={fragrance._id}>
                <img
                  src={fragrance.images[0]}
                  alt={fragrance.name}
                  onClick={() => onFragranceClick(fragrance._id)}
                />
                <h4 onClick={() => onFragranceClick(fragrance._id)}>
                  {fragrance.name}
                </h4>
                <p
                  onClick={() =>
                    onFragranceHouseClick(fragrance.fragranceHouse._id)
                  }
                >
                  {fragrance.fragranceHouse.name}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
