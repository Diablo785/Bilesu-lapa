import React, { useState, useEffect } from 'react';
import '../css/AllEvents.css';


function EventsByStatus({ status, events }) {
  return (
    <div className='allEvents'>
      <h2>{status} Events</h2>
      {events.length === 0 ? (
        <p>No {status.toLowerCase()} events</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.name}</strong>
              <p>Description: {event.description}</p>
              <p>Location: {event.location}</p>
              <p>Start Date: {event.start_date}</p>
              <p>End Date: {event.end_date}</p>
              <p>Price: {event.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function getEventStatus(event) {
  const currentDate = new Date().toISOString().split('T')[0];
  if (currentDate < event.start_date) {
    return 'Upcoming';
  } else if (currentDate >= event.start_date && currentDate <= event.end_date) {
    return 'Ongoing';
  } else {
    return 'Ended';
  }
}

function AllEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost/Biletes-php/allEvents.php')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const upcomingEvents = events.filter(event => getEventStatus(event) === 'Upcoming');
  const ongoingEvents = events.filter(event => getEventStatus(event) === 'Ongoing');
  const endedEvents = events.filter(event => getEventStatus(event) === 'Ended');

  return (
    <div>
      <EventsByStatus status="Upcoming" events={upcomingEvents} />
      <EventsByStatus status="Ongoing" events={ongoingEvents} />
      <EventsByStatus status="Ended" events={endedEvents} />
    </div>
  );
}

export default AllEvents;
