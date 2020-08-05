import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function NavbarZJ() {
  return (
    <React.Fragment>
      {/* <img src={require("../images/zjlogo.png")} /> */}
      <Navbar bg="primary" variant="dark" expand="lg">
        {/* <Navbar.Brand href="/">ZJ-Space</Navbar.Brand> */}
        <Navbar.Brand>ZJ-Space</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/GitHubJobList">GitHubJobs</Nav.Link>
            <Nav.Link href="/News">News</Nav.Link>
            <Nav.Link href="/COVID">COVID</Nav.Link>
            <Nav.Link href="/Weather">Weather</Nav.Link>
            <Nav.Link href="/Movies">Movies</Nav.Link>
            <Nav.Link href="/Jokes">Jokes</Nav.Link>
            <Nav.Link href="/QRCode">QRCode</Nav.Link>
            <NavDropdown title="Recipes" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Recipes/Mediterranean">
                Mediterranean
              </NavDropdown.Item>
              <NavDropdown.Item href="/Recipes/Caribbean">
                Caribbean
              </NavDropdown.Item>
              <NavDropdown.Item href="/Recipes/Italian">
                Italian
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item href="/Recipes/Japanese">
                Japanese
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
}
