import React, { useState, useEffect } from 'react';
import AdminBooking from '../components/AdminBooking';
import Navbar from '../components/Navbar';
import { table, minifyRecords } from './api/utils/Airtable';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { reverseDate } from './api/utils/helperFunctions';

function AdminPage({ initialBookings }) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [bookingNumber, setBookingNumber] = useState(0);
  let [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (initialBookings.length) {
      setBookings(initialBookings);
      setBookingNumber(bookings.length);
    }
  });

  // Refreshes the bookings for delete/update events (because of ServerSideProps)
  const refreshData = () => {
    router.replace(router.asPath);
  };

  function deleteBooking(id) {
    axios.post('/api/deleteBooking', { id }).then(() => {
      refreshData();
      Swal.fire('Deleted', `Booking ${id} has been deleted`, 'error');
    });
  }

  function updateBooking(id, fields) {
    axios.put('/api/updateBooking', { id, fields }).then((res) => {
      refreshData();
      Swal.fire('Success', `Booking ${id} has been updated`, 'success');
    });
  }

  // Renders the bookings in chronological order
  function bookingList(statusFilter, dateFilter) {
    if (statusFilter) {
      bookings = bookings.filter(
        (booking) => booking.fields.status === statusFilter
      );
    }
    if (dateFilter) {
      bookings = bookings.filter(
        (booking) => reverseDate(booking.fields.date) === dateFilter
      );
    }
    bookings = bookings.sort((a, b) => {
      return (
        new Date(a.fields.date.split('-').reverse().join('-')) -
        new Date(b.fields.date.split('-').reverse().join('-'))
      );
    });
    if (bookings.length) {
      return bookings.map((booking) => (
        <AdminBooking
          key={booking.id}
          booking={booking}
          deleteBooking={deleteBooking}
          updateBooking={updateBooking}
        />
      ));
    } else {
      return (
        <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
          <h1>No bookings available</h1>
        </div>
      );
    }
  }

  return (
    <div>
      <Navbar />
      <h1 className="text-center text-3xl font-bold m-10 text-purple-500">
        Admin Page
      </h1>
      <div className="flex flex-col m-5">
        <input
          className="mx-auto mb-3 p-2 font-bold bg-gray-200 rounded-md"
          type="date"
          name="filterDate"
          id="filterDate"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
          }}
        />
        <select
          className="mx-auto mb-3 p-2 font-bold bg-gray-200 rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by status</option>
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <button
          className="bg-purple-500 mx-auto px-8 py-2 hover:text-white font-bold mb-3 rounded-md"
          onClick={() => {
            setDateFilter('');
            setStatusFilter('');
          }}
        >
          Reset Filter
        </button>
      </div>
      {bookingNumber !== 0 ? (
        <h2 className="text-center text-2xl font-bold mb-5">
          You have <span className="text-purple-500">{bookingNumber}</span>{' '}
          {statusFilter === 'PENDING'
            ? 'Pending Bookings'
            : statusFilter === 'CONFIRMED'
            ? 'Confirmed Bookings'
            : statusFilter === 'CANCELLED'
            ? 'Cancelled Bookings'
            : statusFilter === 'COMPLETED'
            ? 'Completed Bookings'
            : 'Bookings'}
        </h2>
      ) : (
        ''
      )}

      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 2xl:grid-cols-6 mx-5">
        {bookingList(statusFilter, dateFilter)}
      </div>
    </div>
  );
}

export default AdminPage;

export async function getServerSideProps(context) {
  try {
    const bookings = await table.select({}).firstPage();
    return {
      props: {
        initialBookings: minifyRecords(bookings),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: 'Something went wrong',
      },
    };
  }
}
