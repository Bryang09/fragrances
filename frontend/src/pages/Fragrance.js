import { useEffect, useState } from "react";
import "../styles/Fragrance.css";

import { useNavigate, useParams } from "react-router-dom";
import FragranceInfo from "../components/FragranceInfo";
import DupeList from "../components/DupeList";

const Fragrance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fragrance, setFragrance] = useState(null);
  const [houseFragrances, setHouseFragrances] = useState(null);

  useEffect(() => {
    const getFragrance = async () => {
      try {
        const response = await fetch(`/api/fragrances/${id}`);
        const json = await response.json();

        const res = await fetch(
          `${process.env.REACT_APP_URI}/fragrance_house/${json.fragranceHouse._id}`
        );
        const js = await res.json();
        setHouseFragrances(js);

        if (response.ok) {
          setFragrance(json);
        }
        if (response.status === 404) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFragrance();
  }, [id]);

  return (
    <div className="fragrance_page">
      {fragrance && (
        <>
          <div className="info_header">
            <FragranceInfo fragrance={fragrance} />
          </div>
          {fragrance?.dupes.length > 0 && (
            <div>
              <DupeList fragrance={fragrance} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Fragrance;
