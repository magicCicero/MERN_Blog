import axios from "axios";
import { useState, useEffect, useContext } from "react";
import "./UpdatePost.css";

const UpdatePost = ({ postData, setRefresh, postId, refresh }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(postData.title);
  const [content, setContent] = useState(postData.content);

  const startUpdating = async () => {
    try {
      // Sende die aktualisierten Daten an die API, die aus den Inputfeldern stammen. Damit wird die Datenbank im Backend aktualisiert.
      await axios.put(`/api/updatePost/${postId}`, {
        title: title,
        content: content,
      });

      // Beende den Bearbeitungsmodus nach dem Speichern.
      setIsEditing(false);

      // Setze den "refresh"-Zustand in der Elternkomponente (PostDetails) zurück, um den useEffect auszulösen und die Daten neu zu laden.

      setRefresh(!refresh);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (isEditing) {
    // Ist der Bearbeitungsmodus aktiviert ändert sich das Aussehen der Komponente
    return (
      <>
        <div className="update-post-form-container">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Bitte gebe den neuen Titel ein"
          />
          <textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="Bitte gebe den neuen Content ein"
          />

          <button onClick={startUpdating}>Änderungen speichern</button>
          <button onClick={() => setIsEditing(false)}>Abbrechen</button>
        </div>
      </>
    );
  } else {
    // Im Anzeigemodus, der standardgemäß geladen wird, wenn die JSX Komponente geladen wurde
    return (
      <>
        <button onClick={() => setIsEditing(true)}>Bearbeiten</button>
      </>
    );
  }
};

export default UpdatePost;
