import loginimage from "../Images/loginImage.jpg";
import "../App.css";
import { Link } from "react-router-dom";
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
const Login = () => {
  return (
    <div>
      <Container>
        <Form>
          <Row>
            <Col md={3}>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Email
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="email"
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <FormGroup row>
                <Label for="examplePassword" sm={2}>
                  Password
                </Label>
                <Col sm={10}>
                  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="password placeholder"
                    type="password"
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3}></Col>
          </Row>
          <Row>
            <Col md={3}>
              <p className="smalltext">
                No Account? <Link to="/Register">Sign Up now.</Link>
              </p>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
