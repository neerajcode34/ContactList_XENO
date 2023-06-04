import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AllContact from "./AllContact";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div>
      <h3 style={{ fontSize: "45px" }}>Welcome {user ? user.name : null}</h3>
      <hr style={{ borderTop: "1px solid lightgray" }} />
      <AllContact />
    </div>
  );
};
export default Home;

