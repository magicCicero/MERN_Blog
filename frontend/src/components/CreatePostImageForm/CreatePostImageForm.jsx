import axios from "axios";
import "./CreatePostImageForm.css";
const CreatePostImageForm = ({ setRefresh }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const response = await axios.post("/api/addPost", formData);
    setRefresh((prev) => !prev);
    console.log(response);
    e.target.reset();
  };
  return (
    <>
      <h2>Neuen Blogbeitrag erstellen</h2>

      <form onSubmit={handleSubmit} className="create-post-form-container">
        <input type="text" placeholder="Title" name="title" required />
        <textarea
          rows="4"
          cols="50"
          placeholder="Content"
          name="content"
          required
        />
        <input
          type="text"
          placeholder="Author"
          name="author"
          value="64b7f5d753c825d5800e4eb2"
          required
        />
        <input type="file" placeholder="Image" name="image" required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreatePostImageForm;
