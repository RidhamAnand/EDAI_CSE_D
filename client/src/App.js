import { Routes, Route } from "react-router-dom";
import "./App.css";
import VolunteerScreen from "./Components/Volunteer/VolunteerScreen";
import RequestHelp from "./Components/Victim/RequestHelp";
import { RequestProvider } from "./Contexts/RequestContext";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
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
