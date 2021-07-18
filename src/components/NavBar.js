import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="sm" style={{ paddingLeft: 25 }}>
      <Navbar.Brand href="/">CONTROLE BANCÁRIO</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/deposit">Depósito</Nav.Link>
          <Nav.Link href="/draft">Saque</Nav.Link>
          <Nav.Link href="/payment">Pagamento</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
