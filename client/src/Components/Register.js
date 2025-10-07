import loginImage from "../Images/loginImage.jpg";
import { userSchemaValidation } from "../Validations/uservalidation";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import logo from "../Images/logo-t.png";
const Register = () => {
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
    </Container>
  );
};

export default Register;
