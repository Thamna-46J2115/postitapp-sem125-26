import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import logo from "../Images/logo-t.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar className="header">
        <Nav>
          <NavItem>
            <img src={logo} />
          </NavItem>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/Login">Login</Link>
          </NavItem>

          <NavItem>
            <Link to="/profile">Profile</Link>
          </NavItem>

          <NavItem>
            <NavLink href="#">Logout</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
