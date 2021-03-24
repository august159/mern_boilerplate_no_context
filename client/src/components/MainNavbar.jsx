import React from "react";
import api from "../api";
import logo from "../logo.svg";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router";

function MainNavbar(props) {
  function handleLogoutClick(e) {
    api.logout();
  }

  return (
    <nav className="App-header navbar navbar-expand-lg">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <NavLink className="navbar-brand" to="/">
        <h1 className="App-title">MERN Street art</h1>
      </NavLink>
      <NavLink className="nav-link" to="/list">
        List
      </NavLink>
      <NavLink className="nav-link" to="/map">
        Map
      </NavLink>
      <NavLink className="nav-link" to="/new-street-art">
        New street art
      </NavLink>
      <NavLink className="nav-link" to="/signup">
        Signup
      </NavLink>
      <NavLink className="nav-link" to="/login">
        Login
      </NavLink>
      <Link className="nav-link" to="/" onClick={handleLogoutClick}>
        Logout
      </Link>

      <NavLink to="/secret">Secret</NavLink>
    </nav>
  );
}

export default withRouter(MainNavbar);
