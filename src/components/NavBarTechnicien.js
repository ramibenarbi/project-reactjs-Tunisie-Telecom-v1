import React, { useEffect } from "react";
import firebase from "../config/Firebase";
import * as service from "../services/Authservices";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Navbar,
  Nav,
  Form,
  FormControl,
  NavItem,
  NavDropdown,
  MenuItem,
} from "react-bootstrap";
const NavBarTechnicien = (props) => {
  const history = useHistory();
  const gbutton = (props) => {
    service.signout(history);
  };
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand id="red" href="https://www.tunisietelecom.tn/Fr">
        Tunisie Telecom
      </Navbar.Brand>
      <Navbar.Brand>
        <img
          src={require("../assets/logo.png")}
          width="50"
          height="40"
          className="d-inline-block align-top"
          alt=""
        />
      </Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Form inline>
        <Nav.Link>{firebase.auth().currentUser.email}</Nav.Link>

        <Button onClick={gbutton} variant="outline-primary">
          Se déconnecter
        </Button>
      </Form>
    </Navbar>
  );
};
export default NavBarTechnicien;
