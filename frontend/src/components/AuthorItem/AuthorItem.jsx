import { useContext, useState, useEffect } from "react";
import { PostsContext, AuthorsContext } from "../../context/Context";
import "./AuthorItem.css";
import DetailBtn from "../DetailBtn/DetailBtn";
import DeleteBtn from "../DeleteBtn/DeleteBtn";

const AuthorItem = () => {
  const { allAuthors, setAllAuthors } = useContext(AuthorsContext);

  return (
    <>
      {allAuthors?.map((author) => (
        <article key={author._id} className="author-item">
          {/* <img src={author.image?.url} alt="" /> */}
          <h2>{author.name}</h2>
          <p>{author.email}</p>
          <div className="btn-container"></div>
        </article>
      ))}
    </>
  );
};

export default AuthorItem;
