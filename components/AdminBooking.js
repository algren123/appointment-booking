import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { updateName, updateTime } from '../features/dateSlice';
import { reverseDate, addHour } from '../pages/api/utils/helperFunctions';

export default function AdminBooking({
  booking,
  deleteBooking,
  updateBooking,
}) {
  const [modal, setModal] = useState(false);
  const [updatedName, setUpdatedName] = useState(booking.fields.name);
  const [updatedDate, setUpdatedDate] = useState(booking.fields.date);
  const [updatedTime, setUpdatedTime] = useState(booking.fields.time);
  const [updatedStatus, setUpdatedStatus] = useState(booking.fields.status);

  return (
    <div
      className={
        (booking.fields.status === 'PENDING'
          ? 'border-yellow-500'
          : booking.fields.status === 'CANCELLED'
          ? 'border-red-500'
          : booking.fields.status === 'COMPLETED'
          ? 'border-green-500'
          : booking.fields.status === 'CONFIRMED'
          ? 'border-blue-500'
          : '') + ' border-8 rounded-md text-center text-xl font-semibold p-5'
      }
    >
      <p>Name: {booking.fields.name}</p>
      <p>Date: {booking.fields.date}</p>
      <p>Time: {booking.fields.time}</p>
      <p>Status: {booking.fields.status}</p>
      <p>ID: {booking.id}</p>
      <button
        onClick={() => setModal(true)}
        className="m-2 mt-6 py-2 px-4 rounded bg-purple-500 text-white font-bold hover:bg-purple-400"
      >
        Update
      </button>
      <button
        onClick={() => deleteBooking(booking.id)}
        className="m-2 mt-6 py-2 px-5 rounded bg-red-500 text-white font-bold hover:bg-red-400"
      >
        Delete
      </button>
      <div
        className={
          (modal ? 'block' : 'hidden') +
          ' fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-opacity-40 bg-black'
        }
      >
        <div className="bg-white m-auto mt-32 p-12 w-96 rounded-md flex flex-col">
          <span className="mb-5">Booking Id: {booking.id}</span>
          <span>
            Name:{' '}
            <input
              type="text"
              name="updatedName"
              id="updatedName"
              className="my-3 w-32 bg-gray-300 rounded-md mx-2 p-2"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </span>
          <span>
            Date:{' '}
            <input
              type="date"
              name="updatedDate"
              id="updatedDate"
              className="my-3 bg-gray-300 rounded-md mx-2 p-2"
              value={reverseDate(updatedDate)}
              onChange={(e) => {
                setUpdatedDate(reverseDate(e.target.value));
              }}
            />
          </span>
          <span>
            Time:{' '}
            <input
              type="time"
              name="updatedTime"
              id="updatedTime"
              className="my-3 bg-gray-300 rounded-md mx-2 p-2"
              value={updatedTime.split('-')[0].replace(' ', '')}
              onChange={(e) => {
                setUpdatedTime(
                  `${e.target.value} - ${addHour(e.target.value)}`
                );
              }}
            />
          </span>
          <span>
            Status:{' '}
            <select
              name="updatedStatus"
              id="updatedStatus"
              className="my-3 bg-gray-300 rounded-md mx-2 p-2"
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
            >
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">CONFIRMED</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </span>
          <button
            className="w-48 m-auto mt-6 p-2 rounded bg-purple-500 text-white font-bold hover:bg-purple-400"
            onClick={() => {
              if (updateTime !== '' && updatedDate !== '' && updatedName) {
                updateBooking(booking.id, {
                  date: updatedDate,
                  time: updatedTime,
                  name: updatedName,
                  status: updatedStatus,
                });
                setModal(false);
              } else {
                Swal.fire('Error', 'Please fill in all fields', 'error');
              }
            }}
          >
            Update
          </button>
          <button
            className="w-48 m-auto mt-6 p-2 rounded bg-red-500 text-white font-bold hover:bg-red-400"
            onClick={() => setModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
