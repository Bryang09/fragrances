import { useEffect, useState } from "react";
import "../styles/Fragrance.css";

import { useNavigate, useParams } from "react-router-dom";
import FragranceInfo from "../components/FragranceInfo";

const Fragrance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const [fragrance, setFragrance] = useState(null);

  useEffect(() => {
    const getFragrance = async () => {
      const response = await fetch(`/api/fragrances/${id}`);
      const json = await response.json();

      if (response.status === 404) {
        navigate("/");
      }
      if (response.ok) {
        setFragrance(json);
      }
    };
    getFragrance();
  }, []);

  return (
    <div className="fragrance_page">
      {fragrance && (
        <div className="info-header">
          <FragranceInfo fragrance={fragrance} />
        </div>
      )}
    </div>
  );
};

export default Fragrance;
