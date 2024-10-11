import { Routes, Route } from "react-router-dom";
import "./App.css";
import VolunteerScreen from "./Components/Volunteer/VolunteerScreen";
import RequestHelp from "./Components/Victim/RequestHelp";
import { RequestProvider } from "./Contexts/RequestContext";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import VictimRegister from "./Components/Victim/VictimRegister";
import VictimLogin from "./Components/Victim/VictimLogin";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<VictimRegister/> } path = "/victimRegister"/>
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
