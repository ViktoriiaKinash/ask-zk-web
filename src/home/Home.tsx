import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <NavLink style={{ color: "red" }} to="/login">
        Create
      </NavLink>

      <NavLink style={{ color: "red" }} to="/results">
        View results
      </NavLink>
    </div>
  );
};

export default Home;
