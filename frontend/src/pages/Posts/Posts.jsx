import "./Posts.css";
import Nav from "../../components/Nav/Nav";
import PostList from "../../components/PostList/PostList";
import { useContext, useEffect } from "react";
import { PostsContext, AuthorsContext } from "../../context/Context";
import axios from "axios";
const Posts = () => {
  const { allPosts, setAllPosts } = useContext(PostsContext);
  const { allAuthors, setAllAuthors } = useContext(AuthorsContext);
  // Erster PostFetch aus der DB
  useEffect(() => {
    axios.get("/api/posts").then((res) => {
      setAllPosts(res.data);
    });
  }, []);
  // Erster AuthorFetch aus der DB
  useEffect(() => {
    axios.get("/api/authors").then((res) => {
      setAllAuthors(res.data);
    });
  }, []);
  return (
    <>
      <Nav />
      <h1>Posts</h1>
      <PostList />
    </>
  );
};

export default Posts;
