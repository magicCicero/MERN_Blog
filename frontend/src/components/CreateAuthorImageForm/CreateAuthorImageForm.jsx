import "./CreateAuthorImageForm.css";
import axios from "axios";

const CreateAuthorImageForm = ({ setRefresh }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataAuthor = new FormData(e.target);
    const authorData = {};

    formDataAuthor.forEach((value, key) => {
      authorData[key] = value;
    });

    try {
      const response = await axios.post("/api/newAuthor", authorData);
      setRefresh((prev) => !prev);
      console.log(response);
      e.target.reset();
    } catch (error) {
      console.error("Error while submitting the form:", error.message);
    }
  };

  return (
    <>
      <h2>Neuen Author erstellen</h2>
      <form onSubmit={handleSubmit} className="create-author-form-container">
        <input type="text" placeholder="Name" name="name" required />
        <input type="text" placeholder="Email" name="email" required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateAuthorImageForm;
