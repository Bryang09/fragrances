import "../styles/Nav.css";

const { Link, useNavigate } = require("react-router-dom");

const Nav = () => {
  const navigate = useNavigate();

  const navigationHandler = (to) => {
    navigate(`${to}`);
  };
  return (
    <nav className="nav">
      <div className="logo">
        <h3 onClick={() => navigationHandler("/")}>Fragrance</h3>
      </div>

      <div className="links">
        <ul>
          <li onClick={() => navigationHandler("authorized")}>Add Fragrance</li>
          <li onClick={() => navigationHandler("edit")}>Edit Fragrances</li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
