import { NavLink } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <h1>ASK.ZK</h1>
      <NavLink className="link" to="/create-survey">
        Create
      </NavLink>
      <NavLink className="link" to="/results">
        View results
      </NavLink>
      <NavLink className="link" to="/fill-survey">
        Fill out a survey
      </NavLink>
    </div>
  );
};

export default Home;
