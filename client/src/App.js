import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import VolunteerScreen from "./Components/Volunteer/VolunteerScreen";
import RequestHelp from "./Components/Victim/RequestHelp";
import { RequestProvider } from "./Contexts/RequestContext";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import VictimRegister from "./Components/Victim/VictimRegister";
import VictimLogin from "./Components/Victim/VictimLogin";
import { useQuery } from "@tanstack/react-query";
import Home from "./Components/Home/Home";

const Victimhelp = () => (
  <RequestProvider>
    <RequestHelp />
  </RequestProvider>
);

function App() {
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
          element={!victimUser ? <Login /> : <Navigate to="/victim-help" />}
          path="/login"
        />
        <Route
          element={!victimUser ? <Register /> : <Navigate to="/victim-help" />}
          path="/register"
        />

        <Route
          element={!volunteerUser ? <Login /> : <Navigate to="/volunteer" />}
          path="/volunteer-login"
        />
        <Route
          element={!volunteerUser ? <Register /> : <Navigate to="/volunteer" />}
          path="/volunteer-register"
        />

        <Route
          element={
            volunteerUser ? <VolunteerScreen /> : <Navigate to="/login" />
          }
          path="/volunteer"
        />

        <Route
          element={
            !victimUser && volunteerUser ? (
              <Navigate to="/volunteer" />
            ) : (
              <Navigate to="/victim-help" />
            )
          }
          path="/volunteer"
        />

        <Route
          element={victimUser ? <Victimhelp /> : <Navigate to="/login" />}
          path="/victim-help"
        />
      </Routes>
    </div>
  );
}

export default App;
