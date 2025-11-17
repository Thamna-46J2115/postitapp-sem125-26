import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getPosts, likePost } from "../Features/PostSlice";
import { Table } from "reactstrap";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const userId = useSelector((state) => state.users.user._id); // <-- FIXED
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleLikePost = (postId) => {
    const postData = {
      postId,
      userId,
    };

    dispatch(likePost(postData));
    navigate("/home");
  };

  return (
    <div className="postsContainer">
      <h1>Display Posts</h1>

      <Table className="table table-striped">
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.email}</td>

              <td>
                <p>{moment(post.createdAt).fromNow()}</p>

                {post.postMsg}

                {/* LIKE SECTION */}
                <p className="likes">
                  <a href="#" onClick={() => handleLikePost(post._id)}>
                    <FaThumbsUp />
                  </a>
                  ({post.likes?.count || 0})
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Posts;
