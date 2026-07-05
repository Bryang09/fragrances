const { Link } = require("react-router-dom");

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/">
        <h3>Fragrance</h3>
      </Link>
      <Link to="/authorized">
        <h3>Add Fragrance</h3>
      </Link>
    </div>
  );
};

export default Nav;
