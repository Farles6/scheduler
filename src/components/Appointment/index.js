import React, { Fragment } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

import 'components/Appointment/styles.scss';

export default function Appointment(props) {
  // const booked = (time) => {
  //   if (!time) {
  //     return `No Appointments`
  //   }
  //   return `Appointment at ${time}`
  // }
  // {booked(props.time)}


  return (
    <>

      <article className='appointment'><Header time={props.time} />{props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />} </article>
    </>
  );
}