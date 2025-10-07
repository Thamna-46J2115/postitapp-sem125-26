import loginImage from "../Images/loginImage.jpg";
import { userSchemaValidation } from "../Validations/uservalidation";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useSelector } from "react-redux";
import { Button, Col, Container, Row } from "reactstrap";
import logo from "../Images/logo-t.png";
const Register = () => {
  const userList = useSelector((state) => state.users.value);
  //For form validation using react-hook-form
  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data", data); // You can handle the form submission here

    alert("Validation all good.");
  };
  return (
    <Container fluid>
      <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            Name<br></br>
            <input type="text" name="name" {...register("name")}></input>
          </Col>
          <p className="error">{errors.name?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Email<br></br>
            <input type="email" name="email" {...register("email")}></input>
          </Col>
          <p className="error">{errors.email?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Password<br></br>
            <input
              type="password"
              name="password"
              {...register("password")}
            ></input>
          </Col>
          <p className="error">{errors.password?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            Confirm Password<br></br>
            <input
              type="password"
              name="confirmpassword"
              {...register("confirmPassword")}
            ></input>
          </Col>
          <p className="error">{errors.confirmPassword?.message}</p>
        </Row>
        <Row>
          <Col md={6}>
            <Button>Register</Button>
          </Col>
        </Row>
      </form>
      <Row>
        <Col md={6}>
          <h2>list of Users</h2>
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
                    <Button color="danger">delete</Button>{" "}
                    <Button color="success">update</Button>
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
