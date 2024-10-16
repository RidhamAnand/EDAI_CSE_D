import { Avatar, IconButton, Input } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";

const Chat = () => {
  return (
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
            Hello. I saw your recent post regarding medical emergency. What kind
            of medical supplies do you need exactly?
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
  );
};

export default Chat;
