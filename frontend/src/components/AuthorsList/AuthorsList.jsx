import AuthorItem from "../AuthorItem/AuthorItem";
import "./AuthorsList.css";
const AuthorsList = () => {
  return (
    <>
      <h1>Alle Autoren</h1>
      <section className="authors-list-container">
        <AuthorItem />
      </section>
    </>
  );
};

export default AuthorsList;
