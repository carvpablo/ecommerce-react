import { Link } from "react-router";

export default function NavBar() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/auth">Sign in</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
