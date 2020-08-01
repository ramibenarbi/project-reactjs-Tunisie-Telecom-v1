import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import NavBarAdmin from "../components/NavBarAdmin";
import DisplayStock from "../components/DisplayStock";
const FctAdmin = () => {
  return (
    <div>
      <NavBarAdmin />

      <DisplayStock />
    </div>
  );
};

export default FctAdmin;
