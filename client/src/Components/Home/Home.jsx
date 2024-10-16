import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
      {/* Left Box: Register as Volunteer */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="w-[75%] h-[95%] bg-blue-900 rounded-3xl flex flex-col justify-center items-center">
          <div className="text-white text-3xl mb-8 font-bold">
            Register as Volunteer
          </div>
          <p className="text-white mb-8 text-center">
            Join us to make a difference in the community by offering your time
            and skills as a volunteer.
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-900 py-2 px-4 rounded-full"
          >
            Register
          </Link>
          <div className="h-1/2 p-4 mt-4">
            <img src="./home.jpg" alt="image" className="rounded-3xl" />
          </div>
        </div>
      </div>

      {/* Description */}
      {/* <div className="flex flex-col justify-center items-center text-center w-1/2">
        <p className="text-xl text-white mx-4">
          Whether you want to make a difference as a volunteer or need
          assistance, we're here to help you. Choose your path below!
        </p>
      </div> */}

      {/* Right Box: Get Help */}
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="w-[75%] h-[95%] bg-blue-900 rounded-3xl flex flex-col justify-center items-center">
          <div className="text-white text-3xl mb-8 font-bold">Get Help</div>
          <p className="text-white mb-8 text-center">
            If you are in need of assistance, we are here to help you. Sign up
            to connect with our resources.
          </p>
          <Link
            to="/register?role=victim"
            className="bg-white text-blue-900 py-2 px-4 rounded-full"
          >
            Sign Up
          </Link>
          <div className="h-1/2 p-4 mt-4">
            <img src="./home.jpg" alt="image" className="rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
