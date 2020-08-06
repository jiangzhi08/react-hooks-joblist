import React, { Component, Fragment } from "react";
import { Navbar, Nav, NavItem } from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}` : ""} </strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="light" light expand="md">
          {/* <NavbarBrand href="/">Command List</NavbarBrand> */}
          <img
            style={{ width: "50px", margin: "0 50px 0 0" }}
            src={require("../images/zjlogo.png")}
            alt="logo"
          />
          {/* <NavbarToggler onClick={this.toggle} /> */}
          {/* <Collapse isOpen={this.state.isOpen} navbar> */}
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink href="#">Components</NavLink>
            </NavItem> */}
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
          {/* </Collapse> */}
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, null)(AppNavbar);
