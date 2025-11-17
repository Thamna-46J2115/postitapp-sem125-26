import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import logo from "../Images/logo-t.png";
import { logout } from "../Features/UserSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = async () => {
    dispatch(logout());
    //ensure that the state update from the logout action has been processed before proceeding to the next step.
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/"); //redirect to login page route.
  };

  return (
    <div>
      <Navbar className="header">
        <Nav>
          <NavItem>
            <img src={logo} />
          </NavItem>
          <NavItem>
            <NavLink active href="#">
              <Link to="/">Home</Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink>
              <Link to="/profile">Profile </Link>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#">
              <Link onClick={handlelogout}>Logout</Link>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
