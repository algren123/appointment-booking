import React from 'react';
import Navbar from '../components/Navbar';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector, useDispatch } from 'react-redux';
import { updateDate, updateTime } from '../features/dateSlice';
import axios from 'axios';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

function BookAppointment() {
  const { date, time } = useSelector((state) => state.date);
  const dispatch = useDispatch();

  // FullCalendar custom settings
  const header = {
    start: 'title',
    center: '',
    end: 'prev,next',
  };

  // Constrains FullCalendar to only be able to select one day and not multiple
  const singleDay = {
    startTime: '00:00',
    endTime: '24:00',
  };

  // Constrains FullCalendar to not show days before current day
  const noPastDays = {
    start: new Date().toISOString().split('T')[0],
    end: '2100-07-10',
  };

  const timeslots = [
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
  ];

  function handleSelect(params) {
    dispatch(updateDate(params.startStr));
  }

  // Sets up the params and does a POST request to add to Airtable DB
  function handleSubmit() {
    const params = {
      date,
      time,
      status: 'PENDING',
    };

    if (date && time) {
      axios.post('/api/createBooking', params).then((res) => {
        Swal.fire(
          'Success!',
          `Appointment Confirmation Number: ${res.data.id}`,
          'success'
        );
      });
    } else {
      Swal.fire('Error', 'Please select a date and time', 'error');
    }
  }

  return (
    <div className="flex flex-col max-h-screen mb-16">
      <Navbar />
      <h1 className="mx-auto mt-10 mb-3 font-bold text-3xl text-purple-500">
        Book an appointment
      </h1>
      <div className="mx-5 mt-5 px-5 md:px-80">
        <h2 className="text-center text-2xl font-semibold mb-3 text-purple-500">
          1. Select a date
        </h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          headerToolbar={header}
          height={500}
          select={handleSelect}
          selectable={true}
          selectConstraint={singleDay}
          longPressDelay={0}
          validRange={noPastDays}
          id="calendar"
        />
      </div>

      <label
        htmlFor="timeSelect"
        className="text-center text-2xl font-semibold my-3 text-purple-500 flex flex-col"
      >
        2. Select a time:
        <select
          name="timeSelect"
          id="timeSelect"
          value="Time"
          className="mx-auto my-3 w-1/2 text-center py-2 bg-gray-200 rounded"
          onChange={(e) => dispatch(updateTime(e.target.value))}
        >
          <option disabled>Time</option>
          {timeslots.map((timeslot) => (
            <option key={uuidv4()} value={timeslot}>
              {timeslot}
            </option>
          ))}
        </select>
      </label>
      <h2 className="text-center text-2xl font-bold my-5 text-purple-500 flex flex-col">
        {date && time
          ? `Appointment on ${new Date(
              date.split('-').reverse().join('-')
            ).toDateString()} between ${time}`
          : ''}
      </h2>
      <button
        onClick={() => handleSubmit()}
        className="m-auto mt-5 bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded"
      >
        Book appointment
      </button>
    </div>
  );
}

export default BookAppointment;
