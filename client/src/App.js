import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Users from "./modules/Users/Users";
import Dashboard from "./modules/Dashboard/Dashboard";
import Missing from "./modules/Shared/Missing";
import Login from "./modules/Auth/Login";
import Home from "./modules/Home/Home";
import RequireAuth from "./modules/Shared/RequireAuth";
import Profile from "./modules/Auth/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="users/*" element={<Users />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
