import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginVictim, loginVolunteer } from "../../Api/api";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let role = searchParams.get("role");
  if (!role || (role !== "volunteer" && role !== "victim")) role = "volunteer";

  const mutationFn = role === "volunteer" ? loginVolunteer : loginVictim;

  const { mutate, isLoading, error } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      //   console.log("Success:", data);
      {
        role === "volunteer"
          ? navigate("/volunteer")
          : navigate("/victim-help");
      }
    },
    onError: (error) => {
      console.error("Error:", error.message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    const payload = {
      email: email.value,
      password: password.value,
    };
    mutate(payload);
  };

  return (
    <div
      style={{
        background:
          "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        width: "100%",
        height: "100vh",
      }}
      className="min-h-screen flex"
    >
      <div className="w-1/2 flex flex-col justify-center items-center ">
        <div className="w-[75%] h-[95%] bg-slate-200 rounded-3xl p-28 shadow-2xl flex flex-col justify-center ">
          <div className="text-blue-900 text-3xl mb-8 font-bold ">
            Log-In As {role === "victim" ? "Victim" : "Volunteer"}
          </div>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="gap-5"
          >
            <Typography variant="h4" component="h1" gutterBottom></Typography>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            {error && <Typography color="error">{error.message}</Typography>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Box>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="h-[95%] w-[75%] bg-blue-900 rounded-3xl flex flex-col justify-center items-center">
          <div className="h-1/2 p-12 gap-5">
            <h2 className="text-white text-4xl mb-4 font-bold font-montserrat ">
              <i>
                {role === "volunteer"
                  ? "Be the Reason Behind One's Smile"
                  : "A Helping Hand is Just a Click Away"}
              </i>
            </h2>
            <div className="mt-10">
              <i className="text-white text-lg ">
                {role === "volunteer"
                  ? "Welcome back, hero— Log in to continue supporting those in need and make an impact in your community."
                  : "Need help? Sign up to connect with volunteers ready to assist you in this challenging time. We're here for you."}
              </i>
            </div>
          </div>
          <div className="h-1/2 p-4">
            <img src="./image.png" alt="image" className="rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
