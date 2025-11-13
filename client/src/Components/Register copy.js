import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
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

import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser } from "../Features/UserSlice";
import { Link } from "react-router-dom";

//For form validation using react-hook-form

const Register = () => {
  const userList = useSelector((state) => state.users.value);

  //Declare your state variables
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const {
    register,

    handleSubmit, // Submit the form when this is called

    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  // Handle form submission
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    try {
      console.log("Form Data", data);
      alert("Validation all good."); // You can handle the form submission here
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      dispatch(addUser(userData));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (email) => {
    try {
      dispatch(deleteUser(email));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container fluid>
      <Form className="div-form" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            Name<br></br>
            <input
              type="text"
              name="name"
              {...register("name", {
                value: name,
                onChange: (e) => setname(e.target.value),
              })}
            ></input>
            {name}
          </Col>
          <p className="error">{errors.name?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Email<br></br>
            <input
              type="email"
              name="email"
              {...register("email", {
                value: email,
                onChange: (e) => setemail(e.target.value),
              })}
            ></input>
            {email}
          </Col>
          <p className="error">{errors.email?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Password<br></br>
            <input
              type="password"
              name="password"
              {...register("password", {
                value: password,
                onChange: (e) => setpassword(e.target.value),
              })}
            ></input>
            {password}
          </Col>
          <p className="error">{errors.password?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Confirm Password<br></br>
            <input
              type="password"
              name="confirmpassword"
              {...register("confirmPassword", {
                value: confirmPassword,
                onChange: (e) => setconfirmPassword(e.target.value),
              })}
            ></input>
            {confirmPassword}
          </Col>
          <p className="error">{errors.confirmPassword?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            <Button>Register</Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col md={6}>
          <h2>List of Users</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.password}</td>
                  <td>
                    <Link
                      to={`/update/${user.email}/${user.name}/${user.password}`}
                    >
                      <Button color="primary">Update User</Button>
                    </Link>{" "}
                    <Button
                      color="danger"
                      onClick={() => handleDelete(user.email)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
