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
import SendIcon from "@mui/icons-material/Send";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import AddCommentIcon from "@mui/icons-material/AddComment";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const VolunteerScreen = () => {
  const categories = [
    "Food",
    "Medical Supplies",
    "Shelter",
    "Clothing",
    "Clean Water",
    "Sanitation Supplies",
    "Communication Devices",
    "Other",
    "First Aid Kits",
    "Cooking Equipment",
    "Hygiene Products",
    "Blankets",
    "Flashlights",
    "Batteries",
    "Tents",
    "Child Care Supplies",
    "Pet Care Supplies",
    "Fuel",
    "Transportation Assistance",
    "Psychological Support Resources",
  ];

  const posts = [
    {
      id: 1,
      author: "Arnav Anand",
      date: "7th Oct | 14:00",
      status: "OPEN",
      description:
        "Our area has been severely flooded, and many of us are stranded. We urgently need clean drinking water, food supplies, and medical assistance.",
      image:
        "https://image.cnbcfm.com/api/v1/image/107077924-1655579857423-gettyimages-1241322120-INDIA-ASSAM-GUWAHATI-FLOOD.jpeg?v=1655580320&w=1480&h=833&ffmt=webp&vtcrop=y",
      category: "Flood, Medical, Infrastructure",
      severity: "High",
      urgency: "High",
      distance: "3.5 Km",
      location: "Khadakwasla",
    },
    {
      id: 2,
      author: "John Doe",
      date: "8th Oct | 15:30",
      status: "CLOSED",
      description:
        "We are looking for volunteers to assist with shelter for displaced families after the recent earthquake.",
      image:
        "https://image.cnbcfm.com/api/v1/image/107077924-1655579857423-gettyimages-1241322120-INDIA-ASSAM-GUWAHATI-FLOOD.jpeg?v=1655580320&w=1480&h=833&ffmt=webp&vtcrop=y",
      category: "Shelter, Medical",
      severity: "Medium",
      urgency: "Medium",
      distance: "1.2 Km",
      location: "Downtown",
    },
    {
      id: 3,
      author: "Jane Smith",
      date: "9th Oct | 10:00",
      status: "OPEN",
      description:
        "Urgent need for food and blankets in the affected area after the landslide.",
      image:
        "https://image.cnbcfm.com/api/v1/image/107077924-1655579857423-gettyimages-1241322120-INDIA-ASSAM-GUWAHATI-FLOOD.jpeg?v=1655580320&w=1480&h=833&ffmt=webp&vtcrop=y",
      category: "Food, Shelter",
      severity: "High",
      urgency: "High",
      distance: "5.0 Km",
      location: "Highland",
    },
    {
      id: 4,
      author: "Mike Johnson",
      date: "10th Oct | 12:30",
      status: "OPEN",
      description:
        "Medical assistance required for injured individuals following the fire outbreak.",
      image:
        "https://image.cnbcfm.com/api/v1/image/107077924-1655579857423-gettyimages-1241322120-INDIA-ASSAM-GUWAHATI-FLOOD.jpeg?v=1655580320&w=1480&h=833&ffmt=webp&vtcrop=y",
      category: "Medical, Fire",
      severity: "Critical",
      urgency: "Immediate",
      distance: "2.8 Km",
      location: "City Center",
    },
    {
      id: 5,
      author: "Emily Brown",
      date: "11th Oct | 09:15",
      status: "CLOSED",
      description:
        "Community needs support in rebuilding homes damaged by the storm.",
      image:
        "https://image.cnbcfm.com/api/v1/image/107077924-1655579857423-gettyimages-1241322120-INDIA-ASSAM-GUWAHATI-FLOOD.jpeg?v=1655580320&w=1480&h=833&ffmt=webp&vtcrop=y",
      category: "Reconstruction, Shelter",
      severity: "Medium",
      urgency: "Low",
      distance: "4.5 Km",
      location: "West Side",
    },
    {
      id: 6,
      author: "Rachel Green",
      date: "12th Oct | 11:45",
      status: "OPEN",
      description:
        "Collecting donations for victims of the recent earthquake. Every bit helps!",
      image:
        "https://image.cnbcfm.com/api/v1/image/107077924-1655579857423-gettyimages-1241322120-INDIA-ASSAM-GUWAHATI-FLOOD.jpeg?v=1655580320&w=1480&h=833&ffmt=webp&vtcrop=y",
      category: "Donations, Food",
      severity: "Medium",
      urgency: "High",
      distance: "1.0 Km",
      location: "East Valley",
    },
    {
      id: 7,
      author: "Chris Evans",
      date: "13th Oct | 08:30",
      status: "OPEN",
      description:
        "Seeking volunteers to distribute food and water in the flood-hit areas.",
      image:
        "https://image.cnbcfm.com/api/v1/image/107077924-1655579857423-gettyimages-1241322120-INDIA-ASSAM-GUWAHATI-FLOOD.jpeg?v=1655580320&w=1480&h=833&ffmt=webp&vtcrop=y",
      category: "Food, Volunteers",
      severity: "High",
      urgency: "Immediate",
      distance: "6.3 Km",
      location: "Riverbank",
    },
    {
      id: 8,
      author: "Sophia Turner",
      date: "14th Oct | 16:00",
      status: "OPEN",
      description:
        "Need urgent medical supplies for a health camp in the disaster zone.",
      image:
        "https://image.cnbcfm.com/api/v1/image/107077924-1655579857423-gettyimages-1241322120-INDIA-ASSAM-GUWAHATI-FLOOD.jpeg?v=1655580320&w=1480&h=833&ffmt=webp&vtcrop=y",
      category: "Medical, Supplies",
      severity: "Critical",
      urgency: "High",
      distance: "2.0 Km",
      location: "North Hill",
    },
    {
      id: 9,
      author: "David Williams",
      date: "15th Oct | 13:00",
      status: "CLOSED",
      description:
        "https://image.cnbcfm.com/api/v1/image/107077924-1655579857423-gettyimages-1241322120-INDIA-ASSAM-GUWAHATI-FLOOD.jpeg?v=1655580320&w=1480&h=833&ffmt=webp&vtcrop=y",
      image: "https://example.com/image9.jpg",
      category: "Reconstruction",
      severity: "Low",
      urgency: "Low",
      distance: "4.0 Km",
      location: "Old Town",
    },
    {
      id: 10,
      author: "Olivia Martinez",
      date: "16th Oct | 14:30",
      status: "OPEN",
      description:
        "Looking for support in providing clean water to families affected by the drought.",
      image:
        "https://image.cnbcfm.com/api/v1/image/107077924-1655579857423-gettyimages-1241322120-INDIA-ASSAM-GUWAHATI-FLOOD.jpeg?v=1655580320&w=1480&h=833&ffmt=webp&vtcrop=y",
      category: "Water, Supplies",
      severity: "High",
      urgency: "High",
      distance: "3.0 Km",
      location: "Sunnydale",
    },
  ];

  const queryClient = useQueryClient();
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
            <div className="flex justify-between gap-2  border-gray-300">
              <h2 className="text-lg font-bold text-wh mb-4">Leaderboard</h2>
              <LeaderboardIcon />
            </div>

            {/* Table Container with Bottom Border */}
            <div className="border-t border-gray-300">
              <table className="table-auto w-full border-separate border-spacing-y-2">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="font-bold p-2 text-left">Rank</th>
                    <th className="font-bold p-2 text-left">Name</th>
                    <th className="font-bold p-2 text-left">Volunteered</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-2">1</td>
                    <td className="p-2">Ridham</td>
                    <td className="p-2">5</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2">2</td>
                    <td className="p-2">Shivani</td>
                    <td className="p-2">8</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2">3</td>
                    <td className="p-2">Vansh</td>
                    <td className="p-2">7</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2">4</td>
                    <td className="p-2">Vinit</td>
                    <td className="p-2">4</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
            {posts.map((post) => (
              <div
                key={post.id}
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
                      A
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="font-poppins font-medium text-xs">
                        {post.author}
                      </p>
                      <p className="font-montserrat text-xs">{post.date}</p>
                    </div>
                  </div>
                  <div
                    className={`p-2 rounded-lg shadow-md ${
                      post.status === "OPEN" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <p className="font-bold text-md">{post.status}</p>
                  </div>
                </div>

                <hr className="border-t border-gray-300 mb-3 w-full" />

                <div className="description">
                  <p className="font-poppins text-xs">{post.description}</p>
                  <div className="mt-3 w-full rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt="Post Image"
                      className="w-full h-[200px] object-cover"
                    />
                  </div>
                </div>

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
                    <p>{post.category}</p>
                  </div>

                  <div className="flex flex-row gap-5">
                    <div className="text-right">
                      <h1 className="font-medium">Severity</h1>
                      <p>{post.severity}</p>
                    </div>

                    <div className="text-right">
                      <h1 className="font-medium">Urgency</h1>
                      <p>{post.urgency}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-between">
                  <h1 className="font-medium">Distance: {post.distance}</h1>
                  <h1 className="font-medium">Location: {post.location}</h1>
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
            ))}
          </div>
        </div>

        {/* right component */}

        <div
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          className="chat-area border border-gray-300 bg-white basis-1/3 p-2 h-full flex flex-col rounded-md"
        >
          {/* Chat Side */}
          <div className="flex flex-row mb- items-center justify-between">
            <div className="flex justify-start  gap-2 ">
              <Avatar sx={{ width: 24, height: 23, fontSize: 10 }}>C</Avatar>
              <div className="flex flex-col justify-center">
                <p className="font-poppins font-normal text-xs">Arnav Anand</p>
              </div>
            </div>
            <IconButton sx={{ padding: 0 }}>
              <PhoneEnabledIcon sx={{ width: 18, height: 18 }} />
            </IconButton>
          </div>

          <hr className="border-t border-gray-300 mb-3 w-full" />

          {/* Chat Messages Area */}

          {/* User Message */}
          <div className="message mb-2 flex justify-end">
            <div
              style={{
                backgroundColor: "#96BAE8",
              }}
              className=" text-white rounded-lg p-2 max-w-xs"
            >
              <p className="font-montserrat text-xs">
                Hello. I saw your recent post regarding medical emergency. What
                kind of medical supplies do you need exactly?
              </p>
            </div>
          </div>
          <div className="chat-messages flex-grow overflow-y-auto  border-b border-gray-300">
            {/* Chatbot Message */}
            <div className="message mb-2 flex">
              <div className="bg-gray-200 text-gray-800 rounded-lg p-2 max-w-xs">
                <p className="font-montserrat text-xs">
                  I need supplies for a third degree burn injury. My medical
                  supplies are exhausting soon.
                </p>
              </div>
            </div>

            {/* Add more messages as needed */}
          </div>

          {/* Message Input Area */}
          <div className="flex m-2 align-bottom gap-2 rounded-md border pt-1 pb-2 pl-3  pr-3 border-gray-300 items-end justify-start">
            <Input
              fullWidth
              sx={{
                fontFamily: "Montserrat",
                fontSize: "12px",
              }}
              placeholder="Start Typing..."
            ></Input>

            <IconButton sx={{ padding: 0 }}>
              {" "}
              <SendIcon sx={{ width: 20 }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerScreen;
