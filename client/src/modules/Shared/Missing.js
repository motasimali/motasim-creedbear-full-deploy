import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <article className="App-header" style={{ padding: "100px" }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className="flexGrow">
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </article>
  );
};

export default Missing;
