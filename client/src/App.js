import { Routes, Route } from "react-router-dom";
import "./App.css";
import VolunteerScreen from "./Components/Volunteer/VolunteerScreen";
import RequestHelp from "./Components/Victim/RequestHelp";
import { RequestProvider } from "./Contexts/RequestContext";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import VictimRegister from "./Components/Victim/VictimRegister";
import VictimLogin from "./Components/Victim/VictimLogin";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function App() {
  const { data: authData } = useQuery({
    queryKey: ["authData"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/me-victim"
        );
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch auth data");
      }
    },
  });

  console.log(authData);
  return (
    <div>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<VictimRegister />} path="/victimRegister" />
        <Route element={<VictimLogin />} path="/victimLogin" />
        <Route element={<VolunteerScreen />} path="/volunteer" />

        <Route
          element={
            <RequestProvider>
              <RequestHelp />
            </RequestProvider>
          }
          path="/victim-help"
        />
      </Routes>
    </div>
  );
}

export default App;
