import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import NavBarAdmin from "../components/NavBarAdmin";
import AddcomplaintAdmin from "../components/AddcomplaintsAdmin";
const SendcomplaintAdmin = () => {
  return (
    <div>
      <NavBarAdmin />

      <AddcomplaintAdmin />
    </div>
  );
};

export default SendcomplaintAdmin;
