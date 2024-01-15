import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import '../css/AddEvent.css';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '50vh',
};
const defaultCenter = { lat: 7.2905715, lng: 80.6337262 };

function AddEvent() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDDfZ1Ytu24zPB3z6J9bWRSBZDOv2p6fhQ',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (!name || !description || !location || !startDate || !endDate || !startTime || !endTime || !price) {
      setError('All fields are required.');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await fetch('http://localhost/Biletes-php/addEvent.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name,
          description,
          location,
          start_date: startDate,
          end_date: endDate,
          start_time: startTime,
          end_time: endTime,
          price,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Event added successfully!');
        setError('');
      } else {
        setError(data.message);
        setSuccessMessage('');
      }

      console.log('Form data:', {
        name,
        description,
        location,
        startDate,
        startTime,
        endDate,
        endTime,
        price,
      });

      setName('');
      setDescription('');
      setLocation('');
      setStartDate('');
      setEndDate('');
      setStartTime('');
      setEndTime('');
      setPrice('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-event-container">
      <h2>Add Event</h2>
      <form className="add-event-form" onSubmit={handleAddEvent}>
        <div className="form-group">
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <PlacesAutocomplete setLocation={setLocation} setSelectedLocation={setSelectedLocation} />
        </div>
        <div className="date-time-group">
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
        </div>
        <div className="date-time-group">
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endTime">End Time:</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="google-map">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={selectedLocation || defaultCenter}
            >
              {selectedLocation && <Marker position={selectedLocation} />}
            </GoogleMap>
          )}
        </div>

        <div>
          <button type="submit">Add Event</button>
        </div>
        <div>
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </form>
    </div>
  );
}

const PlacesAutocomplete = ({ setLocation, setSelectedLocation }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);

    setLocation(address); // Set the location in the state
    setSelectedLocation({ lat, lng }); // Set the selected location in the state
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default AddEvent;

