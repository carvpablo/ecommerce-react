import "./App.css";
import { Outlet } from "react-router";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default App;
