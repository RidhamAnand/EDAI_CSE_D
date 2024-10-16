import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import VolunteerScreen from "./Components/Volunteer/VolunteerScreen";
import RequestHelp from "./Components/Victim/RequestHelp";
import { RequestProvider } from "./Contexts/RequestContext";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import { useQuery } from "@tanstack/react-query";
import Home from "./Components/Home/Home";

const Victimhelp = () => (
  <RequestProvider>
    <RequestHelp />
  </RequestProvider>
);

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: victimUser } = useQuery({
    queryKey: ["victimUser"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me-victim", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) throw new Error(data.error || "something went wrong");
        return data;
      } catch (error) {
        throw new Error("Failed to fetch auth data");
      }
    },
    retry: false,
  });

  const { data: volunteerUser } = useQuery({
    queryKey: ["volunteerUser"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me-volunteer", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) throw new Error(data.error || "something went wrong");
        return data;
      } catch (error) {
        throw new Error("Failed to fetch auth data");
      }
    },
    retry: false,
  });

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            !victimUser && !volunteerUser ? (
              <Login />
            ) : victimUser ? (
              <Navigate to="/victim-help" />
            ) : (
              <Navigate to="/volunteer" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !victimUser && !volunteerUser ? (
              <Register />
            ) : victimUser ? (
              <Navigate to="/victim-help" />
            ) : (
              <Navigate to="/volunteer" />
            )
          }
        />
        <Route
          path="/volunteer"
          element={
            volunteerUser ? <VolunteerScreen /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/victim-help"
          element={
            victimUser ? <Victimhelp /> : <Navigate to="/login?role=victim" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
