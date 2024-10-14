import Avatar from "@mui/material/Avatar";
import "../../App.css";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Input,
  Modal,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Categories, Posts } from "../Constants/Constants";
import { useEffect } from "react";
// import geolib from "geolib";
import LeaderBoard from "./Components/LeaderBoard";
import Chat from "./Components/Chat";
import { haversineDistance } from "../../utils/calculateDistance";

const VolunteerScreen = () => {
  // const posts = Posts;
  const categories = Categories;
  const [userLocation, setUserLocation] = useState(null);
  const [position, setPosition] = useState(null);

  // Function to get user's location
  // Function to get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPosition = [pos.coords.latitude, pos.coords.longitude];
          setPosition(newPosition);
          setUserLocation(newPosition); // Set userLocation to position
        },
        () => {
          setPosition([51.505, -0.09]); // Default location
          setUserLocation([51.505, -0.09]); // Set userLocation to default
        }
      );
    } else {
      setPosition([18.516808780071855, 73.86420913244177]); // Default location
      setUserLocation([18.516808780071855, 73.86420913244177]); // Set userLocation to default
    }
  }, []);

  const calculateDistance = (geoLocation) => {
    if (position) {
      return haversineDistance(position, geoLocation).toFixed(2); // Distance in kilometers
    }
    return null;
  };

  const defaultImage =
    "https://image.cnbcfm.com/api/v1/image/107077924-1655579857423-gettyimages-1241322120-INDIA-ASSAM-GUWAHATI-FLOOD.jpeg?v=1655580320&w=1480&h=833&ffmt=webp&vtcrop=y";
  const queryClient = useQueryClient();

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/api/get-posts", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) throw new Error(data.error || "something went wrong");
        return data;
      } catch (error) {
        throw new Error("Failed to fetch posts");
      }
    },
  });
  console.log(posts);

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteerUser"] });
    },
  });

  const { data: volunteerUser } = useQuery({ queryKey: ["volunteerUser"] });

  const [openModal, setOpenModal] = useState(false);

  // Modal content
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div
      style={{
        background: "rgb(238,174,202)",
        background:
          "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
        width: "100%",
        height: "100vh",
      }}
      className="victim-post pb-8   overflow-y-hidden"
    >
      <div className=" flex h-full mr-4 ml-4 mt-4 flex-row gap-2">
        {/*left component */}
        <div className="side-bar basis-1/3 gap-5  flex flex-col">
          {/* profile component */}
          <div
            className="basis-1/2 border border-gray-300 flex flex-col p-4 rounded-md"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="profile-component flex flex-col justify-center items-center gap-2 basis-1/2 rounded-md">
              <Avatar />
              <p className="font-semibold font-montserrat ">
                {volunteerUser?.name.split(" ")[0]}
              </p>
              <p className="font-light text-sm font-montserrat">
                {volunteerUser?.email}
              </p>
            </div>

            {/* Buttons */}
            <Button
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                textAlign: "left",
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderColor: "#BFC4D7",
                borderLeft: "none",
                color: "black",
                borderRight: "none",
                borderRadius: 0,
                padding: "8px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
            >
              View Profile
            </Button>

            <Button
              fullWidth
              size="small"
              variant="outlined"
              sx={{
                textAlign: "left",
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderColor: "#BFC4D7",
                borderLeft: "none",
                color: "black",
                borderRight: "none",
                borderRadius: 0,
                padding: "8px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
            >
              Edit Profile
            </Button>

            <Button
              fullWidth
              size="small"
              variant="outlined"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              sx={{
                textAlign: "left",
                borderTop: "1px solid",
                borderBottom: "1px solid",
                borderColor: "#BFC4D7",
                borderLeft: "none",
                color: "black",
                borderRight: "none",
                borderRadius: 0,
                padding: "8px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
            >
              Logout
            </Button>
          </div>

          <div
            className="profile-component border border-gray-300  bg-white flex flex-col justify-start p-4 basis-1/2 rounded-md"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Leaderboard Title */}
            <LeaderBoard />
          </div>
        </div>
        {/* middle component */}
        <div className="middle-componet gap-5 basis-full flex flex-col h-screen ">
          {/* Disaster News Component */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            className="disaster-news-component border border-gray-300 ml-2 mr-2 -mb-4 basis-1/4  bg-white rounded-md flex flex-col items-center "
          >
            {/* <h1 className="text-2xl font-bold">Category</h1> */}
            <div className="flex flex-row h-full w-full items-center justify-around">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center justify-center">
                  <h3 className="text-xl font-semibold">Category</h3>
                  <Modal
                    open={openModal}
                    onClose={handleClose}
                    className="gap-4"
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "90%",
                        // height: "80%",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                      }}
                    >
                      <h2>Select a Category</h2>

                      <FormGroup>
                        <Grid container spacing={2}>
                          {categories.map((category) => (
                            <Grid item xs={6} sm={4} md={3} key={category}>
                              <FormControlLabel
                                control={<Checkbox />}
                                label={category}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </FormGroup>
                      <Button
                        onClick={() => {
                          setOpenModal(!openModal);
                        }}
                        variant="contained"
                        disableElevation
                        fullWidth
                        sx={{
                          my: 4,
                        }}
                      >
                        Apply
                      </Button>
                    </Box>
                  </Modal>
                </div>
                <Button
                  sx={{
                    textTransform: "capitalize",
                  }}
                  onClick={() => {
                    setOpenModal(true);
                  }}
                  variant="contained"
                  disableElevation
                >
                  select Category
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Severity</h3>
                <select
                  name="Priority"
                  className="h-10 w-20 rounded-lg shadow-2xl bg-gray-100  focus:border-black  focus:border-2 text-black border border-gray-600"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Urgency</h3>
                <select
                  name="Priority"
                  className="h-10 w-20 rounded-lg shadow-2xl bg-gray-100  focus:border-black  focus:border-2 text-black border border-gray-600"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Distance</h3>
                <select
                  name="Priority"
                  className="h-10 w-20 rounded-lg shadow-2xl bg-gray-100  focus:border-black  focus:border-2 text-black border border-gray-600"
                >
                  <option>Nearest to Fasthest</option>
                  <option>Farthest to Nearest</option>
                </select>
              </div>
            </div>
            <div className="h-10 w-full px-4 pb-2 flex flex-col justify-between">
              <Button
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "500",
                  color: "#fff",
                  backgroundColor: "#4452D9",
                  borderColor: "#fff",
                  borderWidth: "1px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#3b4cbb",
                    borderColor: "#fff",
                  },
                }}
              >
                Submit
              </Button>
            </div>
          </div>

          {/* Scrollable Posts Component */}
          <div className="posts-area flex-grow p-3 basis-full flex-col rounded-md overflow-y-scroll space-y-5 scrollbar-hide">
            {/* Post Component */}
            {posts &&
              posts.map((post) => {
                const distance = calculateDistance(post.geoLocation);
                console.log("Distance:", distance);

                return (
                  <div
                    key={post._id}
                    style={{
                      background: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                    className="bg-white p-7 flex flex-col gap-4 rounded-md border border-gray-300"
                  >
                    <div className="flex justify-between gap-2">
                      <div className="flex gap-2">
                        <Avatar sx={{ width: 30, height: 30, fontSize: 15 }}>
                          {post.author ? post.author[0] : "U"}
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="font-poppins font-medium text-xs">
                            {post.author || "Unknown"}
                          </p>
                          <p className="font-montserrat text-xs">
                            {new Date(post.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`p-2 rounded-lg shadow-md ${
                          post.status === "open" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        <p className="font-bold text-md">
                          {post.status.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <hr className="border-t border-gray-300 mb-3 w-full" />

                    <div className="description">
                      <p className="font-poppins text-xs">{post.description}</p>
                      {post.image && (
                        <div className="mt-3 w-full rounded-lg overflow-hidden">
                          <img
                            src={post.image || defaultImage}
                            alt="Post Image"
                            className="w-full h-[200px] object-cover"
                          />
                        </div>
                      )}
                      <div className="mt-3 w-full rounded-lg overflow-hidden">
                        <img
                          src={post.image || defaultImage}
                          alt="Post Image"
                          className="w-full h-[200px] object-cover"
                        />
                      </div>
                    </div>

                    {/* ... (keep buttons as is) ... */}

                    <div className="buttons-area flex flex-row justify-between">
                      <div className="flex gap-7 flex-row">
                        <IconButton sx={{ padding: 0 }}>
                          <FavoriteBorderIcon />
                        </IconButton>
                        <IconButton sx={{ padding: 0 }}>
                          <AddCommentIcon />
                        </IconButton>
                        <IconButton sx={{ padding: 0 }}>
                          <ShareIcon />
                        </IconButton>
                      </div>
                      <IconButton sx={{ padding: 0 }}>
                        <TurnedInNotIcon />
                      </IconButton>
                    </div>

                    <div className="flex flex-row justify-between">
                      <div>
                        <h1 className="font-medium">Category</h1>
                        <p>{post.category.join(", ")}</p>
                      </div>

                      <div className="flex flex-row gap-5">
                        <div className="text-right">
                          <h1 className="font-medium">Severity</h1>
                          <p>{post.severity}</p>
                        </div>

                        <div className="text-right">
                          <h1 className="font-medium">Priority</h1>
                          <p>{post.priority}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between">
                      <h1 className="font-medium">
                        Distance:
                        <p className="font-normal">{distance} km</p>
                      </h1>
                      <h1 className="font-medium">
                        Location:
                        <p className="font-normal">
                          {post.geoLocation.join(", ")}
                        </p>
                      </h1>
                    </div>

                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: "500",
                        color: "#fff",
                        backgroundColor: "#4452D9",
                        borderColor: "#fff",
                        borderWidth: "1px",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#3b4cbb",
                          borderColor: "#fff",
                        },
                      }}
                    >
                      Volunteer
                    </Button>
                  </div>
                );
              })}
          </div>
        </div>

        {/* right component */}
        <Chat />
      </div>
    </div>
  );
};

export default VolunteerScreen;
