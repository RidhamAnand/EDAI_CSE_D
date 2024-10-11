import { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import url from "../../apiConfig";
import { useNavigate } from "react-router";

const VictimRegister = () => {

    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    

    try {
   const respone =   await axios.post( url+ "auth/register-victim", {name: formData.fullName,email: formData.email, password: formData.password,phone: formData.phoneNumber});
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: ""
      });

      console.log(respone.data.message)
      navigate("/victim-help")

    } 
    catch (error) {
      console.error("Registration failed",error.response?.data?.error);
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
      <div className="flex flex-col bg-[#F7EFF6] shadow-md w-3/5 h-3/5 gap-6 justify-center p-6 rounded-md">
        <TextField
          size="small"
          type="text"
          label="Full Name"
          variant="outlined"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
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
        <TextField
          size="small"
          type="number"
          label="Phone Number"
          variant="outlined"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <Button
          sx={{ backgroundColor: "#4452D9", color: "white" }}
          fullWidth
          disableElevation
          size="small"
          variant="contained"
          onClick={handleSubmit}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default VictimRegister;
