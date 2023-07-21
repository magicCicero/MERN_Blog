import "./Authors.css";
import Nav from "../../components/Nav/Nav";
import CreateAuthorImageForm from "../../components/CreateAuthorImageForm/CreateAuthorImageForm";
import { useState, useEffect, useContext } from "react";
import { AuthorsContext } from "../../context/Context";

import axios from "axios";
import AuthorsList from "../../components/AuthorsList/AuthorsList";
const Authors = () => {
  const [refresh, setRefresh] = useState(true);
  const [allAuthors, setAllAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/posts");
      setAllAuthors(data);
    };
    fetchData();
  }, [refresh]);
  return (
    <>
      <Nav />
      <CreateAuthorImageForm />
      <AuthorsList />
    </>
  );
};

export default Authors;
