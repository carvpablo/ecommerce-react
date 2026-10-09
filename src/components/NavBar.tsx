import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function NavBar() {
  const { isLogged, handleLogin } = useAuth();

  async function handleSubmit() {
    try {
      await axios.post("http://localhost:3000/auth/logout");
      handleLogin();
    } catch (err) {
      console.error(err);
    }
  }

  let buttons = (
    <ul>
      <li>
        <Link to="/signin">Sign in</Link>
      </li>
      <li>
        <Link to="/login">Log in</Link>
      </li>
    </ul>
  );

  if (isLogged) {
    buttons = (
      <div>
        <Link to="/cart">Cart</Link>
        <button onClick={handleSubmit}>Log out</button>
      </div>
    );
  }

  return (
    <header>
      <nav>
        {isLogged && <p>User logged</p>}
        <Link to="/">Home</Link>
        {buttons}
      </nav>
    </header>
  );
}
