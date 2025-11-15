import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userImage from "../Images/user.png";
import { updateUserProfile } from "../Features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);

  // Local state
  const [userName, setUserName] = useState(user.name);
  const [pwd, setPwd] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  // File upload handler
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return alert("No file uploaded");
    setProfilePic(file);
  };

  // Form submit handler
  const handleUpdate = (event) => {
    event.preventDefault();

    const userData = {
      email: user.email,
      name: userName,
      password: pwd,
      profilePic: profilePic,
    };

    console.log("Updated User:", userData);

    dispatch(updateUserProfile(userData));

    alert("Profile Updated.");
    navigate("/profile");
  };

  useEffect(() => {
    if (!user.email) navigate("/login");
  }, [user.email]);

  return (
    <Container fluid>
      <h1>Profile</h1>

      <Row>
        <Col md={2}>
          <img
            src={profilePic || userImage}
            alt="profile"
            width="120"
            style={{ borderRadius: "50%" }}
          />
        </Col>

        <Col md={5}>
          <h4>Update Profile</h4>

          <Form onSubmit={handleUpdate}>
            <FormGroup>
              <Label>Profile Picture</Label>
              <Input type="file" onChange={handleFileChange} />
            </FormGroup>

            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Email (Read Only)</Label>
              <Input type="email" value={user.email} readOnly />
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>

            <Button color="primary">Update Profile</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
