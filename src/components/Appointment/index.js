import React from 'react';

import 'components/Appointment/styles.scss'

export default function Appointment(props) {
  const booked = (time) => {
    if (!time) {
      return `No Appointments`
    }
    return `Appointment at ${time}`
  }

  return (
    <article className='appointment'>{booked(props.time)}</article>
  );
}