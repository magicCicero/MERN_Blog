import "./Home.css";
import axios from "axios";

import Nav from "../../components/Nav/Nav";
import { PostsContext, AuthorsContext } from "../../context/Context";
import { useContext, useEffect, useState } from "react";
import CreatePostImageForm from "../../components/CreatePostImageForm/CreatePostImageForm";
import PostList from "../../components/PostList/PostList";
const Home = () => {
  const { allPosts, setAllPosts } = useContext(PostsContext);
  const { allAuthors, setAllAuthors } = useContext(AuthorsContext);

  // Erster PostFetch aus der DB
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/posts");
      setAllPosts(data);
    };
    fetchData();
  }, [refresh]);
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
      <CreatePostImageForm setRefresh={setRefresh} />
      <PostList />
    </>
  );
};

export default Home;
