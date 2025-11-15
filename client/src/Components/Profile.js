import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import user from "../Images/user.png";

const Profile = () => {
  const email = useSelector((state) => state.users.user.email);
  const name = useSelector((state) => state.users.user.name);

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);

  return (
    <div>
      <h1>Profile</h1>
      <img src={user} className="userImage" />
      <p>User Name :{name}</p>
      <p>Email :{email}</p>
    </div>
  );
};

export default Profile;
