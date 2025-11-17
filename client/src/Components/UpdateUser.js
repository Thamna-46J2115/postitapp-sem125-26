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
import { addUser, deleteUser, updateUser } from "../Features/UserSlice";
import { useParams } from "react-router-dom";

//For form validation using react-hook-form

const UpdateUser = () => {
  const userList = useSelector((state) => state.users.value);

  const { user_email, user_name, user_password } = useParams();
  //Declare your state variables
  const [name, setname] = useState(user_name);
  const [email, setemail] = useState(user_email);
  const [password, setpassword] = useState(user_password);
  const [confirmPassword, setconfirmPassword] = useState(user_password);

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

  const handleUpdate = () => {
    const userData = {
      name: name, //create an object with the values from the state variables
      email: email,
      password: password,
    };
    dispatch(updateUser(userData)); //use the useDispatch hook to dispatch an action, passing as parameter the userData
  };

  return (
    <Container fluid>
      <Form className="div-form" onSubmit={handleSubmit(handleUpdate)}>
        <h1>Update User</h1>
        <Row>
          <Col md={6}>
            Name<br></br>
            <input
              type="text"
              name="name"
              value={name}
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
              value={email}
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
              value={password}
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
              value={confirmPassword}
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
            <Button>UpdateUser</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UpdateUser;
