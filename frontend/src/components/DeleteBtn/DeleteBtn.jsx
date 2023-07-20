import "./DeleteBtn.css";
import axios from "axios";
import { useContext } from "react";

import { PostsContext } from "../../context/Context";
const DeleteBtn = (props) => {
  const { allPosts, setAllPosts } = useContext(PostsContext);

  // Asynchrone Funktion für die Löschung einzelner Posts. Die Props enthält die entsprechende ID, die dem einzelnen Delete Button zugewiesen wird
  const deletePost = async () => {
    await axios.delete(`/api/deletePost/${props.postId}`);
    // Alle Posts aus AllContacts werden gefiltert und nach der jeweiligen ID gesucht. Anschließend wird der Kontakt gelöscht
    setAllPosts(allPosts.filter((post) => post._id !== props.postId));
  };
  return (
    <>
      <button onClick={deletePost}>Post löschen</button>
    </>
  );
};

export default DeleteBtn;
