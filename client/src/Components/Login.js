import loginimage from "../Images/loginImage.jpg";
import "../App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Label,
  Container,
  Row,
  FormGroup,
  Input,
  Form,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Features/UserSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isError } = useSelector((state) => state.users);

  const handleLogin = () => {
    const userData = { email, password };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      // Optionally show an error message here
      console.log("Login failed");
    } else if (isSuccess) {
      navigate("/");
    }
  }, [isError, isSuccess, navigate]);

  return (
    <Container>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <Row>
          <Col md={3}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <Button type="submit">Login</Button>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <p className="smalltext">
              No Account? <Link to="/register">Sign Up now.</Link>
            </p>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
