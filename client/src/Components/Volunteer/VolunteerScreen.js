
import Avatar from '@mui/material/Avatar'
import '../../App.css';
import { Button, IconButton, Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
const VolunteerScreen = ()=>{
    return <div   style={{ backgroundColor: '#5553DA' }} 
 className="h-screen  w-screen p-5 flex flex-row gap-5">
      

      {/*left component */}
      <div className="side-bar basis-1/3 gap-5 flex flex-col" > 

        {/* profile component */}
        <div className="profile-component basis-1/2 rounded-md bg-white">

        </div>


        <div className="profile-component basis-1/2 rounded-md bg-white">
    new
</div>

     </div>
     {/* middle component */}
     <div className="middle-componet gap-5 basis-full flex flex-col h-screen ">
  
  {/* Disaster News Component */}
  <div className="disaster-news-component basis-1/4  bg-white rounded-lg"></div>
  
  {/* Scrollable Posts Component */}
  <div className="posts-area flex-grow p-3 basis-full flex-col rounded-lg overflow-y-scroll space-y-5    scrollbar-hide">
    
    {/* Post Component */}
    {[1, 2, 3, 4, 5].map((post, index) => (
      <div key={index} className="bg-white p-3 flex flex-col gap-2 rounded-lg border border-gray-300">
        <div className="flex justify-start mb-3 gap-2">
          <Avatar sx={{ width: 30, height: 30, fontSize: 15 }}>A</Avatar>
          <div className="flex flex-col">
            <p className="font-poppins font-medium text-xs">Arnav Anand</p>
            <p className="font-montserrat text-xs">date and time</p>
          </div>
        </div>
      
        <div className="description">
          <p className="font-montserrat text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            cupiditate quisquam, porro necessitatibus delectus vitae! Quasi
            doloremque quos perferendis vero dolor! Mollitia esse delectus
            accusamus enim ut facere reprehenderit error!
          </p>
          <div className="mt-3 w-full rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=600&q=80"
              alt="Beautiful Scenery"
              className="w-full h-[200px] object-cover"
            />
          </div>
        </div>
        <Button 
  variant="outlined" 
  size="small" 
  fullWidth
  sx={{
    fontFamily: 'Montserrat',
    fontWeight: '500',
    color: '#fff', // White text for contrast
    backgroundColor: '#4452D9', // Custom background color
    borderColor: '#fff', // Optional: white border
    borderWidth: '1px',
    textTransform: 'none', // Prevents uppercase text
    '&:hover': {
      backgroundColor: '#3b4cbb', // Darker shade for hover effect
      borderColor: '#fff',
    },
  }}
>
  I can Help
</Button>  
<Button 
  variant="text" 
  size="small" 
  fullWidth
  sx={{
    fontFamily: 'Montserrat',
    fontWeight: '500',
    color: '#333',
    textTransform:'none',
    '&:hover': {
      backgroundColor: '#f7f7f7', // Light hover effect
      borderColor: '#bbb',
    },
  }}
>
  I know someone Who can Help
</Button>

    </div>
    ))}
    
  </div>

</div>



      {/* right component */}
    
      <div className="chat-area bg-white basis-1/3 p-2 h-full flex flex-col rounded-lg shadow-lg">

{/* Header */}
<div className="flex justify-start mb-3 gap-2">
  <Avatar sx={{ width: 24, height: 23, fontSize: 10 }}>C</Avatar>
  <div className="flex flex-col justify-center">
    <p className="font-poppins font-normal text-xs">Chat Assistance</p>
  </div>
</div>

{/* Chat Messages Area */}
<div className="chat-messages flex-grow overflow-y-auto  border-b border-gray-300">
  {/* Chatbot Message */}
  <div className="message mb-2 flex">
    <div className="bg-gray-200 text-gray-800 rounded-lg p-2 max-w-xs">
      <p className="font-montserrat text-xs">Hello! How can I assist you today?</p>
    </div>
  </div>

  {/* User Message */}
  <div className="message mb-2 flex justify-end">
    <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">
      <p className="font-montserrat text-xs">I have a question regarding my account.</p>
    </div>
  </div>

  {/* Add more messages as needed */}
</div>

{/* Message Input Area */}
<div className='flex  align-bottom  items-end justify-start'>
    <Input  fullWidth sx={{
            fontFamily: 'Montserrat',
            fontSize:"12px"

    }} placeholder='Start Typing...'></Input>
    
    <IconButton sx={{padding:0}}>    <SendIcon sx={{width:20}}/>
</IconButton>
</div>

</div>

    </div>
}

export default VolunteerScreen;