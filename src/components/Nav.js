import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/Signup");
  };

  return (
    <div>
      <ul className="Nav-ul">
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/add">Add Products</Link>
        </li>
        <li>
          <Link to="/update">update Products</Link>
        </li>
        <li>
          <Link to="/profile">profile</Link>
        </li>
        <li>
          {auth ? (
            <Link   onClick={logout} to="/Signup ">
              Log out
            </Link>
          ) : (
            <Link to="/Signup ">Signup</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Nav;
