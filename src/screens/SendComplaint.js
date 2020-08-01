import React, { useEffect, useState } from "react";

import "../App.css";
import Addcomplaint from "../components/Addcomplaints";
import NavBarTechnicien from "../components/NavBarTechnicien";

const Sendcomplaint = (props) => {
  return (
    <div>
      <NavBarTechnicien user={props.user} fct={props.handleLogout} />
      <Addcomplaint />
    </div>
  );
};
export default Sendcomplaint;
