import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useRequest } from '../../Contexts/RequestContext';
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 

// Set default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const steps = [
  'Describe Your Problem',
  'Select the Location',
  'Preview and Publish',
];

function RequestHelp() {
  const minLength = 5; // Minimum length requirement
  const keywords = [
    "urgent medical needs",
    "food donations",
    "shelter request",
    "clothing for children",
    "transport to hospital",
    "psychological counseling",
    "medical supplies needed",
    "temporary housing assistance",
    "clean drinking water",
    "first aid kits",
    "baby supplies needed",
    "warm clothing",
    "emergency shelter",
    "fuel assistance",
    "volunteer support",
    "financial aid request",
    "housing relocation help",
    "counseling for trauma"
  ];

  const [activeScreen, setActiveScreen] = useState(0); // Start with description screen

  const WriteDescription = () => {
    const { description, setDescription } = useRequest();
    const [currentDescription, setCurrentDescription] = useState(description);

    const selectLocation = () => {
      setDescription(currentDescription);
      setActiveScreen(1); // Move to select location
    }

    return (
      <div className='shadow-lg p-4 mx-8'>
        <TextField
          label="Describe Your Problem"
          multiline
          rows={7}
          variant="outlined"
          fullWidth
          value={currentDescription}
          onChange={(e) => setCurrentDescription(e.target.value)}
        />
        <p className='p-2 mt-4'>Example Keywords to highlight your request</p>
        <div className='flex flex-wrap p-4 gap-4'>
          {keywords.map((k, index) => (
            <div key={index} className='border border-gray-400 rounded-sm p-2'>
              <p className='text-xs'>{k}</p>
            </div>
          ))}
        </div>
        <Button
          onClick={selectLocation}
          fullWidth
          variant='contained'
          sx={{ textTransform: "capitalize" }}
          disableElevation
          disabled={currentDescription.trim().length < minLength}
        >
          Next: Select Location
        </Button>
      </div>
    );
  }

  const SelectLocation = () => {
    const [position, setPosition] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition([pos.coords.latitude, pos.coords.longitude]);
          },
          () => {
            alert("Unable to retrieve your location");
            setPosition([51.505, -0.09]); // Default location
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
        setPosition([51.505, -0.09]); // Default location
      }
    }, []);
    
    const handleSearch = async () => {
      if (searchTerm) {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: {
            q: searchTerm,
            format: 'json',
            limit: 5,
          },
        });
        setSearchResults(response.data);
      }
    };
  
    const handleResultClick = (result) => {
      const newPosition = [result.lat, result.lon];
      setPosition(newPosition);
      setSearchResults([]);
      setSearchTerm('');
    };
  
    const MapClick = () => {
      const map = useMap();
      useMapEvents({
        click: (event) => {
          const newPosition = [event.latlng.lat, event.latlng.lng];
          setPosition(newPosition);
          map.setView(newPosition, map.getZoom()); // Set map view to clicked location
        },
      });
      return null;
    };
  
    if (!position) return <div>Loading...</div>;
  
    return (
      <div>
        <TextField
          label="Search for a location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          fullWidth
        />
        <Button onClick={handleSearch} variant="contained" sx={{ mt: 2 }}>Search</Button>
  
        {searchResults.length > 0 && (
          <div style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '10px' }}>
            {searchResults.map((result) => (
              <div
                key={result.place_id}
                onClick={() => handleResultClick(result)}
                style={{ cursor: 'pointer', padding: '5px', border: '1px solid #ccc' }}
              >
                {result.display_name}
              </div>
            ))}
          </div>
        )}
  
        {/* Use position as a key to force re-render when it changes */}
        <MapContainer key={position ? position.join(',') : 'loading'} center={position} zoom={13} style={{ height: '400px', width: '100%', marginTop: '20px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} />
          <MapClick />
        </MapContainer>
  
        <div>
          <h3>Selected Location:</h3>
          <p>Latitude: {position[0]}</p>
          <p>Longitude: {position[1]}</p>
        </div>
      </div>
    );
  };
  

  return (
    <div>
      <div className='flex flex-col w-full gap-10 p-12'>
        <h1 className='text-4xl font-medium'>Request for Help</h1>

        <Stepper activeStep={activeScreen} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeScreen === 0 ? <WriteDescription /> : <SelectLocation />}
      </div>
    </div>
  );
}

export default RequestHelp;
