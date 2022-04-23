import React, { Fragment } from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';

import 'components/Appointment/styles.scss';
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default function Appointment(props) {
  // const booked = (time) => {
  //   if (!time) {
  //     return `No Appointments`
  //   }
  //   return `Appointment at ${time}`
  // }
  // {booked(props.time)}

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);




  return (
    <Fragment>

      <article className='appointment'>
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === CREATE && <Form  interviewers={props.interviewers} onSave={props.onSave} onCancel={() => back()} />}
        {mode === SHOW && (<Show student={props.interview.student} interviewer={props.interview.interviewer.name} />)}
      </article>
    </Fragment>
  );
}