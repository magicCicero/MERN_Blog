import "./Home.css";
import axios from "axios";

import Nav from "../../components/Nav/Nav";
import { PostsContext, AuthorsContext } from "../../context/Context";
import { useContext, useEffect } from "react";
import CreatePostImageForm from "../../components/CreatePostImageForm/CreatePostImageForm";
import PostList from "../../components/PostList/PostList";
const Home = () => {
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
  console.log(allAuthors);
  console.log(allPosts);
  return (
    <>
      <Nav />

      <CreatePostImageForm />
      <PostList />
    </>
  );
};

export default Home;
