import { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import url from "../../apiConfig";
import { useNavigate } from "react-router";

const VictimLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) || formData.password.length < 6) return;

    try {
      const response = await axios.post(url+"auth/login-victim", {
        email: formData.email,
        password: formData.password
      });

      console.log("Login successful:", response.data.victim);
      setFormData({ email: "", password: "" });
      console.log(response.data)
      localStorage.setItem("victimLoginEmail",response.data.victim.email)
      navigate("/victim-help")
    } catch (error) {
      console.error("Login failed", error.response && error.response.data && error.response.data.error || error.message);
    }
  };

  return (
    <div
      style={{
        background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        width: "100%",
        height: "100vh"
      }}
      className="w-full h-screen flex justify-center items-center"
    >
      <div className="flex flex-col bg-[#F7EFF6] shadow-md w-3/5 h-2/5 gap-6 justify-center p-6 rounded-md">
        <TextField
          size="small"
          type="email"
          label="Email Address"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          size="small"
          type="password"
          label="Password"
          variant="outlined"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          sx={{ backgroundColor: "#4452D9", color: "white" }}
          fullWidth
          disableElevation
          size="small"
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default VictimLogin;
