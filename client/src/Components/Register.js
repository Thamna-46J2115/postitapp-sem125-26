import loginImage from "../Images/loginImage.jpg";
import { userSchemaValidation } from "../Validations/uservalidation";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import logo from "../Images/logo-t.png";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";
import { addUser, deleteUser } from "../Features/UserSlice";
import { useSelector, useDispatch } from "react-redux";
const Register = () => {
  const userList = useSelector((state) => state.users.value);

  //Create the state variables

  const [name, setname] = useState("");

  const [email, setemail] = useState("");

  const [password, setpassword] = useState("");

  const [confirmPassword, setconfirmPassword] = useState("");
  //For form validation using react-hook-form
  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });
  const handleDelete = (email) => {
    dispatch(deleteUser(email));
  };
  const dispatch = useDispatch();
  // Handle form submission
  const onSubmit = (data) => {
    try {
      // You can handle the form submission here

      const userData = {
        name: data.name,

        email: data.email,

        password: data.password,
      };

      console.log("Form Data", data);

      alert("Validation all good.");

      dispatch(addUser(userData)); //use the useDispatch hook to dispatch an action, passing as parameter the userData
    } catch (error) {
      console.log("Error.");
    }
  };
  return (
    <Container fluid>
      <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            Name<br></br>
            <input
              type="text"
              name="name"
              {...register("name", {
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
                onChange: (e) => setname(e.target.value),
              })}
            ></input>
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
                onChange: (e) => setname(e.target.value),
              })}
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
              {...register("confirmPassword", {
                onChange: (e) => setname(e.target.value),
              })}
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
                    <Button onClick={() => handleDelete(user.email)}>
                      Delete User
                    </Button>
                    <Button color="danger">
                      {" "}
                      <FaTrash />
                    </Button>{" "}
                    <Button color="success">
                      <FaEdit />
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
