import React, { useState } from 'react';
import { reverseDate, addHour } from '../pages/api/utils/helperFunctions';

export default function AdminBooking({
  booking,
  deleteBooking,
  updateBooking,
}) {
  const [modal, setModal] = useState(false);
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
      <p>Date: {booking.fields.date}</p>
      <p>Time: {booking.fields.time}</p>
      <p>Status: {booking.fields.status}</p>
      <p>ID: {booking.id}</p>
      <button
        onClick={() => setModal(true)}
        className="m-2 mt-6 p-2 rounded bg-purple-500  font-bold hover:text-white"
      >
        Update
      </button>
      <button
        onClick={() => deleteBooking(booking.id)}
        className="m-2 mt-6 p-2 rounded bg-red-500  font-bold hover:text-white"
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
            className="w-48 m-auto mt-6 p-2 rounded bg-purple-500  font-bold hover:text-white"
            onClick={() => {
              updateBooking(booking.id, {
                date: updatedDate,
                time: updatedTime,
                status: updatedStatus,
              });
              setModal(false);
            }}
          >
            Update
          </button>
          <button
            className="w-48 m-auto mt-6 p-2 rounded bg-red-500  font-bold hover:text-white"
            onClick={() => setModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
