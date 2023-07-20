import "./PostDetails.css";
import Nav from "../../components/Nav/Nav";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteBtn from "../../components/DeleteBtn/DeleteBtn";
import UpdatePost from "../../components/UpdatePost/UpdatePost";
const PostDetails = () => {
  const params = useParams();
  const idPost = params.id;
  const [post, setPost] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/post/${idPost}`);
      setPost(data);
    };
    fetchData();
  }, [refresh]);

  return (
    <>
      <Nav />
      <h1>Details</h1>
      <img src={post.image?.url} alt="" />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.author}</p>

      <DeleteBtn postId={idPost} />
      <UpdatePost
        postId={idPost}
        setRefresh={setRefresh}
        postData={post}
        refresh={refresh}
      />
    </>
  );
};

export default PostDetails;
