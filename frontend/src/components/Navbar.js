import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  return (
    <nav style={navbarStyle}>
      <Link to="/">
        <div style={leftSide}>ContactBuddy</div>
      </Link>

      {user ? (
        <div style={rightSide}>
          <Link to="/">
            <button style={{ ...buttonStyle, marginRight: "10px" }}>
              All Contacts
            </button>
          </Link>

          <button
            style={{ ...buttonStyle, marginRight: "10px" }}
            onClick={() => {
              navigate("/create");
            }}
          >
            Create
          </button>

          <button
            style={buttonStyle}
            onClick={() => {
              setUser(null);
              localStorage.clear();
              toast.success("Logout success");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div style={rightSide}>
          <Link to="/login">
            <button style={buttonStyle}>Login</button>
          </Link>

          <Link to="/register">
            <button style={{ ...buttonStyle, marginLeft: "10px" }}>
              Register
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  background: "rgb(65, 252, 8)",
};

const leftSide = {
  fontWeight: "bold",
  color: "red",
  fontSize: "30px",
  marginLeft: "20px",
};

const rightSide = {
  display: "flex",
  alignItems: "center",
  marginRight: "10px",
};

const buttonStyle = {
  marginLeft: "10px",
};

export default Navbar;
